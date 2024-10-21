package pip

import (
	"strings"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/types"
)

func (p *pip) processHeaders(req *types.Request, a types.Attributes) {
	other := make(map[string]string)

	var fwd1, fwd2 string

	for k := range req.Headers {
		if list := req.Headers[k]; len(list) > 0 {
			switch strings.ToLower(k) {
			case "apikey", "api-key", "x-apikey", "x-api-key":
				a.CreateAttribute("api-key", list[0])
			case "content-type":
				a.CreateAttribute("content-type", list[0])
			case "x-forwarded-for":
				fwd1 = strings.Join(list, ",")
			case "forwarded":
				fwd2 = strings.Join(list, ",")
			case "grondslag":
				a.CreateAttribute("grondslag", list[0])
			case "doelbinding":
				a.CreateAttribute("doelbinding", list[0])
			case "authorization":
				p.processAuth(req, list[0], a)
			default:
				other[k] = strings.Join(list, ",")
			}
		}
	}

	if fwd1 != "" || fwd2 != "" {
		p.processForwarded(fwd1, fwd2, a)
	}

	a.CreateAttribute("headers", other)
}
