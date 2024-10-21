package pip

import (
	"context"
	"log/slog"
	"path/filepath"
	"time"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/types"
)

// PIP represents the interface for a Policy Information Point.
type PIP interface {
	types.Attributes
	CollectAttributesFromRequest(req *types.Request) types.Attributes
}

// New instantiates a new Policy Information Point.
func New(store string, logger *slog.Logger) PIP {
	configStore := store
	if configStore != "" {
		configStore, _ = filepath.Abs(filepath.Join(configStore, "pip-config"))
	}

	p := &pip{
		store:    configStore,
		logger:   logger,
		defaults: types.NewAttributes(),
	}

	p.load()

	p.logger.Info("pip initialized", "configuration", p.store)
	return p
}

// CollectAttributesFromRequest uses the given PBAC authorization request and other inputs
// to collect a set of attributes to be used by the Policy Decision Point.
//
// The default attributes stored in the PIP will be collected first.
// Attributes from the request will overwrite default attributes when the keys are equal.
func (p *pip) CollectAttributesFromRequest(req *types.Request) types.Attributes {
	a := types.NewAttributes(p.defaults)
	a.CreateAttribute("request-time", time.Now())

	p.processHeaders(req, a)
	p.processURL(req, a)
	p.processBody(req, a)

	if len(req.Attributes) > 0 {
		for k := range req.Attributes {
			a.CreateAttribute(k, req.Attributes[k])
		}
	}

	if p.logger.Enabled(context.Background(), slog.LevelDebug) {
		p.logger.Debug("attributes collected", "request-uid", req.UID, "attributes", a.GetAll())
	}

	return a
}

// CreateAttribute implements the Attributes interface.
//
// USe this to add a default attribute to the PIP.
func (p *pip) CreateAttribute(key string, value any) {
	p.defaults.CreateAttribute(key, value)
}

// ReadAttribute implements the Attributes interface.
//
// Use this to read a default attributes from the PIP.
func (p *pip) ReadAttribute(key string) any {
	return p.defaults.ReadAttribute(key)
}

// UpdateAttribute implements the Attributes interface.
//
// Use this to replace a default attributes for the PIP.
func (p *pip) UpdateAttribute(key string, value any) {
	p.defaults.UpdateAttribute(key, value)
}

// DeleteAttribute implements the Attributes interface.
//
// Use this to remove a default attribute from the PIP.
func (p *pip) DeleteAttribute(key string) {
	p.defaults.DeleteAttribute(key)
}

// GetAll implements the Attributes interface.
//
// Use this to retrieve all default attributes from the PIP.
func (p *pip) GetAll() map[string]any {
	return p.defaults.GetAll()
}

type pip struct {
	store    string
	logger   *slog.Logger
	defaults types.Attributes
}
