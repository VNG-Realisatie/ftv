package nationaliteiten

import (
	"bytes"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

var (
	h1          = `"05.11 Nationaliteitscode","05.12 Omschrijving","99.98 Datum ingang","99.99 Datum einde"`
	r1          = `0000,Onbekend`
	r2          = `"0001","Nederlandse","",""`
	r3          = `"0052","Belgische"`
	r4          = `77,"Spaanse",,,,,`
	badFile     = strings.Join([]string{h1, r1, r2, r1, r4}, "\n")
	goodFile    = strings.Join([]string{h1, r1, r2, r3, r4}, "\n")
	emptyLoader = LoadFromCSV(bytes.NewBufferString(""))
	badLoader   = LoadFromCSV(bytes.NewBufferString(badFile))
	goodLoader  = LoadFromCSV(bytes.NewBufferString(goodFile))
)

func TestNew(t *testing.T) {
	testCases := []struct {
		name       string
		l          Loader
		wantCount  int
		findCode   uint
		wantCode   *Nationaliteit
		findOmschr string
		wantOmschr *Nationaliteit
		loadFail   bool
	}{
		{name: "no input data", l: emptyLoader, findCode: 1, findOmschr: "spaanse"},
		{name: "invalid input data", l: badLoader, loadFail: true},
		{
			name:       "valid input data",
			l:          goodLoader,
			wantCount:  4,
			findCode:   1,
			wantCode:   &Nationaliteit{Code: 1, Omschrijving: "Nederlandse"},
			findOmschr: "spaanse",
			wantOmschr: &Nationaliteit{Code: 77, Omschrijving: "Spaanse"},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			sel, err := New(tc.l)
			if tc.loadFail {
				require.Error(t, err)
				assert.Nil(t, sel)
			} else {
				require.NoError(t, err)
				assert.NotNil(t, sel)

				if tc.findCode > 0 {
					got := sel.SelectCode(tc.findCode)
					assert.EqualValues(t, tc.wantCode, got)
				}

				if tc.findOmschr != "" {
					got := sel.SelectOmschrijving(tc.findOmschr)
					assert.EqualValues(t, tc.wantOmschr, got)
				}

				c, ok := sel.(*cache)
				require.True(t, ok)
				require.NotNil(t, c)

				c.mutex.RLock()
				assert.Equal(t, tc.wantCount, len(c.byCode))
				assert.Equal(t, tc.wantCount, len(c.byOmschr))
				c.mutex.RUnlock()
			}
		})
	}
}
