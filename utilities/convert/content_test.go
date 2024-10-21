package convert

import (
	"bytes"
	"io"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestContentSniffer(t *testing.T) {
	testCases := []struct {
		name string
		in   io.Reader
		want string
	}{
		{name: "nil", in: nil, want: "application/octet-stream"},
		{name: "empty", in: bytes.NewBufferString(""), want: "application/octet-stream"},
		{name: "zeroes", in: bytes.NewBufferString(strings.Repeat("0", 4096)), want: "application/octet-stream"},
		{name: "xml", in: bytes.NewBufferString(`<?xml version="1.0" encoding="UTF-8"?>`), want: "application/xml"},
		{name: "json object", in: bytes.NewBufferString(`{"a":1,"b":true,"c":"x"}`), want: "application/json"},
		{name: "json array", in: bytes.NewBufferString(`["a",1,"b",true,"c","x"]`), want: "application/json"},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := ContentSniffer(tc.in)
			assert.Equal(t, tc.want, got)
		})
	}
}
