package pip

import (
	"encoding/base64"
	"log/slog"
	"testing"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/standards"
	util "gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/utilities/slog"
)

func TestProcessFSC(t *testing.T) {
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
		// {
		// 	name:        "basic token",
		// 	auth:        "Bearer " + signed2(token2),
		// 	wantJWT:     true,
		// 	wantValid:   true,
		// 	wantHeaders: map[string]any{"alg": "HS256", "typ": "JWT", "x5t#S256": key2},
		// 	wantClaims:  map[string]any{"aud": "hello", "svc": "world"},
		// },
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			h := util.NewDummyHandler(slog.LevelDebug)
			p := &pip{logger: slog.New(h)}

			uid := uuid.New()
			req := &types.Request{UID: &uid}

			a := types.NewAttributeSet()
			require.NotNil(t, a)

			p.processFSC(req, tc.auth, a)

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

func signed2(token *jwt.Token) string {
	s, err := token.SignedString(key2)
	if err != nil {
		panic(err)
	}
	return s
}

var (
	key2    = []byte("WatIsHet")
	key2b64 = base64.RawURLEncoding.EncodeToString(key2)
	token2  = &jwt.Token{
		Method: jwt.SigningMethodHS256,
		Header: map[string]any{"alg": "HS256", "typ": "JWT", "x5t#S256": key2b64},
		Claims: jwt.MapClaims{"aud": "hello", "svc": "world"},
	}
)
