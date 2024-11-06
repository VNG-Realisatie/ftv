package cedar

import (
	"context"
	"log/slog"
	"time"

	"github.com/cedar-policy/cedar-go"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
)

// Authorize implements the Controller interface.
func (c *controller) Authorize(req *types.Request) (*types.Response, error) {
	if c.Logger().Enabled(context.TODO(), slog.LevelDebug) {
		c.Logger().Debug("authorization request", "controller", c.String(), "request-uid", req.UID)
	}

	started := time.Now()
	decision, diagnostic := c.pdp.IsAuthorized(c.entities, c.buildCedarRequest(req))
	duration := time.Since(started)

	if !decision {
		c.Logger().Error("authorization failed", "controller", c.String(), "request-uid", req.UID, "diagnostic", diagnostic, "pdp elapsed", duration.String())
	} else {
		c.Logger().Debug("authorization granted", "controller", c.String(), "request-uid", req.UID, "pdp elapsed", duration.String())
	}

	return &types.Response{Allowed: bool(decision), Message: "not authorized"}, nil
}

func (c *controller) buildCedarRequest(req *types.Request) cedar.Request {
	a, uri := c.PIP().CollectAttributesFromRequest(req)
	if uri == "" {
		uri = req.URL.String()
	}

	ca, ok := a.(*attributes)
	if !ok {
		a = NewAttributeSet(c.Logger(), a)
		ca, _ = a.(*attributes)
	}

	p1, p2 := DeterminePrincipal(ca)

	return cedar.Request{
		Principal: cedar.NewEntityUID(p1, p2),
		Action:    cedar.NewEntityUID(TypeAction, cedar.String(req.Method)),
		Resource:  cedar.NewEntityUID(TypeService, cedar.String(uri)),
		Context:   cedar.NewRecord(ca.set),
	}
}
