package pip

import (
	"log/slog"
	"net/url"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
	util "gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/utilities/slog"
)

func TestValidPath(t *testing.T) {
	testCases := []struct {
		name string
		path string
		want bool
	}{
		{name: "empty"},
		{name: "dot", path: ".", want: true},
		{name: "dot dot", path: "..", want: true},
		{name: "invalid", path: "/not/really/a/valid/path"},
		{name: "valid", path: "/usr/sbin", want: true},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := validPath(tc.path)
			assert.Equal(t, tc.want, got)
		})
	}
}

func TestNew(t *testing.T) {
	testCases := []struct {
		name           string
		level          slog.Level
		path           string
		recurse        bool
		wantLog        int
		wantAttributes types.AttributeSet
		wantEntities   types.EntitySet
	}{
		{
			name:           "no store",
			recurse:        true,
			wantLog:        1,
			wantAttributes: types.NewAttributeSet(),
			wantEntities:   types.NewEntitySet(),
		},
		{
			name:           "invalid store",
			path:           "/not/a/valid/path",
			recurse:        true,
			wantLog:        1,
			wantAttributes: types.NewAttributeSet(),
			wantEntities:   types.NewEntitySet(),
		},
		{
			name:    "with store, no recurse",
			level:   slog.LevelDebug,
			path:    "../../../testdata/unittest/pip",
			wantLog: 1,
			wantAttributes: types.NewAttributeSet(
				types.NewAttribute("maandag", 1),
				types.NewAttribute("dinsdag", 2),
				types.NewAttribute("woensdag", 3),
				types.NewAttribute("donderdag", 4),
				types.NewAttribute("vrijdag", 5),
			),
			wantEntities: types.NewEntitySet(
				types.NewEntity("App", "app1", types.NewAttributeSet(
					types.NewAttribute("code", "app1"),
					types.NewAttribute("name", "App-1"),
				)),
				types.NewEntity("App", "app2", types.NewAttributeSet(
					types.NewAttribute("code", "app2"),
					types.NewAttribute("name", "App-2"),
				)),
				types.NewEntity("App", "app3", types.NewAttributeSet(
					types.NewAttribute("code", "app3"),
					types.NewAttribute("name", "App-3"),
				), "App::app1", "App::app2",
				),
			),
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			h := util.NewDummyHandler(tc.level)

			p := New(tc.path, tc.recurse, slog.New(h), nil, nil)
			require.NotNil(t, p)

			p2, ok := p.(*pip)
			require.True(t, ok)
			require.NotNil(t, p2)

			assert.Equal(t, tc.wantLog, h.Count())

			if tc.wantAttributes != nil {
				tc.wantAttributes.IterateAttributes(func(key string, v1 any) {
					v2 := p2.attributes.GetAttribute(key)
					assert.EqualValues(t, v1, v2)
				})

				p2.attributes.IterateAttributes(func(key string, v1 any) {
					v2 := tc.wantAttributes.GetAttribute(key)
					assert.EqualValues(t, v1, v2)
				})
			}

			if tc.wantEntities != nil {
				tc.wantEntities.IterateEntities(func(e1 types.Entity) {
					e2 := p2.entities.GetEntity(e1.UID())
					require.NotNil(t, e2)
					assert.EqualValues(t, e1, e2)
				})

				p2.entities.IterateEntities(func(e1 types.Entity) {
					e2 := tc.wantEntities.GetEntity(e1.UID())
					require.NotNil(t, e2)
					assert.EqualValues(t, e1, e2)
				})
			}
		})
	}
}

func TestPIP_Attributes(t *testing.T) {
	t.Run("pip as AttributeSet", func(t *testing.T) {
		p := &pip{attributes: types.NewAttributeSet()}
		require.NotNil(t, p)

		p.AddAttribute("hello", "world")
		p.AddAttribute("int", "987")
		p.AddAttribute("float", "987.789")

		assert.Equal(t, "world", p.GetAttribute("hello"))
		assert.Nil(t, p.GetAttribute("bool"))

		p2 := &pip{attributes: types.NewAttributeSet(types.NewAttribute("hello", "world2"), &types.Attribute{Key: "bool", Value: true})}
		p.MergeAttributes(p2)

		assert.Equal(t, "world2", p.GetAttribute("hello"))
		assert.Equal(t, true, p.GetAttribute("bool"))

		p.RemoveAttribute("bool")
		p.RemoveAttribute("int")
		assert.Nil(t, p.GetAttribute("bool"))
		assert.Nil(t, p.GetAttribute("int"))

		var count int
		p.IterateAttributes(func(string, any) {
			count++
		})
		assert.Equal(t, 2, count)
	})
}

func TestPIP_Entities(t *testing.T) {
	t.Run("pip as EntitySet", func(t *testing.T) {
		p := &pip{entities: types.NewEntitySet()}
		require.NotNil(t, p)

		p.AddEntity(types.NewEntity("x", "y", types.NewAttributeSet()))
		p.AddEntity(types.NewEntity("x", "z", types.NewAttributeSet()))

		p.MergeEntities(
			types.NewEntitySet(
				types.NewEntity("q", "x", types.NewAttributeSet()),
				types.NewEntity("q", "y", types.NewAttributeSet()),
				types.NewEntity("q", "z", types.NewAttributeSet()),
			),
		)

		var count int
		p.IterateEntities(func(entity types.Entity) {
			count++
		})
		assert.Equal(t, 5, count)

		e := p.GetEntity("x::y")
		require.NotNil(t, e)

		e = p.GetEntity("x::x")
		require.Nil(t, e)

		p.RemoveEntity("q::y")
		p.RemoveEntity("q::x")

		count = 0
		p.IterateEntities(func(entity types.Entity) {
			count++
		})
		assert.Equal(t, 3, count)

		e = p.GetEntity("q::y")
		require.Nil(t, e)
	})
}

func TestPip_CollectAttributesFromRequest(t *testing.T) {
	emptyHTTP := types.NewAttribute("http", map[string]any{})
	emptyHeaders := types.NewAttribute("headers", map[string]string{})

	testCases := []struct {
		name    string
		level   slog.Level
		req     types.Request
		attr    types.AttributeSet
		wantLog int
		wantURI string
		want    types.AttributeSet
	}{
		{
			name: "empty",
			req:  types.Request{},
			attr: types.NewAttributeSet(),
			want: types.NewAttributeSet(emptyHTTP, emptyHeaders),
		},
		{
			name: "method",
			req:  types.Request{Method: "POST"},
			attr: types.NewAttributeSet(),
			want: types.NewAttributeSet(
				emptyHeaders,
				types.NewAttributeSet(
					types.NewAttribute("http", map[string]any{"method": "POST"}),
				),
			),
		},
		{
			name: "url",
			req: types.Request{URL: &url.URL{
				Scheme:   "https://",
				Host:     "www.disney.land",
				Path:     "/donald/duck",
				RawQuery: "x=y&q=www",
			}},
			attr: types.NewAttributeSet(),
			want: types.NewAttributeSet(
				emptyHeaders,
				types.NewAttributeSet(
					types.NewAttribute("http", map[string]any{
						"scheme": "https",
						"host":   "www.disney.land",
						"path":   "/donald/duck",
						"query":  map[string]string{"x": "y", "q": "www"},
					}),
				),
			),
		},
		{
			name: "headers",
			req:  types.Request{Headers: map[string][]string{"Content-Type": {"text/json"}, "hello": {"kitties", "world"}}},
			attr: types.NewAttributeSet(),
			want: types.NewAttributeSet(
				emptyHTTP,
				types.NewAttributeSet(types.NewAttribute("headers", map[string]string{"hello": "kitties,world"})),
				types.NewAttributeSet(types.NewAttribute("content-type", "text/json")),
			),
		},
		{
			name: "attributes",
			req:  types.Request{Attributes: map[string]any{"hello": "world", "int": 4567}},
			attr: types.NewAttributeSet(),
			want: types.NewAttributeSet(
				emptyHTTP,
				emptyHeaders,
				types.NewAttributeSet(
					types.NewAttribute("hello", "world"),
					types.NewAttribute("int", 4567),
				),
			),
		},
		{
			name:  "all with log",
			level: slog.LevelDebug,
			req: types.Request{
				Method: "POST",
				URL: &url.URL{
					Scheme:   "https://",
					Host:     "www.disney.land",
					Path:     "/donald/duck",
					RawQuery: "x=y&q=www",
				},
				Headers:    map[string][]string{"Content-Type": {"text/json"}, "hello": {"kitties", "world"}},
				Body:       []byte(`{"float": 12.12, "bool": false, "hello": "kitty"}`),
				Attributes: map[string]any{"hello": "world", "int": 765},
			},
			attr:    types.NewAttributeSet(),
			wantLog: 1,
			want: types.NewAttributeSet(
				types.NewAttributeSet(types.NewAttribute("content-type", "text/json")),
				types.NewAttributeSet(types.NewAttribute("headers", map[string]string{"hello": "kitties,world"})),
				types.NewAttributeSet(
					types.NewAttribute("http", map[string]any{
						"method": "POST",
						"scheme": "https",
						"host":   "www.disney.land",
						"path":   "/donald/duck",
						"query":  map[string]string{"x": "y", "q": "www"},
					}),
				),
				types.NewAttributeSet(
					types.NewAttribute("hello", "world"),
					types.NewAttribute("int", 765),
					types.NewAttribute("body", map[string]any{"float": 12.12, "bool": false, "hello": "kitty"}),
				),
			),
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			h := util.NewDummyHandler(tc.level)
			p := &pip{logger: slog.New(h), attributes: tc.attr, newAttributes: types.NewAttributeSet}

			got, newURI := p.CollectAttributesFromRequest(&tc.req)
			require.NotNil(t, got)
			assert.Equal(t, tc.wantURI, newURI)

			assert.Equal(t, tc.wantLog, h.Count())

			got.RemoveAttribute("request-time")

			tc.want.IterateAttributes(func(key string, v1 any) {
				v2 := got.GetAttribute(key)
				assert.EqualValues(t, v1, v2)
			})

			got.IterateAttributes(func(key string, v1 any) {
				v2 := tc.want.GetAttribute(key)
				assert.EqualValues(t, v1, v2)
			})
		})
	}
}
