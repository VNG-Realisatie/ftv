package convert

import "github.com/goccy/go-json"

// MustMarshall marshals the given input to JSON, but panics when an error occurs.
func MustMarshall(v interface{}) []byte {
	out, err := json.Marshal(v)
	if err != nil {
		panic(err)
	}
	return out
}
