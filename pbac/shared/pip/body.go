package pip

import (
	"errors"
	"io"
	"strings"

	"github.com/goccy/go-json"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/types"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/utilities/convert"
)

func (p *pip) processBody(req *types.Request, a types.Attributes) {
	ct := a.ReadAttribute("content-type").(string)
	if ct != "" {
		ct = strings.ToLower(convert.RemoveHeaderParameters(ct))
	} else {
		ct = convert.ContentSniffer(req.Body)
	}

	f, ok := parsers[ct]
	if !ok {
		p.logger.Error("unsupported content-type", "request-uid", req.UID, "content-type", ct)
	}

	if err := f(req.Body, a); err != nil {
		p.logger.Error("failed to parse body", "request-uid", req.UID, "content-type", ct, "error", err)
	}
}

type bodyParser func(body io.Reader, a types.Attributes) error

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

func parseXML(_ io.Reader, _ types.Attributes) error {

	// TODO: implement XML parser

	return errors.New("XML parser not implemented")
}

func parseJSON(body io.Reader, a types.Attributes) error {
	m := make(map[string]any)
	if err := json.NewDecoder(body).Decode(&m); err != nil {
		return err
	}

	a.CreateAttribute("body", m)
	return nil
}
