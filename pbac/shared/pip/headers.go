package pip

import (
	"strings"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/standards"
)

func (p *pip) processHeaders(req *types.Request, a types.AttributeSet) string {
	other := make(map[string]string)

	var newURI, fwd1, fwd2 string

	for k := range req.Headers {
		if list := req.Headers[k]; len(list) > 0 {
			switch strings.ToLower(k) {
			case standards.AttrContentType:
				a.AddAttribute(standards.AttrContentType, list[0])
			case standards.AttrAuthorization:
				p.processAuth(req, list[0], a)
			case standards.AttrFSCAuthorization:
				newURI = p.processFSC(req, list[0], a)
			case standards.AttrApiKey, "apikey", "x-apikey", "x-api-key":
				a.AddAttribute(standards.AttrApiKey, list[0])
			case standards.AttrGrondslag:
				a.AddAttribute(standards.AttrGrondslag, list[0])
			case standards.AttrDoelbinding:
				a.AddAttribute(standards.AttrDoelbinding, list[0])
			case standards.AttrZaakType, "zaaktype":
				a.AddAttribute(standards.AttrZaakType, list[0])
			case standards.AttrTaak:
				a.AddAttribute(standards.AttrTaak, list[0])
			case standards.AttrXForwardedFor:
				fwd1 = strings.Join(list, ",")
			case standards.AttrForwarded:
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

	return newURI
}
