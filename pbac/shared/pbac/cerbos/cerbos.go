package cerbos

import (
	"fmt"
	"log/slog"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/pbac"
)

const Version = "1.0.0"

// NewController instantiates a new Cerbos/CEL controller.
func NewController(store string, recurse bool, logger *slog.Logger) pbac.Controller {
	return &controller{
		store:   store,
		recurse: recurse,
		logger:  logger,
	}
}

// String implements the Controller interface.
func (c *controller) String() string {
	return fmt.Sprintf("%s %s", pbac.CERBOS.String(), Version)
}

// Name implements the Controller interface.
func (c *controller) Name() string {
	return pbac.CERBOS.String()
}

// Version implements the Controller interface.
func (c *controller) Version() string {
	return Version
}

// Authorize implements the Controller interface.
func (c *controller) Authorize(_ *pbac.Request) (*pbac.Response, error) {
	resp := &pbac.Response{Allowed: true}

	// TODO: determine required policy and execute it

	// all good.
	return resp, nil
}

type controller struct {
	store   string
	recurse bool
	logger  *slog.Logger
}
