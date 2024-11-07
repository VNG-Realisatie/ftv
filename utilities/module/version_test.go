package module

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGetModuleVersion(t *testing.T) {
	testCases := []struct {
		name string
		in   string
		want bool
	}{
		{name: "empty"},
		{name: "bad module", in: "haha"},
		{name: "good module - no hit", in: "github.com/cedar-policy/cedar-go"},
		// currently not working; see issue: https://github.com/golang/go/issues/33976
		// {name: "good module - hit", in: "github.com/stretchr/testify/assert", want: true},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := GetModuleVersion(tc.in)
			if tc.want {
				assert.NotEmpty(t, got)
			} else {
				assert.Empty(t, got)
			}
		})
	}
}
