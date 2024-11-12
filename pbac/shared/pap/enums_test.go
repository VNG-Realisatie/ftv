package pap

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestEventType(t *testing.T) {
	testCases := []struct {
		name string
		in   EventType
		want string
	}{
		{name: "empty", want: "<invalid>"},
		{name: "added", in: PolicyAdded, want: "added"},
		{name: "replaced", in: PolicyReplaced, want: "replaced"},
		{name: "removed", in: PolicyRemoved, want: "removed"},
		{name: "invalid", in: 99, want: "<invalid>"},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := tc.in.String()
			assert.Equal(t, tc.want, got)
		})
	}
}
