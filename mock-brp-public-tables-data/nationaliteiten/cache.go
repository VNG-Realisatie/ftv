package nationaliteiten

import (
	"strings"
	"sync"
)

// Selecter represents the interface to find/search for nationaliteiten in a memory-mapped cache.
type Selecter interface {
	SelectCode(code uint) *Nationaliteit
	SelectOmschrijving(omschrijving string) *Nationaliteit
	Search(opts ...SearchOpt) []*Nationaliteit
}

// Loader is the function signature for loading the cache.
type Loader func(c *cache) error

// New instantiates a new memory-mapped cache with nationaliteiten.
func New(load Loader) (Selecter, error) {
	c := &cache{
		byCode:   make(map[uint]*Nationaliteit, 64),
		byOmschr: make(map[string]*Nationaliteit, 64),
	}

	if load != nil {
		if err := load(c); err != nil {
			return nil, err
		}
	}

	return c, nil
}

// SelectCode implements the Selecter interface.
func (c *cache) SelectCode(code uint) *Nationaliteit {
	c.mutex.RLock()
	defer c.mutex.RUnlock()
	return c.byCode[code]
}

// SelectOmschrijving implements the Selecter interface.
func (c *cache) SelectOmschrijving(omschrijving string) *Nationaliteit {
	c.mutex.RLock()
	defer c.mutex.RUnlock()
	return c.byOmschr[strings.ToLower(omschrijving)]
}

type cache struct {
	byCode   map[uint]*Nationaliteit
	byOmschr map[string]*Nationaliteit
	mutex    sync.RWMutex
}
