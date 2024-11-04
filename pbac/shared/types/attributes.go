package types

import (
	"sync"
)

// AttributesBuilder is the function prototype for creating a new set of attributes.
type AttributesBuilder func(in ...AttributeSet) AttributeSet

// AttributeIterator is the function prototype to iterate through a set of attributes.
type AttributeIterator func(key string, value any)

// AttributeSet represents the interface to work with a set of attributes.
//
// An implementation must take care to protect against simultaneous use from concurrent go-routines.
type AttributeSet interface {
	AddAttribute(key string, value any)    // add or replace an attribute.
	GetAttribute(key string) any           // retrieve an attribute.
	RemoveAttribute(key string)            // remove an attribute.
	IterateAttributes(f AttributeIterator) // iterate through all attributes.
	MergeAttributes(in ...AttributeSet)    // merge the given attribute sets into this one.
}

// NewAttributeSet instantiates a new set of attributes.
//
// It matches the AttributesBuilder function signature.
//
// The given attribute sets will be copied into the returned new attribute set.
// Duplicate keys from an input set will overwrite the previous value.
// E.g. only the last value with the duplicate key will be retained.
func NewAttributeSet(in ...AttributeSet) AttributeSet {
	out := &attributes{set: make(map[string]any, 32)}
	for i := range in {
		in[i].IterateAttributes(func(key string, value any) {
			out.set[key] = value
		})
	}
	return out
}

// AddAttribute implements the AttributeSet interface.
func (a *attributes) AddAttribute(key string, value any) {
	a.mutex.Lock()
	a.set[key] = value
	a.mutex.Unlock()
}

// GetAttribute implements the AttributeSet interface.
// if it exists, otherwise a nil value is returned.
func (a *attributes) GetAttribute(key string) any {
	a.mutex.RLock()
	defer a.mutex.RUnlock()
	return a.set[key]
}

// RemoveAttribute implements the AttributeSet interface.
func (a *attributes) RemoveAttribute(key string) {
	a.mutex.Lock()
	delete(a.set, key)
	a.mutex.Unlock()
}

// IterateAttributes implements the AttributeSet interface.
func (a *attributes) IterateAttributes(f AttributeIterator) {
	a.mutex.RLock()
	for k := range a.set {
		f(k, a.set[k])
	}
	a.mutex.RUnlock()
}

// MergeAttributes implements the AttributeSet interface.
//
// Duplicate keys from an input set will overwrite the previous value.
// E.g. only the last value with the duplicate key will be retained.
func (a *attributes) MergeAttributes(in ...AttributeSet) {
	a.mutex.Lock()
	for i := range in {
		in[i].IterateAttributes(func(key string, value any) {
			a.set[key] = value
		})
	}
	a.mutex.Unlock()
}

// MapFromAttributes returns a standard map from the given attribute set.
func MapFromAttributes(in AttributeSet) map[string]any {
	if in == nil {
		return nil
	}

	out := make(map[string]any)
	in.IterateAttributes(func(k string, v any) {
		out[k] = v
	})

	return out
}

type attributes struct {
	set   map[string]any
	mutex sync.RWMutex
}
