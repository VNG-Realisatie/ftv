package cedar

import (
	"log/slog"
	"path/filepath"

	"github.com/cedar-policy/cedar-go"
	ctypes "github.com/cedar-policy/cedar-go/types"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/control"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/pap"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/pip"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/types"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/utilities/module"
)

const Version = "1.0.0"

// NewController instantiates a new Cedar controller.
func NewController(pip pip.PIP, store string, recurse bool, logger *slog.Logger) control.Controller {
	if store != "" {
		store, _ = filepath.Abs(filepath.Join(store, "cedar"))
	}

	c := &controller{
		Base:     control.NewBase(types.CEDAR.String(), Version, logger),
		pdp:      cedar.NewPolicySet(),
		entities: make(ctypes.Entities),
	}

	c.SetPIP(pip)
	c.SetPAP(pap.New(store, recurse, c.Logger(), c.policyEvent))

	mod := "github.com/cedar-policy/cedar-go"
	modVersion := module.GetModuleVersion(mod)

	c.Logger().Info("pbac controller initialized", "controller", c.String(), "module", mod, "module-version", modVersion)
	return c
}

type controller struct {
	control.Base
	pdp      *cedar.PolicySet
	entities ctypes.Entities
}
