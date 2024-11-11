// Package cedar contains all logic for a functional component acting as the Policy Decision Point,
// using Cedar as the policy language.
package cedar

import (
	"log/slog"
	"path/filepath"

	"github.com/cedar-policy/cedar-go"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/control"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/pap"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/pip"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/utilities/module"
)

// Version defines the version of this Cedar PDP.
const Version = "1.0.0"

// NewController instantiates a new Cedar controller.
func NewController(pip pip.PIP, store string, recurse bool, logger *slog.Logger) control.Controller {
	store, _ = filepath.Abs(store)

	c := &controller{
		Base:     control.NewBase(types.CEDAR.String(), Version, logger),
		pdp:      cedar.NewPolicySet(),
		entities: make(cedar.Entities),
	}

	pip.IterateEntities(func(entity types.Entity) {
		if wrapped, ok := entity.(*WrappedEntity); ok {
			c.entities[wrapped.ce.UID] = wrapped.ce
		}
	})

	c.SetPIP(pip)
	c.SetPAP(pap.New(c.Logger(), c.policyEvent))
	c.PAP().LoadFromStore(store, recurse)

	mod := "github.com/cedar-policy/cedar-go"
	modVersion := module.GetModuleVersion(mod)

	c.Logger().Info("pbac controller initialized", "controller", c.String(), "module", mod, "module-version", modVersion)
	return c
}

type controller struct {
	control.Base
	pdp      *cedar.PolicySet
	entities cedar.Entities
}
