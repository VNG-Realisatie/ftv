package pip

import (
	"log/slog"
	"os"
	"path/filepath"
	"time"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
)

// PIP represents the interface for a Policy Information Point.
type PIP interface {
	types.AttributeSet
	types.EntitySet
	CollectAttributesFromRequest(req *types.Request) (a types.AttributeSet, newURI string)
}

// New instantiates a new Policy Information Point.
//
// The logger parameter must not be nil!
//
// If the newAttributes parameter is nil, the default attribute set builder will be used.
// If the newEntities parameter is nil, the default entity set builder will be used.
func New(store string, recurse bool, logger *slog.Logger, newAttributes types.AttributesBuilder, newEntities types.EntitiesBuilder) PIP {
	var attrStore, entityStore string

	if store != "" {
		attrStore, _ = filepath.Abs(filepath.Join(store, "attributes"))
		entityStore, _ = filepath.Abs(filepath.Join(store, "entities"))

		if !validPath(attrStore) {
			attrStore = ""
		}
		if !validPath(entityStore) {
			entityStore = ""
		}
	}

	if newAttributes == nil {
		newAttributes = types.NewAttributeSet
	}
	if newEntities == nil {
		newEntities = types.NewEntitySet
	}

	p := &pip{
		recurse:       recurse,
		attrStore:     attrStore,
		entityStore:   entityStore,
		logger:        logger,
		newAttributes: newAttributes,
		attributes:    newAttributes(),
		newEntities:   newEntities,
		entities:      newEntities(),
	}

	p.load()

	if p.logger.Enabled(nil, slog.LevelDebug) {
		kv1 := types.MapFromAttributes(p.attributes)

		kv2 := make(map[string]any)
		p.entities.IterateEntities(func(entity types.Entity) {
			kv3 := types.MapFromAttributes(entity.Attributes())
			kv2[entity.UID()] = struct {
				UID        string         `json:"UID,omitempty"`
				Attributes map[string]any `json:"attributes,omitempty"`
				Parents    []string       `json:"parents,omitempty"`
			}{
				UID:        entity.UID(),
				Attributes: kv3,
				Parents:    entity.Parents(),
			}
		})

		p.logger.Debug("pip initialized", "attributes", kv1, "entities", kv2)
	}

	p.logger.Info("pip initialized", "attributeStore", p.attrStore, "entityStore", p.entityStore)
	return p
}

// CollectAttributesFromRequest uses the given PBAC authorization request and other inputs
// to collect a set of attributes to be used by the Policy Decision Point.
//
// The default attributes stored in the PIP will be collected first.
// AttributeSet from the request will overwrite default attributes when the keys are equal.
func (p *pip) CollectAttributesFromRequest(req *types.Request) (types.AttributeSet, string) {
	a := p.newAttributes(p.attributes)
	a.AddAttribute("request-time", time.Now().UTC())

	newURI := p.processHeaders(req, a)

	// p.processCertificates(req, a)
	p.processURL(req, a)
	p.processBody(req, a)

	if len(req.Attributes) > 0 {
		for k := range req.Attributes {
			a.AddAttribute(k, req.Attributes[k])
		}
	}

	if p.logger.Enabled(nil, slog.LevelDebug) {
		kv := make(map[string]any)
		a.IterateAttributes(func(k string, v any) {
			kv[k] = v
		})
		p.logger.Debug("attributes collected", "request-uid", req.UID, "attributes", kv)
	}

	return a, newURI
}

// AddAttribute implements the AttributeSet interface.
//
// Use this to add a default attribute to the PIP.
func (p *pip) AddAttribute(key string, value any) {
	p.attributes.AddAttribute(key, value)
}

// GetAttribute implements the AttributeSet interface.
//
// Use this to read a default attribute from the PIP.
func (p *pip) GetAttribute(key string) any {
	return p.attributes.GetAttribute(key)
}

// RemoveAttribute implements the AttributeSet interface.
//
// Use this to remove a default attribute from the PIP.
func (p *pip) RemoveAttribute(key string) {
	p.attributes.RemoveAttribute(key)
}

// IterateAttributes implements the AttributeSet interface.
//
// Use this to iterate through all default attributes from the PIP.
func (p *pip) IterateAttributes(f types.AttributeIterator) {
	p.attributes.IterateAttributes(f)
}

// MergeAttributes implements the AttributeSet interface.
//
// Use this to merge an attribute set into the default attributes of the PIP.
func (p *pip) MergeAttributes(in ...types.AttributeSet) {
	p.attributes.MergeAttributes(in...)
}

// AddEntity implements the EntitySet interface.
//
// Use this to add an entity to the PIP.
func (p *pip) AddEntity(entity types.Entity) {
	p.entities.AddEntity(entity)
}

// GetEntity implements the EntitySet interface.
//
// Use this to read an entity from the PIP.
func (p *pip) GetEntity(uid string) types.Entity {
	return p.entities.GetEntity(uid)
}

// RemoveEntity implements the EntitySet interface.
//
// Use this to remove an entity from the PIP.
func (p *pip) RemoveEntity(uid string) {
	p.entities.RemoveEntity(uid)
}

// IterateEntities implements the EntitySet interface.
//
// Use this to iterate through all entities from the PIP.
func (p *pip) IterateEntities(f types.EntityIterator) {
	p.entities.IterateEntities(f)
}

// MergeEntities implements the EntitySet interface.
//
// Use this to merge an attribute set into the entities of the PIP.
func (p *pip) MergeEntities(in ...types.EntitySet) {
	p.entities.MergeEntities(in...)
}

type pip struct {
	recurse       bool
	attrStore     string
	entityStore   string
	logger        *slog.Logger
	newAttributes types.AttributesBuilder
	attributes    types.AttributeSet
	newEntities   types.EntitiesBuilder
	entities      types.EntitySet
}

func validPath(path string) bool {
	_, err := os.Stat(path)
	return err == nil
}
