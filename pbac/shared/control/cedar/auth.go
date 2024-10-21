package cedar

import (
	"context"
	"log/slog"

	"github.com/cedar-policy/cedar-go"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/types"
)

// Authorize implements the Controller interface.
func (c *controller) Authorize(req *types.Request) (*types.Response, error) {
	if c.Logger().Enabled(context.Background(), slog.LevelDebug) {
		c.Logger().Debug("authorization request", "controller", c.String(), "request-uid", req.UID)
	}

	cr := c.buildCedarRequest(req)

	decision, diagnostic := c.pdp.IsAuthorized(c.entities, cr)
	if !decision {
		c.Logger().Error("authorization failed", "controller", c.String(), "request-uid", req.UID, "diagnostic", diagnostic)
	} else if c.Logger().Enabled(context.Background(), slog.LevelDebug) {
		c.Logger().Debug("authorization granted", "controller", c.String(), "request-uid", req.UID)
	}

	return &types.Response{Allowed: bool(decision)}, nil
}

func (c *controller) buildCedarRequest(req *types.Request) cedar.Request {
	a := c.PIP().CollectAttributesFromRequest(req)
	attributes := a.GetAll()

	out := cedar.Request{}

	_ = attributes

	// TODO: build cedar request

	return out
}
