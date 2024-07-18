package nationaliteiten

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
		name        string
		headers     []string
		data        []string
		want        *Nationaliteit
		wantCodeX   string
		wantIngangX string
		wantEindeX  string
	}{
		{
			name:      "empty",
			want:      &Nationaliteit{},
			wantCodeX: "0000",
		},
		{
			name:      "no headers",
			data:      []string{"1", "niets"},
			want:      &Nationaliteit{},
			wantCodeX: "0000",
		},
		{
			name:      "faulty headers",
			headers:   []string{"x", "y", "z"},
			data:      []string{"1", "niets"},
			want:      &Nationaliteit{},
			wantCodeX: "0000",
		},
		{
			name:        "coded headers, good data",
			headers:     []string{"05.11", "05.12", "99.98", "99.99"},
			data:        []string{"1", "Nederlandse", "16000101", "21991231"},
			want:        &Nationaliteit{Code: 1, Omschrijving: "Nederlandse", DatumIngang: &d1, DatumEinde: &d2},
			wantCodeX:   "0001",
			wantIngangX: "16000101",
			wantEindeX:  "21991231",
		},
		{
			name:        "non-coded headers, good data",
			headers:     []string{"Code", "Omschrijving", "Datum Ingang", "Einde Datum"},
			data:        []string{"1", "Nederlandse", "16000101", "21991231"},
			want:        &Nationaliteit{Code: 1, Omschrijving: "Nederlandse", DatumIngang: &d1, DatumEinde: &d2},
			wantCodeX:   "0001",
			wantIngangX: "16000101",
			wantEindeX:  "21991231",
		},
		{
			name:      "coded headers, bad data",
			headers:   []string{"05.11", "05.12", "99.98", "99.99"},
			data:      []string{"-1x", "Nederlandse", "xx", "yy"},
			want:      &Nationaliteit{Omschrijving: "Nederlandse"},
			wantCodeX: "0000",
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := NewFromCSV(tc.headers, tc.data)
			require.NotNil(t, got)

			assert.EqualValues(t, tc.want, got)
			assert.Equal(t, tc.wantCodeX, got.CodeX())
			assert.Equal(t, tc.wantIngangX, got.DatumIngangX())
			assert.Equal(t, tc.wantEindeX, got.DatumEindeX())
		})
	}
}
