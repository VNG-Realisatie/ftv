package cedar

import (
	"io"

	"github.com/cedar-policy/cedar-go"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/pap"
)

func (c *controller) policyEvent(t pap.EventType, key string) {
	switch t {
	case pap.PolicyCreated, pap.PolicyUpdated:
		if f, err := c.PAP().Read(key); err == nil {
			d, _ := io.ReadAll(f)
			var policy cedar.Policy
			if err = policy.UnmarshalCedar(d); err == nil {
				c.pdp.Store(cedar.PolicyID(key), &policy)
			}
		}
		c.Logger().Info("policy added/replaced", "controller", c.String(), "policy-key", key)

	case pap.PolicyDeleted:
		c.pdp.Delete(cedar.PolicyID(key))
		c.Logger().Info("policy removed", "controller", c.String(), "policy-key", key)
	}
}
