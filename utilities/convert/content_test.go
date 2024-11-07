package convert

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestContentType_String(t *testing.T) {
	testCases := []struct {
		name string
		in   ContentType
		want string
	}{
		{name: "zero", want: "application/octet-stream"},
		{name: "binary", in: ApplicationOctets, want: "application/octet-stream"},
		{name: "xml", in: ApplicationXML, want: "application/xml"},
		{name: "json", in: ApplicationJSON, want: "application/json"},
		{name: "high", in: 250, want: "application/octet-stream"},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := tc.in.String()
			assert.Equal(t, tc.want, got)
		})
	}
}

func TestContentSniffer(t *testing.T) {
	testCases := []struct {
		name string
		in   []byte
		want string
	}{
		{name: "nil", in: nil, want: "application/octet-stream"},
		{name: "empty", in: []byte(""), want: "application/octet-stream"},
		{name: "zeroes", in: []byte(strings.Repeat("0", 4096)), want: "application/octet-stream"},
		{name: "xml", in: []byte(`<?xml version="1.0" encoding="UTF-8"?>`), want: "application/xml"},
		{name: "json object", in: []byte(`{"a":1,"b":true,"c":"x"}`), want: "application/json"},
		{name: "json array", in: []byte(`["a",1,"b",true,"c","x"]`), want: "application/json"},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := ContentSniffer(tc.in)
			assert.Equal(t, tc.want, got)
		})
	}
}
