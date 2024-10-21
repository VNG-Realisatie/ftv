package convert

import "strings"

// OpaqueString returns the actual string from the given string pointer,
// or an empty string if the input is nil.
func OpaqueString(in *string) string {
	if in != nil {
		return *in
	}
	return ""
}

// RemoveHeaderParameters removes any optional parameters from an HTTP header value.
func RemoveHeaderParameters(in string) string {
	if i := strings.Index(in, ";"); i >= 0 {
		return strings.TrimSpace(in[:i])
	}
	return in
}
