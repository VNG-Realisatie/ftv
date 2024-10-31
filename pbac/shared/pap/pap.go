package pap

import (
	"bytes"
	"fmt"
	"io"
	"log/slog"
	"sync"
)

// PAP represents the interface for storing and retrieving policies.
type PAP interface {
	Create(key string, reader io.Reader) error
	Read(key string) (io.Reader, error)
	Update(key string, reader io.Reader) error
	Delete(key string) error
	ListAllKeys() []string
	LoadFromStore(path string, recurse bool)
}

// New instantiates a new policy cache.
func New(logger *slog.Logger, events EventSink) PAP {
	c := &cache{
		logger:   logger,
		events:   events,
		policies: make(map[string][]byte),
	}

	c.logger.Info("pap initialized")
	return c
}

// Create adds a policy to the cache.
// An error is returned if the policy already exists.
func (c *cache) Create(key string, reader io.Reader) error {
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
		c.events(PolicyCreated, key)
	}
	return err
}

// Read retrieves a policy from the cache, or an error if it doesn't exist.
func (c *cache) Read(key string) (io.Reader, error) {
	c.mutex.RLock()
	defer c.mutex.RUnlock()

	if data, ok := c.policies[key]; ok {
		// we return a reader on a deep copy of the data, so changes in the cache do not affect it.
		s := string(data)
		return bytes.NewBufferString(s), nil
	}

	return nil, fmt.Errorf("cache policy '%s' not found", key)
}

// Update modifies a policy in the cache with a newer version.
// An error is returned if the policy does not exist.
func (c *cache) Update(key string, reader io.Reader) error {
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
		c.events(PolicyUpdated, key)
	}
	return err
}

// Delete removes a policy from the cache.
// An error is returned if the policy does not exist.
func (c *cache) Delete(key string) error {
	var err error

	c.mutex.Lock()
	if _, ok := c.policies[key]; !ok {
		err = fmt.Errorf("cache policy '%s' not found", key)
	} else {
		delete(c.policies, key)
	}
	c.mutex.Unlock()

	if err == nil && c.events != nil {
		c.events(PolicyDeleted, key)
	}
	return err
}

// ListAllKeys returns a list of all cached policy keys.
func (c *cache) ListAllKeys() []string {
	c.mutex.RLock()
	defer c.mutex.RUnlock()

	out := make([]string, 0, len(c.policies))
	for k := range c.policies {
		out = append(out, k)
	}
	return out
}

type cache struct {
	logger   *slog.Logger
	policies map[string][]byte
	events   EventSink
	mutex    sync.RWMutex
}
