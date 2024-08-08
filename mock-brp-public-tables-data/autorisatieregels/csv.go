package autorisatieregels

import (
	"fmt"
	"io"
	"strings"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/utilities/csv"
)

// LoadFromCSV decodes the data from the given input stream in standard CSV format,
// and laods the decoded records into the cache.
//
// The function returns an error when decoding of the CSV input stream fails.
func LoadFromCSV(f io.Reader) Loader {
	return func(c *cache) error {
		c.mutex.Lock()
		defer c.mutex.Unlock()

		clear(c.byAfnemer)
		clear(c.lastAfnemer)
		clear(c.byNaam)
		clear(c.lastNaam)

		return csv.ProcessWithHeader(f, func(headers, data []string, line int) error {
			a := NewFromCSV(headers, data)
			afnemer, naam, versie := a.Afnemer, strings.ToLower(a.AfnemerNaam), a.Versie
			key1, key2 := afnemerKey(afnemer, versie), naamKey(afnemer, naam, versie)

			if dupe, ok := c.byAfnemer[key1]; ok {
				if dupe.IsEqual(a) {
					// ignore duplicate lines.
					return nil
				}
				return fmt.Errorf("duplicate afnemer/versie on line %d", line)
			}
			if _, ok := c.byNaam[key2]; ok {
				return fmt.Errorf("duplicate afnemernaam/versie on line %d", line)
			}

			c.byAfnemer[key1] = a
			c.byNaam[key2] = a

			if last, ok := c.lastAfnemer[afnemer]; !ok || last.IsSupersededBy(a) {
				c.lastAfnemer[afnemer] = a
			}
			if last, ok := c.lastNaam[naam]; !ok || last.IsSupersededBy(a) {
				c.lastNaam[naam] = a
			}

			return nil
		})
	}
}
