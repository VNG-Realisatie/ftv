package pip

import (
	"strings"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/types"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/standards"
)

func (p *pip) processHeaders(req *types.Request, a types.AttributeSet) {
	other := make(map[string]string)

	var fwd1, fwd2 string

	for k := range req.Headers {
		if list := req.Headers[k]; len(list) > 0 {
			switch strings.ToLower(k) {
			case "content-type":
				a.AddAttribute(standards.AttrContentType, list[0])
			case "authorization":
				p.processAuth(req, list[0], a)
			case "apikey", "api-key", "x-apikey", "x-api-key":
				a.AddAttribute(standards.AttrApiKey, list[0])
			case "grondslag":
				a.AddAttribute(standards.AttrGrondslag, list[0])
			case "doelbinding":
				a.AddAttribute(standards.AttrDoelbinding, list[0])
			case "zaaktype", "zaak-type":
				a.AddAttribute(standards.AttrZaakType, list[0])
			case "taak":
				a.AddAttribute(standards.AttrTaak, list[0])
			case "x-forwarded-for":
				fwd1 = strings.Join(list, ",")
			case "forwarded":
				fwd2 = strings.Join(list, ",")
			default:
				other[k] = strings.Join(list, ",")
			}
		}
	}

	if fwd1 != "" || fwd2 != "" {
		p.processForwarded(fwd1, fwd2, a)
	}

	a.AddAttribute(standards.AttrHeaders, other)
}
