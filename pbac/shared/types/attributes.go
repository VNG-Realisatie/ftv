package types

import (
	"maps"
	"sync"
)

// Attributes represents the interface to work with a set of attributes.
//
// NOTE: Only the CRUD operations are safe for concurrent use by multiple go-routines.
// The map returned by GetAll is not safe for concurrent use and must never be modified!
type Attributes interface {
	CreateAttribute(key string, value any)
	ReadAttribute(key string) any
	UpdateAttribute(key string, value any)
	DeleteAttribute(key string)
	GetAll() map[string]any
}

// NewAttributes instantiates a new set of attributes.
//
// The given attribute-sets will be copied into the returned new attribute-set.
// If duplicate keys exist in the given sets, only the last value will remain in the result.
func NewAttributes(in ...Attributes) Attributes {
	out := &attributes{kvs: make(map[string]any, 32)}
	for i := range in {
		maps.Copy(out.kvs, in[i].GetAll())
	}
	return out
}

// CreateAttribute adds an attribute to the set.
//
// If the key already exists in the set, it's value is overwritten.
func (a *attributes) CreateAttribute(key string, value any) {
	a.mutex.Lock()
	a.kvs[key] = value
	a.mutex.Unlock()
}

// ReadAttribute returns the value for the given key from the set.
func (a *attributes) ReadAttribute(key string) any {
	a.mutex.RLock()
	defer a.mutex.RUnlock()
	return a.kvs[key]
}

// UpdateAttribute replaces the value for the corresponding key in the set.
//
// If the key doesn't exist, the key/value pair is added to the set.
func (a *attributes) UpdateAttribute(key string, value any) {
	a.mutex.Lock()
	a.kvs[key] = value
	a.mutex.Unlock()
}

// DeleteAttribute removes the attribute with the given key from the set.
//
// If the key doesn't exist in the set, this function does nothing.
func (a *attributes) DeleteAttribute(key string) {
	a.mutex.Lock()
	delete(a.kvs, key)
	a.mutex.Unlock()
}

// GetAll returns all attributes in the set.
//
// Note that the returned map is the original.
// It is not safe to use across concurrent go-routines, and it is not permitted to make changes.
// E.g. treat the map as read-only!
func (a *attributes) GetAll() map[string]any {
	return a.kvs
}

type attributes struct {
	kvs   map[string]any
	mutex sync.RWMutex
}
