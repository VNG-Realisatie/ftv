package pip

import (
	"bytes"
	"errors"
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

func parseXML(_ []byte, _ types.AttributeSet) error {

	// TODO: implement XML parser

	return errors.New("XML parser not implemented")
}

func parseJSON(body []byte, a types.AttributeSet) error {
	m := make(map[string]any)
	if err := json.NewDecoder(bytes.NewBuffer(body)).Decode(&m); err != nil && err != io.EOF {
		return err
	}

	a.AddAttribute("body", m)
	return nil
}
