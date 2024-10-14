package convert

// OpaqueString returns the actual string from the given string pointer,
// or an empty string if the input is nil.
func OpaqueString(in *string) string {
	if in != nil {
		return *in
	}
	return ""
}
