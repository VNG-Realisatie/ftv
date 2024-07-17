package nationaliteiten

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

		clear(c.byCode)
		clear(c.byOmschr)

		return csv.ProcessWithHeader(f, func(headers, data []string, line int) error {
			n := NewFromCSV(headers, data)
			code, lower := n.Code, strings.ToLower(n.Omschrijving)

			if _, ok := c.byCode[code]; ok {
				return fmt.Errorf("duplicate code on line %d", line)
			}
			if _, ok := c.byOmschr[lower]; ok {
				return fmt.Errorf("duplicate omschrijving on line %d", line)
			}

			c.byCode[code] = n
			c.byOmschr[lower] = n
			return nil
		})
	}
}
