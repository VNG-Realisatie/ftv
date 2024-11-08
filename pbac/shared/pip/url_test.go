package pip

import (
	"net/url"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/standards"
)

func TestProcessURL(t *testing.T) {
	testCases := []struct {
		name       string
		method     string
		url        *url.URL
		wantScheme string
		wantHost   string
		wantPath   string
		wantQuery  map[string]string
	}{
		{
			name: "empty",
			url:  &url.URL{},
		},
		{
			name:     "bare",
			url:      mustParse("oh.my"),
			wantPath: "oh.my",
		},
		{
			name:       "with scheme",
			method:     "GET",
			url:        mustParse("http://oh.my"),
			wantScheme: "http",
			wantHost:   "oh.my",
		},
		{
			name:       "with path",
			method:     "POST",
			url:        mustParse("https://oh.my/this/is/the/way"),
			wantScheme: "https",
			wantHost:   "oh.my",
			wantPath:   "/this/is/the/way",
		},
		{
			name:       "with query",
			method:     "something",
			url:        mustParse("https://oh.my/this/is/the/way?name=grogu&kind=greenThingWithBigEars"),
			wantScheme: "https",
			wantHost:   "oh.my",
			wantPath:   "/this/is/the/way",
			wantQuery:  map[string]string{"name": "grogu", "kind": "greenThingWithBigEars"},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			p := &pip{}
			now := time.Now()

			a := types.NewAttributeSet()
			require.NotNil(t, a)

			req := &types.Request{
				URL:         tc.url,
				Method:      tc.method,
				RequestTime: &now,
			}

			p.processURL(req, a)

			m, ok := a.GetAttribute("http").(map[string]any)
			require.True(t, ok)
			require.NotNil(t, m)

			assert.Equal(t, now, m[standards.AttrRequestTime])

			if tc.method != "" {
				assert.Equal(t, tc.method, m[standards.AttrMethod])
			}
			if tc.wantScheme != "" {
				assert.Equal(t, tc.wantScheme, m[standards.AttrScheme])
			}
			if tc.wantHost != "" {
				assert.Equal(t, tc.wantHost, m[standards.AttrHost])
			}
			if tc.wantPath != "" {
				assert.Equal(t, tc.wantPath, m[standards.AttrPath])
			}
			if tc.wantQuery != nil {
				assert.EqualValues(t, tc.wantQuery, m[standards.AttrQuery])
			}
		})
	}
}

func mustParse(in string) *url.URL {
	if out, err := url.Parse(in); err == nil {
		return out
	}
	return &url.URL{}
}
