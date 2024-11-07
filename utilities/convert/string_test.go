package convert

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestOpaqueString(t *testing.T) {
	s1 := ""
	s2 := "hello world"

	testCases := []struct {
		name string
		in   *string
		want string
	}{
		{name: "nil"},
		{name: "empty", in: &s1},
		{name: "hello world", in: &s2, want: s2},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := OpaqueString(tc.in)
			assert.Equal(t, tc.want, got)
		})
	}
}

func TestRemoveHeaderParameters(t *testing.T) {
	testCases := []struct {
		name string
		in   string
		want string
	}{
		{name: "empty"},
		{name: "no charset", in: "application/xml", want: "application/xml"},
		{name: "charset", in: "application/xml; charset=utf-8", want: "application/xml"},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := RemoveHeaderParameters(tc.in)
			assert.Equal(t, tc.want, got)
		})
	}
}
