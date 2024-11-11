package pip

import (
	"log/slog"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
	util "gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/utilities/slog"
)

func TestLoadEntities(t *testing.T) {
	testCases := []struct {
		name    string
		path    string
		wantLog int
		want    types.EntitySet
	}{
		{
			name:    "empty",
			wantLog: 1,
		},
		{
			name:    "bad path",
			path:    "/this/is/another/bad/file",
			wantLog: 1,
			want:    types.NewEntitySet(),
		},
		{
			name:    "not yaml",
			path:    "../../../testdata/unittest/pip/not_yaml.yaml",
			wantLog: 1,
			want:    types.NewEntitySet(),
		},
		{
			name: "1 entity",
			path: "../../../testdata/unittest/pip/ent/entity.yaml",
			want: types.NewEntitySet(
				types.NewEntity("App", "app1", types.NewAttributeSet(
					types.NewAttribute("code", "app1"),
					types.NewAttribute("name", "App-1"),
				)),
			),
		},
		{
			name: "few entities",
			path: "../../../testdata/unittest/pip/ent/entities.yaml",
			want: types.NewEntitySet(
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
			h := util.NewDummyHandler(slog.LevelDebug)

			p := &pip{
				logger:        slog.New(h),
				entities:      types.NewEntitySet(),
				newAttributes: types.NewAttributeSet,
			}

			p.loadEntities(tc.path)

			assert.Equal(t, tc.wantLog, h.Count())

			if tc.wantLog == 0 {
				tc.want.IterateEntities(func(e1 types.Entity) {
					e2 := p.entities.GetEntity(e1.UID())
					require.NotNil(t, e2)
					assert.EqualValues(t, e1, e2)
				})

				p.entities.IterateEntities(func(e1 types.Entity) {
					e2 := tc.want.GetEntity(e1.UID())
					require.NotNil(t, e2)
					assert.EqualValues(t, e1, e2)
				})
			}
		})
	}
}

func TestLoadAttributes(t *testing.T) {
	testCases := []struct {
		name    string
		path    string
		wantLog int
		want    types.AttributeSet
	}{
		{
			name:    "empty",
			wantLog: 1,
		},
		{
			name:    "bad path",
			path:    "/this/is/another/bad/file",
			wantLog: 1,
			want:    types.NewAttributeSet(),
		},
		{
			name:    "not yaml",
			path:    "../../../testdata/unittest/pip/not_yaml.yaml",
			wantLog: 1,
			want:    types.NewAttributeSet(),
		},
		{
			name: "1 attribute",
			path: "../../../testdata/unittest/pip/attr/attribute.yaml",
			want: types.NewAttributeSet(
				types.NewAttribute("maandag", 1),
			),
		},
		{
			name: "few attributes",
			path: "../../../testdata/unittest/pip/attr/attributes.yaml",
			want: types.NewAttributeSet(
				types.NewAttribute("maandag", 1),
				types.NewAttribute("dinsdag", 2),
				types.NewAttribute("woensdag", 3),
				types.NewAttribute("donderdag", 4),
				types.NewAttribute("vrijdag", 5),
			),
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			h := util.NewDummyHandler(slog.LevelDebug)

			p := &pip{
				logger:     slog.New(h),
				attributes: types.NewAttributeSet(),
			}

			p.loadAttributes(tc.path)

			assert.Equal(t, tc.wantLog, h.Count())

			if tc.wantLog == 0 {
				tc.want.IterateAttributes(func(key string, v1 any) {
					v2 := p.attributes.GetAttribute(key)
					assert.EqualValues(t, v1, v2)
				})

				p.attributes.IterateAttributes(func(key string, v1 any) {
					v2 := tc.want.GetAttribute(key)
					assert.EqualValues(t, v1, v2)
				})
			}
		})
	}
}

func TestLoad(t *testing.T) {
	testCases := []struct {
		name           string
		path1          string
		path2          string
		recurse        bool
		wantLog        int
		wantAttributes types.AttributeSet
		wantEntities   types.EntitySet
	}{
		{
			name:    "no stores",
			recurse: true,
		},
		{
			name:    "bad attr store",
			path1:   "/not/another/existing/folder",
			recurse: true,
			wantLog: 1,
		},
		{
			name:    "bad entity store",
			path1:   "",
			path2:   "/this/is/also/not/real",
			recurse: true,
			wantLog: 1,
		},
		{
			name:    "bad stores",
			path1:   "/not/another/existing/folder",
			path2:   "/this/is/also/not/real",
			recurse: true,
			wantLog: 2,
		},
		{
			name:           "attr store, no recurse",
			path1:          "../../../testdata/unittest/pip",
			wantLog:        1,
			wantAttributes: types.NewAttributeSet(),
			wantEntities:   types.NewEntitySet(),
		},
		{
			name:    "attr store, recurse",
			path1:   "../../../testdata/unittest/pip",
			recurse: true,
			wantLog: 1,
			wantAttributes: types.NewAttributeSet(
				types.NewAttribute("maandag", 1),
				types.NewAttribute("dinsdag", 2),
				types.NewAttribute("woensdag", 3),
				types.NewAttribute("donderdag", 4),
				types.NewAttribute("vrijdag", 5),
			),
			wantEntities: types.NewEntitySet(),
		},
		{
			name:           "entity store, no recurse",
			path2:          "../../../testdata/unittest/pip",
			wantLog:        1,
			wantAttributes: types.NewAttributeSet(),
			wantEntities:   types.NewEntitySet(),
		},
		{
			name:           "entity store, recurse",
			path2:          "../../../testdata/unittest/pip",
			recurse:        true,
			wantLog:        1,
			wantAttributes: types.NewAttributeSet(),
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
		{
			name:           "all, no recurse",
			path1:          "../../../testdata/unittest/pip",
			path2:          "../../../testdata/unittest/pip",
			wantLog:        2,
			wantAttributes: types.NewAttributeSet(),
			wantEntities:   types.NewEntitySet(),
		},
		{
			name:    "all, recurse",
			path1:   "../../../testdata/unittest/pip",
			path2:   "../../../testdata/unittest/pip",
			recurse: true,
			wantLog: 2,
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
			h := util.NewDummyHandler(slog.LevelDebug)

			p := &pip{
				attrStore:     tc.path1,
				entityStore:   tc.path2,
				recurse:       tc.recurse,
				logger:        slog.New(h),
				attributes:    types.NewAttributeSet(),
				entities:      types.NewEntitySet(),
				newAttributes: types.NewAttributeSet,
			}

			p.load()

			assert.Equal(t, tc.wantLog, h.Count())

			if tc.wantLog == 0 {
				if tc.wantAttributes != nil {
					tc.wantAttributes.IterateAttributes(func(key string, v1 any) {
						v2 := p.attributes.GetAttribute(key)
						assert.EqualValues(t, v1, v2)
					})

					p.attributes.IterateAttributes(func(key string, v1 any) {
						v2 := tc.wantAttributes.GetAttribute(key)
						assert.EqualValues(t, v1, v2)
					})
				}

				if tc.wantEntities != nil {
					tc.wantEntities.IterateEntities(func(e1 types.Entity) {
						e2 := p.entities.GetEntity(e1.UID())
						require.NotNil(t, e2)
						assert.EqualValues(t, e1, e2)
					})

					p.entities.IterateEntities(func(e1 types.Entity) {
						e2 := tc.wantEntities.GetEntity(e1.UID())
						require.NotNil(t, e2)
						assert.EqualValues(t, e1, e2)
					})
				}
			}
		})
	}
}
