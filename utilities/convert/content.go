package convert

import (
	"bytes"
)

// DefaultContentType is the default content-type; e.g. if all else fails.
const DefaultContentType = "application/octet-stream"

// ContentType represents a content-type.
type ContentType uint8

// ListAllKeys of supported content-types.
const (
	ApplicationOctets ContentType = iota
	ApplicationXML
	ApplicationJSON
)

// String implements the Stringer interface.
func (c ContentType) String() string {
	switch c {
	case ApplicationXML:
		return "application/xml"
	case ApplicationJSON:
		return "application/json"
	default:
		return DefaultContentType
	}
}

// ContentSniffer tries to determine the content-type from the given input-stream.
//
// This is a very basic implementation, with a very limited list of recognized content-types.
//
// Note that the function only makes a best effort to determine the content-type.
// It does not verify the entire input to determine if it made the right deduction.
//
// See also: https://mimesniff.spec.whatwg.org/.
func ContentSniffer(content []byte) string {
	if content == nil {
		return DefaultContentType
	}

	for i := range cPatterns {
		if bytes.HasPrefix(content, cPatterns[i]) {
			return cTypes[i].String()
		}
	}
	return DefaultContentType
}

var (
	cPatterns = make([][]byte, 0)
	cTypes    = make([]ContentType, 0)
)

func init() {
	// XML prefix.
	cPatterns = append(cPatterns, []byte("<?xml"))
	cTypes = append(cTypes, ApplicationXML)

	// JSON object prefix.
	cPatterns = append(cPatterns, []byte("{"))
	cTypes = append(cTypes, ApplicationJSON)

	// JSON array prefix.
	cPatterns = append(cPatterns, []byte("["))
	cTypes = append(cTypes, ApplicationJSON)
}
