package pip

import (
	"log/slog"
	"testing"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/standards"
	slog2 "gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/utilities/slog"
)

func TestProcessAuth(t *testing.T) {
	testCases := []struct {
		name        string
		auth        string
		wantLog     int
		wantJWT     bool
		wantValid   bool
		wantHeaders map[string]any
		wantClaims  map[string]any
	}{
		{
			name:    "empty",
			wantLog: 1,
		},
		{
			name:    "no bearer",
			auth:    "abcdef",
			wantLog: 1,
		},
		{
			name:    "invalid token",
			auth:    "Bearer abcdef",
			wantLog: 1,
		},
		{
			name:        "basic token",
			auth:        "Bearer " + signed(token1),
			wantJWT:     true,
			wantValid:   true,
			wantHeaders: map[string]any{"alg": "HS256", "typ": "JWT"},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			h := slog2.NewDummyHandler(slog.LevelDebug)
			p := &pip{logger: slog.New(h)}

			uid := uuid.New()
			req := &types.Request{UID: &uid}

			a := types.NewAttributeSet()
			require.NotNil(t, a)

			p.processAuth(req, tc.auth, a)

			if tc.wantLog > 0 {
				assert.Equal(t, tc.wantLog, h.Count())
			}

			if tc.wantJWT {
				token, ok := a.GetAttribute(standards.AttrJWT).(map[string]any)
				require.True(t, ok)
				require.NotNil(t, token)

				if tc.wantValid {
					got, ok2 := token[standards.AttrValid].(bool)
					require.True(t, ok2)
					assert.True(t, got)
				}

				if tc.wantHeaders != nil {
					got, ok2 := token[standards.AttrHeaders].(map[string]any)
					require.True(t, ok2)
					assert.EqualValues(t, tc.wantHeaders, got)
				}

				if tc.wantClaims != nil {
					got, ok2 := token[standards.AttrClaims].(map[string]any)
					require.True(t, ok2)
					assert.EqualValues(t, tc.wantClaims, got)
				}
			}
		})
	}
}

func signed(token *jwt.Token) string {
	s, _ := token.SignedString(key1)
	return s
}

var (
	key1   = []byte("secret1!")
	token1 = jwt.New(jwt.SigningMethodHS256)
)
