package types

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestLanguage_String(t *testing.T) {
	testCases := []struct {
		name string
		in   Language
		want string
	}{
		{name: "zero", want: "<unknown>"},
		{name: "XACML", in: XACML, want: "XACML"},
		{name: "ODRL", in: ODRL, want: "ODRL"},
		{name: "OPA", in: REGO, want: "OPA/Rego"},
		{name: "Cedar", in: CEDAR, want: "Cedar"},
		{name: "Cerbos", in: CERBOS, want: "Cerbos/CEL"},
		{name: "high", in: 255, want: "<unknown>"},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := tc.in.String()
			assert.Equal(t, tc.want, got)
		})
	}
}

func TestLanguageFromString(t *testing.T) {
	testCases := []struct {
		name string
		in   string
		want Language
	}{
		{name: "empty"},
		{name: "invalid", in: "MyPL"},
		{name: "xacml", in: "xacml", want: XACML},
		{name: "opa", in: "opa", want: REGO},
		{name: "Rego", in: "opa", want: REGO},
		{name: "opa-Rego", in: "opa", want: REGO},
		{name: "OdRl", in: "OdRl", want: ODRL},
		{name: "Cedar", in: "Cedar", want: CEDAR},
		{name: "cel", in: "cel", want: CERBOS},
		{name: "CERBOS", in: "CERBOS", want: CERBOS},
		{name: "Cerbos/CEL", in: "Cerbos/CEL", want: CERBOS},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := LanguageFromString(tc.in)
			assert.Equal(t, tc.want, got)
		})
	}
}

func TestFormat_String(t *testing.T) {
	testCases := []struct {
		name string
		in   Format
		want string
	}{
		{name: "zero", want: "<unknown>"},
		{name: "XML", in: XML, want: "XML"},
		{name: "RDF/XML", in: RDFXML, want: "RDF/XML"},
		{name: "Turtle", in: Turtle, want: "Turtle"},
		{name: "N3", in: N3, want: "N3"},
		{name: "JSONLD", in: JSONLD, want: "JSON-LD"},
		{name: "JSON", in: JSON, want: "JSON"},
		{name: "YAML", in: YAML, want: "YAML"},
		{name: "FreeFormat", in: FreeFormat, want: "free-format"},
		{name: "high", in: 255, want: "<unknown>"},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := tc.in.String()
			assert.Equal(t, tc.want, got)
		})
	}
}

func TestFormatFromString(t *testing.T) {
	testCases := []struct {
		name string
		in   string
		want Format
	}{
		{name: "empty"},
		{name: "invalid", in: "MyFormat"},
		{name: "xml", in: "xml", want: XML},
		{name: "rdf/XML", in: "rdf/XML", want: RDFXML},
		{name: "n3", in: "n3", want: N3},
		{name: "Turtle", in: "Turtle", want: Turtle},
		{name: "JSON-LD", in: "JSON-LD", want: JSONLD},
		{name: "json", in: "json", want: JSON},
		{name: "yaml", in: "yaml", want: YAML},
		{name: "free-format", in: "free-format", want: FreeFormat},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := FormatFromString(tc.in)
			assert.Equal(t, tc.want, got)
		})
	}
}
