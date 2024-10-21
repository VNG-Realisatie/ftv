package pip

import (
	"strings"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/types"
)

func (p *pip) processURL(req *types.Request, a types.Attributes) {
	s, _ := strings.CutSuffix(req.URL.Scheme, "//")
	s, _ = strings.CutSuffix(s, ":")

	q := make(map[string]string)
	for k := range req.URL.Query() {
		q[k] = strings.Join(req.URL.Query()[k], "\r")
	}

	a.CreateAttribute("http", map[string]any{
		"scheme": s,
		"host":   req.URL.Host,
		"path":   req.URL.RawPath,
		"query":  q,
	})
}
