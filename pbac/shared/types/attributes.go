package types

import (
	"sync"
)

// AttributesBuilder is the function prototype for creating a new set of attributes.
type AttributesBuilder func(in ...AttributeSet) AttributeSet

// AttributeIterator is the function prototype to iterate through a set of attributes.
type AttributeIterator func(key string, value any)

// AttributeSet represents the interface to work with a set of attributes.
// An implementation must ensure that all functions must be safe for use with concurrent go-routines.
type AttributeSet interface {
	AddAttribute(key string, value any) // add or replace an attribute.
	GetAttribute(key string) any        // retrieve an attribute.
	RemoveAttribute(key string)         // remove an attribute.
	Iterate(f AttributeIterator)        // iterate through all attributes.
	Merge(in ...AttributeSet)           // merge the given attribute sets into this one.
}

// NewAttributes instantiates a new standard set of attributes.
//
// The given attribute-sets will be copied into the returned new attribute-set.
// If duplicate keys exist in the given sets, only the last value will remain in the result.
func NewAttributes(in ...AttributeSet) AttributeSet {
	out := &attributes{set: make(map[string]any, 32)}
	for i := range in {
		in[i].Iterate(func(key string, value any) {
			out.set[key] = value
		})
	}
	return out
}

// AddAttribute adds or replaces an attribute to the standard set.
func (a *attributes) AddAttribute(key string, value any) {
	a.mutex.Lock()
	a.set[key] = value
	a.mutex.Unlock()
}

// GetAttribute returns the value for the given key from the set if it exists.
func (a *attributes) GetAttribute(key string) any {
	a.mutex.RLock()
	defer a.mutex.RUnlock()
	return a.set[key]
}

// RemoveAttribute removes the attribute with the given key from the set.
func (a *attributes) RemoveAttribute(key string) {
	a.mutex.Lock()
	delete(a.set, key)
	a.mutex.Unlock()
}

// Iterate iterates through the set and calls the given function for each attribute.
func (a *attributes) Iterate(f AttributeIterator) {
	a.mutex.RLock()
	for k := range a.set {
		f(k, a.set[k])
	}
	a.mutex.RUnlock()
}

// Merge merges the given attribute sets into this one.
// Duplicate keys from the input sets will overwrite earlier values.
func (a *attributes) Merge(in ...AttributeSet) {
	a.mutex.Lock()
	for i := range in {
		in[i].Iterate(func(key string, value any) {
			a.set[key] = value
		})
	}
	a.mutex.Unlock()
}

type attributes struct {
	set   map[string]any
	mutex sync.RWMutex
}
