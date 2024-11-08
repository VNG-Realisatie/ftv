package pip

import (
	"strings"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/standards"
)

func (p *pip) processURL(req *types.Request, a types.AttributeSet) {
	s, _ := strings.CutSuffix(req.URL.Scheme, "//")
	s, _ = strings.CutSuffix(s, ":")

	inQ, outQ := req.URL.Query(), make(map[string]string)
	for k := range inQ {
		outQ[k] = strings.Join(inQ[k], "\r")
	}

	m := map[string]any{
		standards.AttrMethod: req.Method,
		standards.AttrScheme: s,
		standards.AttrHost:   req.URL.Host,
		standards.AttrPath:   req.URL.Path,
		standards.AttrQuery:  outQ,
	}

	if req.RequestTime != nil {
		m[standards.AttrRequestTime] = *req.RequestTime
	}

	a.AddAttribute(standards.AttrHttp, m)
}
