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
	types.AttributeSet
	CollectAttributesFromRequest(req *types.Request) types.AttributeSet
}

// New instantiates a new Policy Information Point.
func New(store string, logger *slog.Logger, builder types.AttributesBuilder) PIP {
	configStore := store
	if configStore != "" {
		configStore, _ = filepath.Abs(filepath.Join(configStore, "pip-config"))
	}

	if builder == nil {
		builder = types.NewAttributes
	}

	p := &pip{
		store:    configStore,
		logger:   logger,
		builder:  builder,
		defaults: builder(),
	}

	p.load()

	p.logger.Info("pip initialized", "configuration", p.store)
	return p
}

// CollectAttributesFromRequest uses the given PBAC authorization request and other inputs
// to collect a set of attributes to be used by the Policy Decision Point.
//
// The default attributes stored in the PIP will be collected first.
// AttributeSet from the request will overwrite default attributes when the keys are equal.
func (p *pip) CollectAttributesFromRequest(req *types.Request) types.AttributeSet {
	a := p.builder(p.defaults)
	a.AddAttribute("request-time", time.Now().UTC())

	p.processHeaders(req, a)
	p.processURL(req, a)
	p.processBody(req, a)

	if len(req.Attributes) > 0 {
		for k := range req.Attributes {
			a.AddAttribute(k, req.Attributes[k])
		}
	}

	if p.logger.Enabled(context.Background(), slog.LevelDebug) {
		kv := make(map[string]any)
		a.Iterate(func(k string, v any) {
			kv[k] = v
		})
		p.logger.Debug("attributes collected", "request-uid", req.UID, "attributes", kv)
	}

	return a
}

// AddAttribute implements the AttributeSet interface.
//
// Use this to add a default attribute to the PIP.
func (p *pip) AddAttribute(key string, value any) {
	p.defaults.AddAttribute(key, value)
}

// GetAttribute implements the AttributeSet interface.
//
// Use this to read a default attribute from the PIP.
func (p *pip) GetAttribute(key string) any {
	return p.defaults.GetAttribute(key)
}

// RemoveAttribute implements the AttributeSet interface.
//
// Use this to remove a default attribute from the PIP.
func (p *pip) RemoveAttribute(key string) {
	p.defaults.RemoveAttribute(key)
}

// Iterate implements the AttributeSet interface.
//
// Use this to iterate through all default attributes from the PIP.
func (p *pip) Iterate(f types.AttributeIterator) {
	p.defaults.Iterate(f)
}

// Merge implements the AttributeSet interface.
//
// Use this to merge an attribute set into the default attributes of the PIP.
func (p *pip) Merge(in ...types.AttributeSet) {
	p.defaults.Merge(in...)
}

type pip struct {
	store    string
	logger   *slog.Logger
	builder  types.AttributesBuilder
	defaults types.AttributeSet
}
