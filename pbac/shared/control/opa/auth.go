package opa

import (
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
)

// Authorize implements the Controller interface.
func (c *controller) Authorize(_ *types.Request) (*types.Response, error) {
	resp := &types.Response{Allowed: true}

	// TODO: determine required policy and execute it

	// all good.
	return resp, nil
}
