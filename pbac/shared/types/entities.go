package types

import (
	"fmt"
	"sync"
)

// EntitiesBuilder is the function prototype for creating a new set of entities.
type EntitiesBuilder func(in ...EntitySet) EntitySet

// EntityIterator is the function prototype to iterate through a set of entities.
type EntityIterator func(entity Entity)

// Entity represents the interface to work with the details of an entity.
//
// An Entity is a read-only object and does not require protection against simultaneous use from concurrent go-routines.
type Entity interface {
	UID() string              // retrieve the Unique ID (UID) of the entity.
	Type() string             // retrieve the Type of the entity (e,g, name-space).
	ID() string               // retrieve the ID of the entity (unique ID within the name-space).
	Attributes() AttributeSet // retrieve attributes of the entity.
	Parents() []string        // retrieve unique identifiers (UID) of parent entities.
}

// NewEntity instanties a new standard entity.
func NewEntity(ns, id string, attrs AttributeSet, parents ...string) Entity {
	return &entity{
		uid:     fmt.Sprintf("%s::%s", ns, id),
		ns:      ns,
		id:      id,
		attrs:   attrs,
		parents: parents,
	}
}

// UID implements the Entity interface.
func (e *entity) UID() string {
	return e.uid
}

// Type implements the Entity interface.
func (e *entity) Type() string {
	return e.ns
}

// ID implements the Entity interface.
func (e *entity) ID() string {
	return e.id
}

// Attributes implements the Entity interface.
func (e *entity) Attributes() AttributeSet {
	return e.attrs
}

// Parents implements the Entity interface.
func (e *entity) Parents() []string {
	return e.parents
}

// EntitySet represents the interface to work with a set of entities.
//
// An implementation must take care to protect against simultaneous use from concurrent go-routines.
type EntitySet interface {
	AddEntity(entity Entity)          // add or replace an entity.
	GetEntity(uid string) Entity      // retrieve an entity.
	RemoveEntity(uid string)          // remove an entity.
	IterateEntities(f EntityIterator) // iterate through all entities.
	MergeEntities(in ...EntitySet)    // merge the given entity sets into this one.
}

// NewEntitySet instantiates a new standard set of attributes.
//
// It matches the EntitiesBuilder function signature.
//
// The given entity-sets will be copied into the returned new attribute-set.
// Duplicate keys from an input set will overwrite the previous value.
// E.g. only the last value with the duplicate key will be retained.
func NewEntitySet(in ...EntitySet) EntitySet {
	out := &entities{set: make(map[string]Entity, 32)}
	for i := range in {
		in[i].IterateEntities(func(entity Entity) {
			out.set[entity.UID()] = entity
		})
	}
	return out
}

// AddEntity implements the AttributeSet interface.
func (a *entities) AddEntity(entity Entity) {
	a.mutex.Lock()
	a.set[entity.UID()] = entity
	a.mutex.Unlock()
}

// GetEntity implements the AttributeSet interface.
// if it exists, otherwise a nil value is returned.
func (a *entities) GetEntity(uid string) Entity {
	a.mutex.RLock()
	defer a.mutex.RUnlock()
	return a.set[uid]
}

// RemoveEntity implements the AttributeSet interface.
func (a *entities) RemoveEntity(uid string) {
	a.mutex.Lock()
	delete(a.set, uid)
	a.mutex.Unlock()
}

// IterateEntities implements the AttributeSet interface.
func (a *entities) IterateEntities(f EntityIterator) {
	a.mutex.RLock()
	for uid := range a.set {
		f(a.set[uid])
	}
	a.mutex.RUnlock()
}

// MergeEntities implements the AttributeSet interface.
//
// Duplicate keys from an input set will overwrite the previous value.
// E.g. only the last value with the duplicate key will be retained.
func (a *entities) MergeEntities(in ...EntitySet) {
	a.mutex.Lock()
	for i := range in {
		in[i].IterateEntities(func(entity Entity) {
			a.set[entity.UID()] = entity
		})
	}
	a.mutex.Unlock()
}

type entity struct {
	uid     string       // unique identifier (ns::id).
	ns      string       // name-space.
	id      string       // unique identifier within the name-space.
	attrs   AttributeSet // optional attributes.
	parents []string     // optional set of unique identifiers of parent entities.
}

type entities struct {
	set   map[string]Entity
	mutex sync.RWMutex
}
