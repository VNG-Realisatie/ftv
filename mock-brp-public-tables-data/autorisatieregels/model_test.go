package autorisatieregels

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNewFromCSV(t *testing.T) {
	var (
		d1 = time.Date(1600, 1, 1, 0, 0, 0, 0, time.UTC)
		d2 = time.Date(2199, 12, 31, 0, 0, 0, 0, time.UTC)
	)

	testCases := []struct {
		name         string
		headers      []string
		data         []string
		want         *AutorisatieRegel
		wantAfnemerX string
		wantIngangX  string
		wantEindeX   string
	}{
		{
			name:         "empty",
			want:         &AutorisatieRegel{},
			wantAfnemerX: "000000",
		},
		{
			name:         "no headers",
			data:         []string{"1", "niets"},
			want:         &AutorisatieRegel{},
			wantAfnemerX: "000000",
		},
		{
			name:         "faulty headers",
			headers:      []string{"x", "y", "z"},
			data:         []string{"1", "niets"},
			want:         &AutorisatieRegel{},
			wantAfnemerX: "000000",
		},
		{
			name:         "coded headers, good data",
			headers:      []string{"95.10", "95.20", "99.98", "99.99"},
			data:         []string{"1", "Gemeente Rotterdam", "16000101", "21991231"},
			want:         &AutorisatieRegel{Afnemer: 1, AfnemerNaam: "Gemeente Rotterdam", DatumIngang: &d1, DatumEinde: &d2},
			wantAfnemerX: "000001",
			wantIngangX:  "16000101",
			wantEindeX:   "21991231",
		},
		{
			name:         "non-coded headers, good data",
			headers:      []string{"AfnemerIndicatie", "AfnemerNaam", "Datum Ingang", "Beëindiging Datum"},
			data:         []string{"1", "Gemeente Rotterdam", "16000101", "21991231"},
			want:         &AutorisatieRegel{Afnemer: 1, AfnemerNaam: "Gemeente Rotterdam", DatumIngang: &d1, DatumEinde: &d2},
			wantAfnemerX: "000001",
			wantIngangX:  "16000101",
			wantEindeX:   "21991231",
		},
		{
			name:         "coded headers, bad data",
			headers:      []string{"95.10", "95.20", "99.98", "99.99"},
			data:         []string{"-1x", "Gemeente Rotterdam", "xx", "yy"},
			want:         &AutorisatieRegel{AfnemerNaam: "Gemeente Rotterdam"},
			wantAfnemerX: "000000",
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := NewFromCSV(tc.headers, tc.data)
			require.NotNil(t, got)

			assert.EqualValues(t, tc.want, got)
			assert.Equal(t, tc.wantAfnemerX, got.AfnemerX())
			assert.Equal(t, tc.wantIngangX, got.DatumIngangX())
			assert.Equal(t, tc.wantEindeX, got.DatumEindeX())
		})
	}
}
