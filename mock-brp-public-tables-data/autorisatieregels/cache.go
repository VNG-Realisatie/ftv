package autorisatieregels

import (
	"sync"
)

// Selecter represents the interface to find/search for AutorisatieRegels in a memory-mapped cache.
type Selecter interface {
	SelectAfnemer(afnemer, versie uint32) *AutorisatieRegel
	SelectAfnemerLast(afnemer uint32) *AutorisatieRegel
	SelectNaam(naam string, afnemer, versie uint32) *AutorisatieRegel
	SelectNaamLast(naam string) *AutorisatieRegel
	Search(opts ...SearchOpt) []*AutorisatieRegel
}

// Loader is the function signature for loading the cache.
type Loader func(c *cache) error

// New instantiates a new memory-mapped cache with AutorisatieRegels.
func New(load Loader) (Selecter, error) {
	c := &cache{
		byAfnemer:   make(map[uint64]*AutorisatieRegel, 256),
		lastAfnemer: make(map[uint32]*AutorisatieRegel, 256),
		byNaam:      make(map[string]*AutorisatieRegel, 256),
		lastNaam:    make(map[string]*AutorisatieRegel, 256),
	}

	if load != nil {
		if err := load(c); err != nil {
			return nil, err
		}
	}

	return c, nil
}

// SelectAfnemer implements the Selecter interface.
func (c *cache) SelectAfnemer(afnemer, versie uint32) *AutorisatieRegel {
	key := afnemerKey(afnemer, versie)
	c.mutex.RLock()
	defer c.mutex.RUnlock()
	return c.byAfnemer[key]
}

// SelectAfnemerLast implements the Selecter interface.
//
// This function selects the most recent AutorisatieRegel for the Afnemer that is still valid today.
func (c *cache) SelectAfnemerLast(afnemer uint32) *AutorisatieRegel {
	c.mutex.RLock()
	defer c.mutex.RUnlock()
	return c.lastAfnemer[afnemer]
}

// SelectNaam implements the Selecter interface.
func (c *cache) SelectNaam(naam string, afnemer, versie uint32) *AutorisatieRegel {
	key := naamKey(afnemer, naam, versie)
	c.mutex.RLock()
	defer c.mutex.RUnlock()
	return c.byNaam[key]
}

// SelectNaamLast implements the Selecter interface.
//
// This function selects the most recent AutorisatieRegel for the AfnemerNaam that is still valid today.
func (c *cache) SelectNaamLast(naam string) *AutorisatieRegel {
	c.mutex.RLock()
	defer c.mutex.RUnlock()
	return c.lastNaam[naam]
}

type cache struct {
	byAfnemer   map[uint64]*AutorisatieRegel
	lastAfnemer map[uint32]*AutorisatieRegel
	byNaam      map[string]*AutorisatieRegel
	lastNaam    map[string]*AutorisatieRegel
	mutex       sync.RWMutex
}
