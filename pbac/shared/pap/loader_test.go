package pap

import (
	"log/slog"
	"testing"

	"github.com/stretchr/testify/assert"

	slog2 "gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/utilities/slog"
)

func TestCache_LoadFromStore(t *testing.T) {
	testCases := []struct {
		name         string
		path         string
		recurse      bool
		wantLog      int
		wantPolicies int
	}{
		{
			name:    "empty",
			recurse: true,
			wantLog: 1,
		},
		{
			name:    "invalid",
			path:    "/this/is/not/a/directory",
			recurse: true,
			wantLog: 1,
		},
		{
			name:         "cedar/brp",
			path:         "../../../testdata/policies/cedar/brp",
			recurse:      true,
			wantPolicies: 2,
		},
		{
			name:         "cedar - recurse",
			path:         "../../../testdata/policies/cedar",
			recurse:      true,
			wantPolicies: 4,
		},
		{
			name: "cedar - no recurse",
			path: "../../../testdata/policies/cedar",
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			h := slog2.NewDummyHandler(slog.LevelInfo)
			c := &pap{
				logger:   slog.New(h),
				policies: make(map[string][]byte),
			}

			c.LoadFromStore(tc.path, tc.recurse)

			assert.Equal(t, tc.wantLog, h.Count())
			assert.Equal(t, tc.wantPolicies, len(c.policies))
		})
	}
}
