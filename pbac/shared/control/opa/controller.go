package opa

import (
	"log/slog"
	"path/filepath"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/control"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/pap"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/pip"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
)

const Version = "1.0.0"

// NewController instantiates a new OPA/Rego controller.
func NewController(pip pip.PIP, store string, recurse bool, logger *slog.Logger) control.Controller {
	store, _ = filepath.Abs(store)

	c := &controller{
		control.NewBase(types.REGO.String(), Version, logger),
	}

	c.SetPIP(pip)
	c.SetPAP(pap.New(c.Logger(), c.policyEvent))
	c.PAP().LoadFromStore(store, recurse)

	c.Logger().Info("pbac controller initialized", "controller", c.String())
	return c
}

type controller struct {
	control.Base
}
