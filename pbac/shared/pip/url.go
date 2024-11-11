package pip

import (
	"strings"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/standards"
)

func (p *pip) processURL(req *types.Request, a types.AttributeSet) {
	m := make(map[string]any, 8)

	if req.Method != "" {
		m[standards.AttrMethod] = req.Method
	}

	if req.RequestTime != nil {
		m[standards.AttrRequestTime] = *req.RequestTime
	}

	if req.URL != nil {
		s, _ := strings.CutSuffix(req.URL.Scheme, "//")
		s, _ = strings.CutSuffix(s, ":")

		inQ, outQ := req.URL.Query(), make(map[string]string)
		for k := range inQ {
			outQ[k] = strings.Join(inQ[k], "\r")
		}

		m[standards.AttrScheme] = s
		m[standards.AttrQuery] = outQ
		m[standards.AttrHost] = req.URL.Host
		m[standards.AttrPath] = req.URL.Path
	}

	a.AddAttribute(standards.AttrHttp, m)
}
