package cedar

import (
	"context"
	"log/slog"

	"github.com/cedar-policy/cedar-go"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/pip"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/types"
)

// Authorize implements the Controller interface.
func (c *controller) Authorize(req *types.Request) (*types.Response, error) {
	if c.Logger().Enabled(context.Background(), slog.LevelDebug) {
		c.Logger().Debug("authorization request", "controller", c.String(), "request-uid", req.UID)
	}

	decision, diagnostic := c.pdp.IsAuthorized(c.entities, c.buildCedarRequest(req))
	if !decision {
		c.Logger().Error("authorization failed", "controller", c.String(), "request-uid", req.UID, "diagnostic", diagnostic)
	} else if c.Logger().Enabled(context.Background(), slog.LevelDebug) {
		c.Logger().Debug("authorization granted", "controller", c.String(), "request-uid", req.UID)
	}

	return &types.Response{Allowed: bool(decision), Message: "not authorized"}, nil
}

func (c *controller) buildCedarRequest(req *types.Request) cedar.Request {
	a := c.PIP().CollectAttributesFromRequest(req)

	ca, ok := a.(*attributes)
	if !ok {
		a = NewAttributeSet(c.Logger(), a)
		ca, _ = a.(*attributes)
	}

	p1, p2 := pip.DeterminePrincipal(a)

	return cedar.Request{
		Principal: cedar.NewEntityUID(cedar.EntityType(p1), cedar.String(p2)),
		Action:    cedar.NewEntityUID("action", cedar.String(req.Method)),
		Resource:  cedar.NewEntityUID("uri", cedar.String(req.URL.String())),
		Context:   cedar.NewRecord(ca.set),
	}
}
