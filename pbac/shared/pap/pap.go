// Package pap contains all logic for a functional component acting as the Policy Administration Point.
package pap

import (
	"bytes"
	"fmt"
	"io"
	"log/slog"
	"slices"
	"sync"
)

// PAP represents the interface for caching and retrieving policies.
type PAP interface {
	Add(key string, reader io.Reader) error
	Replace(key string, reader io.Reader) error
	Remove(key string) error
	Get(key string) (io.Reader, error)
	ListAllKeys() []string
	LoadFromStore(path string, recurse bool)
}

// EventSink represents the interface for handling PAP events.
type EventSink interface {
	Handle(t EventType, key string)
}

// New instantiates a new policy cache.
func New(logger *slog.Logger, events EventSink) PAP {
	c := &pap{
		logger:   logger,
		events:   events,
		policies: make(map[string][]byte),
	}

	c.logger.Info("pap initialized")
	return c
}

// Add adds a policy to the cache.
//
// If the input reader is nil, the function returns duccessfully without doing anything.
//
// An error is returned if the policy key already exists.
func (c *pap) Add(key string, reader io.Reader) error {
	if reader == nil {
		return nil
	}

	data, err := io.ReadAll(reader)
	if err != nil {
		return err
	}

	c.mutex.Lock()
	if _, ok := c.policies[key]; ok {
		err = fmt.Errorf("cache policy '%s' already exists", key)
	} else {
		c.policies[key] = data
	}
	c.mutex.Unlock()

	if err == nil && c.events != nil {
		c.events.Handle(PolicyAdded, key)
	}
	return err
}

// Replace modifies a policy in the cache with a newer version.
//
// If the input reader is nil, the function returns duccessfully without doing anything.
//
// An error is returned if the policy key doesn't exist.
func (c *pap) Replace(key string, reader io.Reader) error {
	if reader == nil {
		return nil
	}

	data, err := io.ReadAll(reader)
	if err != nil {
		return err
	}

	c.mutex.Lock()
	if _, ok := c.policies[key]; !ok {
		err = fmt.Errorf("cache policy '%s' not found", key)
	} else {
		c.policies[key] = data
	}
	c.mutex.Unlock()

	if err == nil && c.events != nil {
		c.events.Handle(PolicyReplaced, key)
	}
	return err
}

// Remove removes a policy from the cache.
//
// An error is returned if the policy key doesn't exist.
func (c *pap) Remove(key string) error {
	var err error

	c.mutex.Lock()
	if _, ok := c.policies[key]; !ok {
		err = fmt.Errorf("cache policy '%s' not found", key)
	} else {
		delete(c.policies, key)
	}
	c.mutex.Unlock()

	if err == nil && c.events != nil {
		c.events.Handle(PolicyRemoved, key)
	}
	return err
}

// Get retrieves a policy from the cache, or an error if the policy key doesn't exist.
func (c *pap) Get(key string) (io.Reader, error) {
	c.mutex.RLock()
	defer c.mutex.RUnlock()

	if data, ok := c.policies[key]; ok {
		// we return a reader on a deep copy of the data, so changes in the cache do not affect it.
		s := string(data)
		return bytes.NewBufferString(s), nil
	}

	return nil, fmt.Errorf("cache policy '%s' not found", key)
}

// ListAllKeys returns a list of all cached policy keys.
func (c *pap) ListAllKeys() []string {
	c.mutex.RLock()
	defer c.mutex.RUnlock()

	out := make([]string, 0, len(c.policies))
	for k := range c.policies {
		out = append(out, k)
	}

	slices.Sort(out)
	return out
}

type pap struct {
	logger   *slog.Logger
	policies map[string][]byte
	events   EventSink
	mutex    sync.RWMutex
}
