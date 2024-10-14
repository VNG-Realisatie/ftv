package control

import (
	"log/slog"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/fsc/plugin/opa/config"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/pbac"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/pbac/cedar"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/pbac/cerbos"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/pbac/opa"
)

// New instantiates a new PBAC controller based on the given configuration.
func New(cfg *config.Config, logger *slog.Logger) pbac.Controller {
	switch pbac.LanguageFromString(cfg.PolicyLanguage) {
	case pbac.REGO:
		return opa.NewController(cfg.PolicyStore, cfg.PolicyStoreRecurse, logger)
	case pbac.CERBOS:
		return cerbos.NewController(cfg.PolicyStore, cfg.PolicyStoreRecurse, logger)
	case pbac.CEDAR:
		return cedar.NewController(cfg.PolicyStore, cfg.PolicyStoreRecurse, logger)
	default:
		return nil
	}
}
