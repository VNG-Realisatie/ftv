package autorisatieregels

import (
	"bytes"
	"strings"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNew(t *testing.T) {
	var (
		h1          = `"Versie","95.10 Afnemersindicatie","95.20 Afnemernaam","99.98 Datum ingang tabelregel","99.99 Datum beëindiging tabelregel"`
		r1          = `"1","001401","Gemeente Groningen","19931215","20130101"`
		r2          = `"2","001401","Gemeente Groningen","20150131","20150801"`
		r3          = `"4","001401","Gemeente Groningen/Burgerzakentaken","20180801","20190203"`
		r4          = `"5","001401","Gemeente Groningen/Burgerzakentaken","20190203"`
		badFile     = strings.Join([]string{h1, r1, r2, r1, r4}, "\n")
		goodFile    = strings.Join([]string{h1, r1, r2, r3, r4}, "\n")
		emptyLoader = LoadFromCSV(bytes.NewBufferString(""))
		badLoader   = LoadFromCSV(bytes.NewBufferString(badFile))
		goodLoader1 = LoadFromCSV(bytes.NewBufferString(goodFile))
		goodLoader2 = LoadFromCSV(bytes.NewBufferString(goodFile))
		d1          = time.Date(2019, 2, 3, 0, 0, 0, 0, time.UTC)
		d2          = time.Date(2015, 1, 31, 0, 0, 0, 0, time.UTC)
		d3          = time.Date(2015, 8, 1, 0, 0, 0, 0, time.UTC)
	)

	testCases := []struct {
		name        string
		l           Loader
		wantCount   int
		findAfnemer uint32
		findNaam    string
		findVersie  uint32
		wantAfnemer *AutorisatieRegel
		wantNaam    *AutorisatieRegel
		loadFail    bool
	}{
		{name: "no input data", l: emptyLoader, findAfnemer: 1, findNaam: "Gemeente Groningen", findVersie: 1},
		{name: "invalid input data", l: badLoader, loadFail: true},
		{
			name:        "valid input data (1)",
			l:           goodLoader1,
			wantCount:   4,
			findAfnemer: 1401,
			findVersie:  5,
			wantAfnemer: &AutorisatieRegel{Afnemer: 1401, AfnemerNaam: "Gemeente Groningen/Burgerzakentaken", Versie: 5, DatumIngang: &d1},
			wantNaam:    &AutorisatieRegel{Afnemer: 1401, AfnemerNaam: "Gemeente Groningen/Burgerzakentaken", Versie: 5, DatumIngang: &d1},
		},
		{
			name:        "valid input data (2)",
			l:           goodLoader2,
			wantCount:   4,
			findNaam:    "Gemeente Groningen",
			findVersie:  2,
			wantAfnemer: &AutorisatieRegel{Afnemer: 1401, AfnemerNaam: "Gemeente Groningen", Versie: 2, DatumIngang: &d2, DatumEinde: &d3},
			wantNaam:    &AutorisatieRegel{Afnemer: 1401, AfnemerNaam: "Gemeente Groningen", Versie: 2, DatumIngang: &d2, DatumEinde: &d3},
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

				if tc.findAfnemer > 0 {
					got := sel.SelectAfnemer(tc.findAfnemer, tc.findVersie)
					assert.EqualValues(t, tc.wantAfnemer, got)
				}

				if tc.findNaam != "" {
					got := sel.SelectNaam(tc.findNaam, tc.findVersie)
					assert.EqualValues(t, tc.wantNaam, got)
				}

				c, ok := sel.(*cache)
				require.True(t, ok)
				require.NotNil(t, c)

				c.mutex.RLock()
				assert.Equal(t, tc.wantCount, len(c.byAfnemer))
				assert.Equal(t, tc.wantCount, len(c.byNaam))
				c.mutex.RUnlock()
			}
		})
	}
}
