package types

import "strings"

// Language represents a policy language.
type Language uint8

// ListAllKeys of supported policy languages.
const (
	XACML Language = iota + 1
	ODRL
	REGO
	CEDAR
	CERBOS

	langFirst = XACML
	langLast  = CERBOS
)

// String implements the Stringer interface.
func (l Language) String() string {
	switch l {
	case XACML:
		return "XACML"
	case ODRL:
		return "ODRL"
	case REGO:
		return "OPA/Rego"
	case CEDAR:
		return "Cedar"
	case CERBOS:
		return "Cerbos/CEL"
	default:
		return "<unknown>"
	}
}

// LanguageFromString returns the corresponding Language type from the given input.
func LanguageFromString(in string) Language {
	return languages[strings.ToLower(in)]
}

// Format represents the format for policy files.
type Format uint8

// ListAllKeys of supported policy file formats.
//
// Note that not the policy language (Language) limits the choices for the file format of a policy.
const (
	XML Format = iota + 1
	RDFXML
	Turtle
	N3
	JSONLD
	JSON
	YAML
	FreeFormat

	fmtFirst = XML
	fmtLast  = FreeFormat
)

// String implements the Stringer interface.
func (f Format) String() string {
	switch f {
	case XML:
		return "XML"
	case RDFXML:
		return "RDF/XML"
	case Turtle:
		return "Turtle"
	case N3:
		return "N3"
	case JSONLD:
		return "JSON-LD"
	case JSON:
		return "JSON"
	case YAML:
		return "YAML"
	case FreeFormat:
		return "free-format"
	default:
		return "<unknown>"
	}
}

// FormatFromString returns the corresponding Format type from the given input.
func FormatFromString(in string) Format {
	return formats[strings.ToLower(in)]
}

var (
	languages = make(map[string]Language, langLast+8)
	formats   = make(map[string]Format, fmtLast+4)
)

func init() {
	for i := langFirst; i <= langLast; i++ {
		languages[strings.ToLower(i.String())] = i
	}

	// add alternate language names.
	languages["opa"] = REGO
	languages["opa/rego"] = REGO
	languages["opa-rego"] = REGO
	languages["oparego"] = REGO
	languages["cel"] = CERBOS
	languages["cerbos/cel"] = CERBOS
	languages["cerbos-cel"] = CERBOS
	languages["cerboscel"] = CERBOS

	for i := fmtFirst; i <= fmtLast; i++ {
		formats[strings.ToLower(i.String())] = i
	}

	// add alternative format names.
	formats["rdf-xml"] = RDFXML
	formats["rdfxml"] = RDFXML
	formats["jsonld"] = JSONLD
	formats["freeformat"] = FreeFormat
}
