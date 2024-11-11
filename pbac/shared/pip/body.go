package pip

import (
	"bytes"
	"encoding/xml"
	"io"
	"strings"

	"github.com/goccy/go-json"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/utilities/convert"
)

func (p *pip) processBody(req *types.Request, a types.AttributeSet) {
	if req.Body == nil {
		return
	}

	ct, ok := a.GetAttribute("content-type").(string)
	if ok && ct != "" {
		ct = strings.ToLower(convert.RemoveHeaderParameters(ct))
	} else {
		ct = convert.ContentSniffer(req.Body)
	}

	f, ok2 := parsers[ct]
	if !ok2 {
		p.logger.Error("unsupported content-type", "request-uid", req.UID, "content-type", ct)
		return
	}

	if err := f(req.Body, a); err != nil {
		p.logger.Error("failed to parse body", "request-uid", req.UID, "content-type", ct, "error", err)
	}
}

type bodyParser func(body []byte, a types.AttributeSet) error

var parsers = map[string]bodyParser{
	"text/xml":              parseXML,
	"application/xml":       parseXML,
	"application/soap+xml":  parseXML,
	"application/atom+xml":  parseXML,
	"application/rss+xml":   parseXML,
	"application/rdf+xml":   parseXML,
	"application/xhtml+xml": parseXML,
	"application/xslt+xml":  parseXML,
	"text/json":             parseJSON,
	"application/json":      parseJSON,
	"application/ld+json":   parseJSON,
	"application/geo+json":  parseJSON,
}

func parseJSON(body []byte, a types.AttributeSet) error {
	m := make(map[string]any)
	if err := json.NewDecoder(bytes.NewBuffer(body)).Decode(&m); err != nil && err != io.EOF {
		return err
	}

	a.AddAttribute("body", m)
	return nil
}

func parseXML(body []byte, a types.AttributeSet) error {
	nodes := make([]xmlNode, 0)
	if err := xml.Unmarshal(body, &nodes); err != nil {
		return err
	}

	nodes2 := make([]map[string]any, len(nodes))
	for i := range nodes {
		node := nodes[i]
		nodes2[i] = map[string]any{node.name(): node.toMap()}
	}
	a.AddAttribute("body", nodes2)

	return nil
}

type xmlNode struct {
	XMLName xml.Name
	Attrs   []xml.Attr `xml:",any,attr"`
	Data    string     `xml:",innerxml"`
	Nodes   []xmlNode  `xml:",any"`
}

func (n *xmlNode) name() string {
	return n.XMLName.Local
}

func (n *xmlNode) toMap() map[string]any {
	attrs := make([]map[string]any, len(n.Attrs))
	for i := range n.Attrs {
		a := n.Attrs[i]
		attrs[i] = map[string]any{a.Name.Local: a.Value}
	}

	nodes := make([]map[string]any, len(n.Nodes))
	for i := range n.Nodes {
		node := n.Nodes[i]
		nodes[i] = map[string]any{node.name(): node.toMap()}
	}

	var cdata string
	if len(n.Nodes) == 0 && len(n.Data) > 0 {
		cdata = n.Data
	}

	return map[string]any{
		"attributes": attrs,
		"nodes":      nodes,
		"cdata":      cdata,
	}
}

// UnmarshalXML implements the xml.Unmarshaler interface.
func (n *xmlNode) UnmarshalXML(d *xml.Decoder, start xml.StartElement) error {
	n.Attrs = start.Attr
	type node xmlNode
	return d.DecodeElement((*node)(n), &start)
}
