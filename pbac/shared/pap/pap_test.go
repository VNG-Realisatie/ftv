package pap

import (
	"bytes"
	"io"
	"log/slog"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	slog2 "gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/utilities/slog"
)

func TestNew(t *testing.T) {
	t.Run("new PAP", func(t *testing.T) {
		h := slog2.NewDummyHandler(0)

		p := New(slog.New(h), nil)
		require.NotNil(t, p)

		p2, ok := p.(*pap)
		require.True(t, ok)
		require.NotNil(t, p2)

		assert.NotNil(t, p2.logger)
		assert.Nil(t, p2.events)
		assert.NotNil(t, p2.policies)
	})
}

func TestPap_Add(t *testing.T) {
	closedFile, err := os.Open("/etc/hostname")
	require.NoError(t, err)
	closedFile.Close()

	testCases := []struct {
		name      string
		key       string
		data      io.Reader
		wantErr   bool
		wantCount int
	}{
		{name: "nil", key: "x1.txt"},
		{name: "closed file", key: "x2.txt", data: closedFile, wantErr: true},
		{name: "good file", key: "x3.txt", data: bytes.NewBuffer([]byte("some data")), wantCount: 1},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			h := slog2.NewDummyHandler(0)
			e := &eventCounter{}

			p := New(slog.New(h), e)
			require.NotNil(t, p)

			err2 := p.Add(tc.key, tc.data)
			if tc.wantErr {
				require.Error(t, err2)
			} else {
				require.NoError(t, err2)
				assert.Equal(t, tc.wantCount, e.added)
				assert.Zero(t, e.replaced)
				assert.Zero(t, e.removed)

				p2, ok := p.(*pap)
				require.True(t, ok)
				require.NotNil(t, p2)

				assert.Equal(t, tc.wantCount, len(p2.policies))
			}
		})
	}
}

func TestPap_Replace(t *testing.T) {
	closedFile, err := os.Open("/etc/hostname")
	require.NoError(t, err)
	closedFile.Close()

	testCases := []struct {
		name      string
		cached    []string
		key       string
		data      io.Reader
		wantErr   bool
		wantCount int
		want      string
	}{
		{
			name:    "empty cache",
			key:     "x1.txt",
			data:    bytes.NewBuffer([]byte("some data")),
			wantErr: true,
		},
		{
			name:    "key missing",
			cached:  []string{"x2.txt", "x3.txt"},
			key:     "x1.txt",
			data:    bytes.NewBuffer([]byte("some data")),
			wantErr: true,
		},
		{
			name:      "key found",
			cached:    []string{"x2.txt", "x3.txt", "x1.txt"},
			key:       "x1.txt",
			data:      bytes.NewBuffer([]byte("some data")),
			wantCount: 3,
			want:      "some data",
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			h := slog2.NewDummyHandler(0)
			e := &eventCounter{}

			p := New(slog.New(h), e)
			require.NotNil(t, p)

			for i := range tc.cached {
				key := tc.cached[i]
				err2 := p.Add(key, bytes.NewBuffer([]byte("data")))
				require.NoError(t, err2)
			}

			err2 := p.Replace(tc.key, tc.data)
			if tc.wantErr {
				require.Error(t, err2)
			} else {
				require.NoError(t, err2)
				assert.Equal(t, len(tc.cached), e.added)
				assert.Equal(t, 1, e.replaced)
				assert.Zero(t, e.removed)

				p2, ok := p.(*pap)
				require.True(t, ok)
				require.NotNil(t, p2)

				assert.Equal(t, tc.wantCount, len(p2.policies))

				f, err3 := p.Get(tc.key)
				require.NoError(t, err3)
				require.NotNil(t, f)

				data, err4 := io.ReadAll(f)
				require.NoError(t, err4)
				require.Equal(t, tc.want, string(data))
			}
		})
	}
}

func TestPap_Remove(t *testing.T) {
	testCases := []struct {
		name      string
		cached    []string
		key       string
		data      io.Reader
		wantErr   bool
		wantCount int
	}{
		{name: "empty cache", key: "x1.txt", wantErr: true},
		{name: "key missing", cached: []string{"x2.txt", "x3.txt"}, key: "x1.txt", wantErr: true},
		{name: "key found", cached: []string{"x2.txt", "x3.txt", "x1.txt"}, key: "x1.txt", wantCount: 2},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			h := slog2.NewDummyHandler(0)
			e := &eventCounter{}

			p := New(slog.New(h), e)
			require.NotNil(t, p)

			for i := range tc.cached {
				key := tc.cached[i]
				err2 := p.Add(key, bytes.NewBuffer([]byte("data")))
				require.NoError(t, err2)
			}

			err2 := p.Remove(tc.key)
			if tc.wantErr {
				require.Error(t, err2)
			} else {
				require.NoError(t, err2)
				assert.Equal(t, len(tc.cached), e.added)
				assert.Zero(t, e.replaced)
				assert.Equal(t, 1, e.removed)

				p2, ok := p.(*pap)
				require.True(t, ok)
				require.NotNil(t, p2)

				assert.Equal(t, tc.wantCount, len(p2.policies))

				f, err3 := p.Get(tc.key)
				require.Error(t, err3)
				require.Nil(t, f)
			}
		})
	}
}

func TestPap_ListAllKeys(t *testing.T) {
	testCases := []struct {
		name   string
		cached []string
		want   []string
	}{
		{name: "empty", want: []string{}},
		{name: "one", cached: []string{"x2.txt"}, want: []string{"x2.txt"}},
		{name: "few", cached: []string{"x2.txt", "x3.txt", "x1.txt"}, want: []string{"x1.txt", "x2.txt", "x3.txt"}},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			h := slog2.NewDummyHandler(0)

			p := New(slog.New(h), nil)
			require.NotNil(t, p)

			for i := range tc.cached {
				key := tc.cached[i]
				err2 := p.Add(key, bytes.NewBuffer([]byte("data")))
				require.NoError(t, err2)
			}

			got := p.ListAllKeys()
			assert.EqualValues(t, tc.want, got)
		})
	}
}

type eventCounter struct {
	added    int
	replaced int
	removed  int
}

func (e *eventCounter) Handle(t EventType, _ string) {
	switch t {
	case PolicyAdded:
		e.added++
	case PolicyReplaced:
		e.replaced++
	case PolicyRemoved:
		e.removed++
	default:
	}
}
