package pip

import (
	"io"
	"log/slog"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/standards"
)

func TestProcessHeaders(t *testing.T) {
	testCases := []struct {
		name        string
		headers     map[string][]string
		wantURI     string
		wantCT      string
		wantAuth    bool
		wantFSC     bool
		wantKey     string
		wantGS      string
		wantDB      string
		wantZT      string
		wantTaak    string
		wantFwd     string
		wantHeaders map[string]string
	}{
		{
			name: "empty",
		},
		{
			name:    "content-type",
			headers: map[string][]string{"content-type": {"application/json"}},
			wantCT:  "application/json",
		},
		{
			name:    "Api-Key",
			headers: map[string][]string{"Api-Key": {"123456"}},
			wantKey: "123456",
		},
		{
			name:    "APIkey",
			headers: map[string][]string{"APIkey": {"123456"}},
			wantKey: "123456",
		},
		{
			name:    "x-apikey",
			headers: map[string][]string{"x-apikey": {"123456"}},
			wantKey: "123456",
		},
		{
			name:    "X-API-KEY",
			headers: map[string][]string{"X-API-KEY": {"123456"}},
			wantKey: "123456",
		},
		{
			name:    "GrondSlag",
			headers: map[string][]string{"GrondSlag": {"WetBRP"}},
			wantGS:  "WetBRP",
		},
		{
			name:    "doelBinding",
			headers: map[string][]string{"doelBinding": {"mijnzaak"}},
			wantDB:  "mijnzaak",
		},
		{
			name:    "ZaakType",
			headers: map[string][]string{"ZaakType": {"subsidie"}},
			wantZT:  "subsidie",
		},
		{
			name:     "TAAK",
			headers:  map[string][]string{"TAAK": {"controle"}},
			wantTaak: "controle",
		},
		{
			name:    "X-Forwarded-For",
			headers: map[string][]string{"X-Forwarded-For": {"192.168.0.1"}},
			wantFwd: "192.168.0.1",
		},
		{
			name:    "Forwarded",
			headers: map[string][]string{"X-Forwarded-For": {"192.168.0.19"}},
			wantFwd: "192.168.0.19",
		},
		{
			name:    "X-Forwarded-For & Forwarded",
			headers: map[string][]string{"Forwarded": {"127.0.0.1"}, "X-Forwarded-For": {"192.168.0.11"}},
			wantFwd: "192.168.0.11",
		},
		{
			name:        "one other",
			headers:     map[string][]string{"Vessel": {"cup-of-tea"}},
			wantHeaders: map[string]string{"Vessel": "cup-of-tea"},
		},
		{
			name:        "few other",
			headers:     map[string][]string{"Vessel": {"cup-of-tea"}, "parents": {"mom", "dad"}},
			wantHeaders: map[string]string{"Vessel": "cup-of-tea", "parents": "mom,dad"}},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			p := &pip{logger: slog.New(slog.NewTextHandler(io.Discard, nil))}

			a := types.NewAttributeSet()
			require.NotNil(t, a)

			req := &types.Request{Headers: tc.headers}
			newURI := p.processHeaders(req, a)

			if tc.wantURI != "" {
				assert.Equal(t, tc.wantURI, newURI)
			} else {
				assert.Empty(t, newURI)
			}

			if tc.wantCT != "" {
				assert.Equal(t, tc.wantCT, a.GetAttribute(standards.AttrContentType))
			} else {
				assert.Nil(t, a.GetAttribute(standards.AttrContentType))
			}

			if tc.wantAuth {
				assert.NotNil(t, a.GetAttribute(standards.AttrJWT))
			} else {
				assert.Nil(t, a.GetAttribute(standards.AttrJWT))
			}

			if tc.wantFSC {
				assert.NotNil(t, a.GetAttribute(standards.AttrFSC))
			} else {
				assert.Nil(t, a.GetAttribute(standards.AttrFSC))
			}

			if tc.wantKey != "" {
				assert.Equal(t, tc.wantKey, a.GetAttribute(standards.AttrApiKey))
			} else {
				assert.Nil(t, a.GetAttribute(standards.AttrApiKey))
			}

			if tc.wantGS != "" {
				assert.Equal(t, tc.wantGS, a.GetAttribute(standards.AttrGrondslag))
			} else {
				assert.Nil(t, a.GetAttribute(standards.AttrGrondslag))
			}

			if tc.wantDB != "" {
				assert.Equal(t, tc.wantDB, a.GetAttribute(standards.AttrDoelbinding))
			} else {
				assert.Nil(t, a.GetAttribute(standards.AttrDoelbinding))
			}

			if tc.wantZT != "" {
				assert.Equal(t, tc.wantZT, a.GetAttribute(standards.AttrZaakType))
			} else {
				assert.Nil(t, a.GetAttribute(standards.AttrZaakType))
			}

			if tc.wantTaak != "" {
				assert.Equal(t, tc.wantTaak, a.GetAttribute(standards.AttrTaak))
			} else {
				assert.Nil(t, a.GetAttribute(standards.AttrTaak))
			}

			if tc.wantFwd != "" {
				assert.Equal(t, tc.wantFwd, a.GetAttribute(standards.AttrClientIP))
			} else {
				assert.Nil(t, a.GetAttribute(standards.AttrClientIP))
			}

			other, ok := a.GetAttribute(standards.AttrHeaders).(map[string]string)
			require.True(t, ok)
			require.NotNil(t, other)

			if tc.wantHeaders != nil {
				assert.EqualValues(t, tc.wantHeaders, other)
			} else {
				assert.Empty(t, other)
			}
		})
	}
}
