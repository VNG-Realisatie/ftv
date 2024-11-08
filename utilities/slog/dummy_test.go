package slog

import (
	"log/slog"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestNewDummyHandler(t *testing.T) {
	testCases := []struct {
		name  string
		lvl   slog.Level
		group string
		attrs []slog.Attr
		count int
	}{
		{
			name: "empty",
			lvl:  slog.LevelInfo,
		},
		{
			name:  "with group",
			lvl:   slog.LevelError,
			count: 5,
		},
		{
			name:  "with attributes",
			lvl:   slog.Level(-2),
			attrs: []slog.Attr{slog.String("key", "value")},
			count: 15,
		},
		{
			name:  "all",
			lvl:   slog.LevelWarn,
			group: "group1",
			attrs: []slog.Attr{slog.String("key", "value")},
			count: 99,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			h := NewDummyHandler(tc.lvl)
			require.NotNil(t, h)

			assert.True(t, h.Enabled(nil, tc.lvl))
			assert.True(t, h.Enabled(nil, slog.LevelError))
			assert.False(t, h.Enabled(nil, slog.LevelDebug))

			if tc.group != "" {
				h3 := h.WithGroup(tc.group)
				require.NotNil(t, h3)
				assert.Equal(t, tc.group, h.Group())
			}

			if tc.attrs != nil {
				h3 := h.WithAttrs(tc.attrs)
				require.NotNil(t, h3)
				assert.Equal(t, tc.attrs, h.Attributes())
			}

			for range tc.count {
				err := h.Handle(nil, slog.NewRecord(time.Now(), tc.lvl, "hello world", 0))
				require.NoError(t, err)
			}

			assert.Equal(t, tc.count, h.Count())

			h.Iterate(func(t2 time.Time, msg string, lvl slog.Level) {
				assert.NotZero(t, t2)
				assert.Equal(t, "hello world", msg)
				assert.Equal(t, tc.lvl, lvl)
			})

			h.Clear()
			assert.Zero(t, h.Count())
		})
	}
}
