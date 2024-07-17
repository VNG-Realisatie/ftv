package csv

import (
	csv2 "encoding/csv"
	"errors"
	"io"
)

// Processor is the function signature for processing CSV records.
type Processor func(headers, data []string, line int) error

// ProcessWithHeader processes the given input stream as a standard CSV file, where the first line contains the headers.
func ProcessWithHeader(f io.Reader, process Processor) error {
	r := csv2.NewReader(f)
	r.LazyQuotes = true
	r.ReuseRecord = false
	r.FieldsPerRecord = -1

	var line int
	var headers []string

	for {
		record, err := r.Read()
		if errors.Is(err, io.EOF) {
			return nil
		}
		if err != nil {
			return err
		}

		line++
		if line == 1 {
			headers = record
		} else {
			if err = process(headers, record, line); err != nil {
				return err
			}
			r.ReuseRecord = true
		}
	}
}
