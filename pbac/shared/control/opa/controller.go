// Package opa contains all logic for a functional component acting as the Policy Decision Point
// using OPA/Rego as the policy language.
package opa

import (
	"bytes"
	"context"
	"log/slog"
	"path/filepath"

	"github.com/goccy/go-json"
	"github.com/open-policy-agent/opa/hooks"
	"github.com/open-policy-agent/opa/sdk"
	"github.com/open-policy-agent/opa/storage"
	"github.com/open-policy-agent/opa/storage/inmem"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/control"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/pap"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/pip"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
)

// Version defines the version of this OPA/Rego PDP.
const Version = "1.0.0"

// NewController instantiates a new OPA/Rego controller.
func NewController(pip pip.PIP, store string, recurse bool, logger *slog.Logger) control.Controller {
	store, _ = filepath.Abs(store)

	wait := make(chan struct{})

	mem := inmem.New()

	pdp, err := sdk.New(context.Background(), sdk.Options{
		RegoVersion:   1,
		ID:            "opa-controller",
		Config:        bytes.NewReader([]byte(cfg)),
		ConsoleLogger: &wrappedLogger{logger: logger},
		Ready:         wait,
		Hooks:         hooks.Hooks{},
		Store:         mem,
		// Plugins:      nil,
		// ManagerOpts:  nil,
	})
	if err != nil {
		logger.Error("Failed to initialize OPA SDK", "error", err)
		return nil
	}

	c := &controller{
		Base: control.NewBase(types.REGO.String(), Version, logger),
		pdp:  pdp,
		mem:  mem,
		ctx:  context.Background(),
	}

	c.SetPIP(pip)
	c.SetPAP(pap.New(c.Logger(), c))

	// wait for OPA to be ready, before loading policies!
	select {
	case <-wait:
	}

	c.loadEntities()
	c.PAP().LoadFromStore(store, recurse)

	c.Logger().Info("pbac controller initialized", "controller", c.String())
	return c
}

func (c *controller) loadEntities() {
	m := make(map[string]any)
	c.PIP().IterateEntities(func(entity types.Entity) {
		m2 := make(map[string]any)
		m2[entity.ID()] = types.MapFromAttributes(entity.Attributes())
		m[entity.Type()] = m2
	})

	d, err := json.Marshal(m)
	if err != nil {
		c.Logger().Error("failed to marshal entities", "controller", c.String(), "error", err)
		return
	}

	key := "entities"

	t, _ := c.mem.NewTransaction(c.ctx, storage.TransactionParams{Write: true})
	if err = c.mem.Write(c.ctx, t, storage.AddOp, storage.Path{key}, d); err != nil {
		c.Logger().Error("failed to upsert entities", "controller", c.String(), "document-key", key, "error", err)
	}
	if err = c.mem.Commit(c.ctx, t); err != nil {
		c.Logger().Error("failed to commit transaction", "controller", c.String(), "document-key", key, "error", err)
	} else {
		c.Logger().Info("entities added/replaced", "controller", c.String(), "document-key", key)
	}

}

type controller struct {
	control.Base
	pdp *sdk.OPA
	mem storage.Store
	ctx context.Context
}

const cfg = `{
	"decision_logs": {
		"console": true
	}
}`
