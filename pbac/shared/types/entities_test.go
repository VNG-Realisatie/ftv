package types

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNewEntity(t *testing.T) {
	testCases := []struct {
		name    string
		ns      string
		id      string
		attr    AttributeSet
		parents []string
		wantUID string
	}{
		{
			name:    "empty",
			wantUID: "::",
		},
		{
			name:    "no attributes, no parents",
			ns:      "entity",
			id:      "x1",
			wantUID: "entity::x1",
		},
		{
			name:    "just attributes",
			ns:      "entity",
			id:      "x2",
			attr:    &attributes{set: map[string]any{"hello": "world", "int": 123}},
			wantUID: "entity::x2",
		},
		{
			name:    "just parents",
			ns:      "entity",
			id:      "x3",
			parents: []string{"entity::x1", "entity::x2"},
			wantUID: "entity::x3",
		},
		{
			name:    "all",
			ns:      "entity",
			id:      "x4",
			attr:    &attributes{set: map[string]any{"hello": "world", "int": 123}},
			parents: []string{"entity::x3", "entity::x2"},
			wantUID: "entity::x4",
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := NewEntity(tc.ns, tc.id, tc.attr, tc.parents...)
			require.NotNil(t, got)

			got2, ok := got.(*entity)
			require.True(t, ok)
			require.NotNil(t, got2)

			assert.Equal(t, tc.wantUID, got.UID())
			assert.Equal(t, tc.ns, got.Type())
			assert.Equal(t, tc.id, got.ID())
			assert.Equal(t, tc.attr, got.Attributes())
			assert.Equal(t, tc.parents, got.Parents())
		})
	}
}

func TestNewEntitySet(t *testing.T) {
	e1 := NewEntity("entity", "x1", NewAttributeSet())
	e2 := NewEntity("entity", "x2", NewAttributeSet())
	e3 := NewEntity("entity", "x3", NewAttributeSet())
	e4 := NewEntity("entity", "x4", NewAttributeSet())
	dup2 := NewEntity("entity", "x2", NewAttributeSet())

	testCases := []struct {
		name string
		in   []EntitySet
		want map[string]Entity
	}{
		{
			name: "empty",
		},
		{
			name: "one set",
			in: []EntitySet{
				&entities{set: map[string]Entity{e1.UID(): e1}},
			},
			want: map[string]Entity{e1.UID(): e1},
		},
		{
			name: "few sets - no dupes",
			in: []EntitySet{
				&entities{set: map[string]Entity{e1.UID(): e1}},
				&entities{set: map[string]Entity{e2.UID(): e2}},
				&entities{set: map[string]Entity{e3.UID(): e3}},
			},
			want: map[string]Entity{e1.UID(): e1, e2.UID(): e2, e3.UID(): e3},
		},
		{
			name: "few sets - 1 dupe",
			in: []EntitySet{
				&entities{set: map[string]Entity{e1.UID(): e1}},
				&entities{set: map[string]Entity{e2.UID(): e2}},
				&entities{set: map[string]Entity{e3.UID(): e3}},
				&entities{set: map[string]Entity{e4.UID(): e4}},
				&entities{set: map[string]Entity{dup2.UID(): dup2}},
			},
			want: map[string]Entity{e1.UID(): e1, dup2.UID(): dup2, e3.UID(): e3, e4.UID(): e4},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := NewEntitySet(tc.in...)
			require.NotNil(t, got)

			got2, ok := got.(*entities)
			require.True(t, ok)
			require.NotNil(t, got2)

			for k, v := range tc.want {
				v2 := got.GetEntity(k)
				assert.EqualValues(t, v, v2)
			}

			got.IterateEntities(func(entity Entity) {
				assert.EqualValues(t, tc.want[entity.UID()], entity)
			})
		})
	}
}

func TestEntities_AddEntity(t *testing.T) {
	e1 := NewEntity("entity", "x1", NewAttributeSet())
	e2 := NewEntity("entity", "x2", NewAttributeSet())
	e3 := NewEntity("entity", "x3", NewAttributeSet())
	e4 := NewEntity("entity", "x4", NewAttributeSet())
	dup2 := NewEntity("entity", "x2", NewAttributeSet())

	testCases := []struct {
		name string
		in   EntitySet
		add  Entity
		want map[string]Entity
	}{
		{
			name: "empty",
			in:   NewEntitySet(),
			add:  e3,
			want: map[string]Entity{e3.UID(): e3},
		},
		{
			name: "new key",
			in:   NewEntitySet(&entities{set: map[string]Entity{e1.UID(): e1, e4.UID(): e4}}),
			add:  e3,
			want: map[string]Entity{e1.UID(): e1, e3.UID(): e3, e4.UID(): e4},
		},
		{
			name: "duplicate key",
			in:   NewEntitySet(&entities{set: map[string]Entity{e2.UID(): e2, e3.UID(): e3}}),
			add:  dup2,
			want: map[string]Entity{dup2.UID(): dup2, e3.UID(): e3},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			e := tc.in
			e.AddEntity(tc.add)

			for k, v := range tc.want {
				v2 := e.GetEntity(k)
				assert.EqualValues(t, v, v2)
			}

			e.IterateEntities(func(entity Entity) {
				assert.EqualValues(t, tc.want[entity.UID()], entity)
			})
		})
	}
}

func TestEntities_RemoveEnmtity(t *testing.T) {
	e1 := NewEntity("entity", "x1", NewAttributeSet())
	e2 := NewEntity("entity", "x2", NewAttributeSet())
	e3 := NewEntity("entity", "x3", NewAttributeSet())
	e4 := NewEntity("entity", "x4", NewAttributeSet())

	testCases := []struct {
		name string
		in   EntitySet
		key  string
		want map[string]Entity
	}{
		{
			name: "empty",
			in:   NewEntitySet(),
			key:  "hello::x1",
			want: map[string]Entity{},
		},
		{
			name: "miss",
			in:   NewEntitySet(&entities{set: map[string]Entity{e1.UID(): e1, e4.UID(): e4}}),
			key:  "entity::x2",
			want: map[string]Entity{e1.UID(): e1, e4.UID(): e4},
		},
		{
			name: "hit",
			in:   NewEntitySet(&entities{set: map[string]Entity{e2.UID(): e2, e3.UID(): e3}}),
			key:  "entity::x2",
			want: map[string]Entity{e3.UID(): e3},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			e := tc.in
			e.RemoveEntity(tc.key)

			for k, v := range tc.want {
				v2 := e.GetEntity(k)
				assert.EqualValues(t, v, v2)
			}

			e.IterateEntities(func(entity Entity) {
				assert.EqualValues(t, tc.want[entity.UID()], entity)
			})
		})
	}
}

func TestEntities_MergeEntities(t *testing.T) {
	e1 := NewEntity("entity", "x1", NewAttributeSet())
	e2 := NewEntity("entity", "x2", NewAttributeSet())
	e3 := NewEntity("entity", "x3", NewAttributeSet())
	e4 := NewEntity("entity", "x4", NewAttributeSet())
	e5 := NewEntity("entity", "x5", NewAttributeSet())
	e6 := NewEntity("entity", "x6", NewAttributeSet())

	testCases := []struct {
		name  string
		in    EntitySet
		merge []EntitySet
		want  map[string]Entity
	}{
		{
			name: "both empty",
			in:   NewEntitySet(),
			want: make(map[string]Entity),
		},
		{
			name:  "add one set",
			in:    NewEntitySet(&entities{set: map[string]Entity{e1.UID(): e1, e4.UID(): e4}}),
			merge: []EntitySet{NewEntitySet(&entities{set: map[string]Entity{e2.UID(): e2, e3.UID(): e3}})},
			want:  map[string]Entity{e1.UID(): e1, e2.UID(): e2, e3.UID(): e3, e4.UID(): e4},
		},
		{
			name: "add few sets",
			in:   NewEntitySet(&entities{set: map[string]Entity{e1.UID(): e1, e4.UID(): e4}}),
			merge: []EntitySet{
				NewEntitySet(&entities{set: map[string]Entity{e5.UID(): e5, e3.UID(): e3}}),
				NewEntitySet(&entities{set: map[string]Entity{e6.UID(): e6, e4.UID(): e4}}),
			},
			want: map[string]Entity{e1.UID(): e1, e3.UID(): e3, e4.UID(): e4, e5.UID(): e5, e6.UID(): e6},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			e := tc.in
			e.MergeEntities(tc.merge...)

			for k, v := range tc.want {
				v2 := e.GetEntity(k)
				assert.EqualValues(t, v, v2)
			}

			e.IterateEntities(func(entity Entity) {
				assert.EqualValues(t, tc.want[entity.UID()], entity)
			})
		})
	}
}
