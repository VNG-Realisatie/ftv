package opa

import (
	"context"
	"fmt"
	"log/slog"
	"time"

	"github.com/open-policy-agent/opa/sdk"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
)

// Authorize implements the Controller interface.
func (c *controller) Authorize(req *types.Request) (*types.Response, error) {
	debug := c.Logger().Enabled(nil, slog.LevelDebug)
	if debug {
		c.Logger().Debug("authorization request", "controller", c.String(), "request-uid", req.UID)
	}

	started := time.Now()
	resp, err := c.pdp.Decision(context.Background(), c.buildDecisionOptions(req))
	duration := time.Since(started)

	if err != nil {
		c.Logger().Error("authorization failed", "controller", c.String(), "request-uid", req.UID, "err", err, "pdp elapsed", duration.String())
	} else {
		if allowed, ok := resp.Result.(bool); ok && allowed {
			if debug {
				c.Logger().Debug("authorization granted", "controller", c.String(), "request-uid", req.UID, "pdp elapsed", duration.String())
			}
			return &types.Response{Allowed: true}, nil
		}

		if debug {
			c.Logger().Debug("authorization not granted", "controller", c.String(), "request-uid", req.UID, "pdp elapsed", duration.String())
		}
	}

	return &types.Response{Allowed: false, Message: "not authorized"}, nil
}

func (c *controller) buildDecisionOptions(req *types.Request) sdk.DecisionOptions {
	a, _ := c.PIP().CollectAttributesFromRequest(req)

	p1, p2 := DeterminePrincipal(a)

	return sdk.DecisionOptions{
		Now:        *req.RequestTime,
		Path:       fmt.Sprintf("/%s/%s/allow", p1, p2),
		Input:      types.MapFromAttributes(a),
		DecisionID: req.UID.String(),
	}
}
