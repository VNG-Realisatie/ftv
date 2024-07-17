package csv

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

var (
	h1    = `"05.11 Nationaliteitscode","05.12 Omschrijving","99.98 Datum ingang","99.99 Datum einde"`
	r1    = `0000,Onbekend`
	r2    = `"0001","Nederlandse","",""`
	r3    = `"0052","Belgische"`
	r4    = `77,"Spaanse",,,,,`
	file1 = fmt.Sprintf("%s\n%s\n", h1, r1)
	file2 = fmt.Sprintf("%s\n%s\n%s\n%s\n%s\n", h1, r1, r2, r3, r4)
)

func TestProcessWithHeader(t *testing.T) {
	testCases := []struct {
		name        string
		f           io.Reader
		wantHeaders []string
		wantRecords [][]string
		recordFail  bool
		fail        bool
	}{
		{name: "invalid file", f: &badReader{}, fail: true},
		{name: "empty file", f: bytes.NewBufferString("")},
		{name: "only header", f: bytes.NewBufferString(h1)},
		{name: "force process error", f: bytes.NewBufferString(file2), recordFail: true, fail: true},
		{
			name:        "header + 1 record",
			f:           bytes.NewBufferString(file1),
			wantHeaders: []string{"05.11 Nationaliteitscode", "05.12 Omschrijving", "99.98 Datum ingang", "99.99 Datum einde"},
			wantRecords: [][]string{{"0000", "Onbekend"}},
		},
		{
			name:        "header + 4 records",
			f:           bytes.NewBufferString(file2),
			wantHeaders: []string{"05.11 Nationaliteitscode", "05.12 Omschrijving", "99.98 Datum ingang", "99.99 Datum einde"},
			wantRecords: [][]string{{"0000", "Onbekend"}, {"0001", "Nederlandse", "", ""}, {"0052", "Belgische"}, {"77", "Spaanse", "", "", "", "", ""}},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			err := ProcessWithHeader(tc.f, func(headers, data []string, line int) error {
				if tc.recordFail {
					return errors.New("fail")
				}

				assert.EqualValues(t, tc.wantHeaders, headers)

				record := max(line-2, 0)
				assert.Equal(t, tc.wantRecords[record], data)

				return nil
			})

			if tc.fail {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

type badReader struct{}

func (f *badReader) Read([]byte) (int, error) { return 0, errors.New("fail") }
