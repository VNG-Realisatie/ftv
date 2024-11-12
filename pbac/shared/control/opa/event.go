package opa

import (
	"io"

	"github.com/open-policy-agent/opa/storage"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/pap"
)

// Handle implements the EventSink interface.
func (c *controller) Handle(event pap.EventType, key string) {
	switch event {
	case pap.PolicyAdded, pap.PolicyReplaced:
		f, err := c.PAP().Get(key)
		if err != nil {
			c.Logger().Error("failed to add policy", "controller", c.String(), "policy-key", key, "error", err)
			return
		}

		d, _ := io.ReadAll(f)

		t, _ := c.mem.NewTransaction(c.ctx, storage.TransactionParams{Write: true})
		if err = c.mem.UpsertPolicy(c.ctx, t, key, d); err != nil {
			c.Logger().Error("failed to upsert policy", "controller", c.String(), "policy-key", key, "error", err)
		}
		if err = c.mem.Commit(c.ctx, t); err != nil {
			c.Logger().Error("failed to commit transaction", "controller", c.String(), "policy-key", key, "error", err)
		} else {
			c.Logger().Info("policy added/replaced", "controller", c.String(), "policy-key", key)
		}

	case pap.PolicyRemoved:
		t, _ := c.mem.NewTransaction(c.ctx, storage.TransactionParams{Write: true})
		if err := c.mem.DeletePolicy(c.ctx, t, key); err != nil {
			c.Logger().Error("failed to remove policy", "controller", c.String(), "policy-key", key, "error", err)
		}
		if err := c.mem.Commit(c.ctx, t); err != nil {
			c.Logger().Error("failed to commit transaction", "controller", c.String(), "policy-key", key, "error", err)
		} else {
			c.Logger().Info("policy removed", "controller", c.String(), "policy-key", key)
		}
	}
}
