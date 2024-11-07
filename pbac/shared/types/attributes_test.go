package types

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNewAttributeSet(t *testing.T) {
	testCases := []struct {
		name string
		in   []AttributeSet
		want map[string]any
	}{
		{
			name: "empty",
			want: make(map[string]any),
		},
		{
			name: "one set",
			in:   []AttributeSet{&attributes{set: map[string]any{"hello": "world", "int": 123}}},
			want: map[string]any{"hello": "world", "int": 123},
		},
		{
			name: "few sets",
			in: []AttributeSet{
				&attributes{set: map[string]any{"hello": "world", "int": 123}},
				&attributes{set: map[string]any{"int": 456, "world": "hello"}},
				&attributes{set: map[string]any{"hello": "world2", "bool": true}},
			},
			want: map[string]any{"hello": "world2", "int": 456, "bool": true, "world": "hello"},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := NewAttributeSet(tc.in...)
			require.NotNil(t, got)

			got2, ok := got.(*attributes)
			require.True(t, ok)
			require.NotNil(t, got2)
			assert.EqualValues(t, tc.want, got2.set)

			got3 := MapFromAttributes(got)
			require.NotNil(t, got3)

			for k, v := range tc.want {
				v2 := got.GetAttribute(k)
				assert.Equal(t, v, v2)
			}

			got.IterateAttributes(func(key string, value any) {
				assert.Equal(t, tc.want[key], value)
			})
		})
	}
}

func TestAttributes_AddAttribute(t *testing.T) {
	testCases := []struct {
		name  string
		in    AttributeSet
		key   string
		value any
		want  map[string]any
	}{
		{
			name:  "empty",
			in:    &attributes{set: make(map[string]any)},
			key:   "hello",
			value: 12345,
			want:  map[string]any{"hello": 12345},
		},
		{
			name:  "new key",
			in:    &attributes{set: map[string]any{"hello": "world", "int": 123, "bool": true}},
			key:   "float",
			value: 12345.6789,
			want:  map[string]any{"hello": "world", "int": 123, "bool": true, "float": 12345.6789},
		},
		{
			name:  "duplicate key",
			in:    &attributes{set: map[string]any{"hello": "world", "int": 123, "bool": true}},
			key:   "int",
			value: 12345.6789,
			want:  map[string]any{"hello": "world", "bool": true, "int": 12345.6789},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			a := tc.in
			a.AddAttribute(tc.key, tc.value)

			got := MapFromAttributes(a)
			require.NotNil(t, got)
			assert.EqualValues(t, tc.want, got)
		})
	}
}

func TestAttributes_RemoveAttribute(t *testing.T) {
	testCases := []struct {
		name string
		in   AttributeSet
		key  string
		want map[string]any
	}{
		{
			name: "empty",
			in:   &attributes{set: make(map[string]any)},
			key:  "hello",
			want: map[string]any{},
		},
		{
			name: "miss",
			in:   &attributes{set: map[string]any{"hello": "world", "int": 123, "bool": true}},
			key:  "float",
			want: map[string]any{"hello": "world", "int": 123, "bool": true},
		},
		{
			name: "hit",
			in:   &attributes{set: map[string]any{"hello": "world", "int": 123, "bool": true}},
			key:  "int",
			want: map[string]any{"hello": "world", "bool": true},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			a := tc.in
			a.RemoveAttribute(tc.key)

			got := MapFromAttributes(a)
			require.NotNil(t, got)
			assert.EqualValues(t, tc.want, got)
		})
	}
}

func TestAttributes_MergeAttributes(t *testing.T) {
	testCases := []struct {
		name  string
		in    AttributeSet
		merge []AttributeSet
		want  map[string]any
	}{
		{
			name: "both empty",
			in:   &attributes{set: make(map[string]any)},
			want: make(map[string]any),
		},
		{
			name:  "add one set",
			in:    &attributes{set: map[string]any{"hello": "world", "int": 123}},
			merge: []AttributeSet{&attributes{set: map[string]any{"hello": "world2", "bool": true}}},
			want:  map[string]any{"hello": "world2", "int": 123, "bool": true},
		},
		{
			name: "add few sets",
			in:   &attributes{set: map[string]any{"hello": "world", "int": 234}},
			merge: []AttributeSet{
				&attributes{set: map[string]any{"hello": "world", "int": 123}},
				&attributes{set: map[string]any{"int": 456, "world": "hello"}},
				&attributes{set: map[string]any{"hello": "world2", "bool": true}},
			},
			want: map[string]any{"hello": "world2", "int": 456, "bool": true, "world": "hello"},
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			a := tc.in
			a.MergeAttributes(tc.merge...)

			got := MapFromAttributes(a)
			require.NotNil(t, got)
			assert.EqualValues(t, tc.want, got)
		})
	}
}
