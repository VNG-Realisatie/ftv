package slog

import (
	"log/slog"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestInit(t *testing.T) {
	testCases := []struct {
		name      string
		output    string
		format    string
		level     string
		wantErr   bool
		testLevel slog.Level
		wantLevel bool
		wantJSON  bool
	}{
		{
			name:    "bad file",
			output:  "/this/is/not/a/valid/file.duh",
			wantErr: true,
		},
		{
			name:      "all empty",
			testLevel: slog.LevelInfo,
			wantLevel: true,
			wantJSON:  true,
		},
		{
			name:      "stdout - no fmt - no level",
			output:    "STDOUT",
			testLevel: slog.LevelInfo,
			wantLevel: true,
			wantJSON:  true,
		},
		{
			name:      "stderr - no fmt - no level",
			output:    "stderr",
			format:    "",
			level:     "",
			testLevel: slog.LevelInfo,
			wantLevel: true,
			wantJSON:  true,
		},
		{
			name:      "stdout - no fmt - warning",
			output:    "STDOUT",
			level:     "warning",
			testLevel: slog.LevelInfo,
			wantJSON:  true,
		},
		{
			name:      "stdout - text - debug",
			output:    "stdout",
			format:    "text",
			level:     "debug",
			testLevel: slog.LevelInfo,
			wantLevel: true,
		},
		{
			name:      "stdout - json - error",
			output:    "STDOUT",
			format:    "JSON",
			level:     "error",
			testLevel: slog.LevelWarn,
			wantJSON:  true,
		},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got, gotErr := Init(tc.output, tc.format, tc.level, false)
			if tc.wantErr {
				assert.Error(t, gotErr)
				assert.Nil(t, got)
			} else {
				assert.NoError(t, gotErr)
				require.NotNil(t, got)

				gotLevel := got.Enabled(nil, tc.testLevel)
				assert.Equal(t, tc.wantLevel, gotLevel)

				if tc.wantJSON {
					_, ok := got.Handler().(*slog.JSONHandler)
					assert.True(t, ok)
				} else {
					_, ok := got.Handler().(*slog.TextHandler)
					assert.True(t, ok)
				}
			}
		})
	}
}
