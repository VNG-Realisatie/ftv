package compare

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestTimePtrsEqual(t *testing.T) {
	var (
		d1 = time.Date(2024, 7, 1, 0, 0, 0, 0, time.UTC)
		d2 = time.Date(2024, 7, 1, 0, 0, 0, 1, time.UTC)
	)

	testCases := []struct {
		name string
		d1   *time.Time
		d2   *time.Time
		want bool
	}{
		{name: "nil / nil", want: true},
		{name: "valid / nil", d1: &d1},
		{name: "nil / valid", d2: &d2},
		{name: "unequal", d1: &d1, d2: &d2},
		{name: "equal (1)", d1: &d1, d2: &d1, want: true},
		{name: "equal (2)", d1: &d2, d2: &d2, want: true},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := TimePtrsEqual(tc.d1, tc.d2)
			assert.Equal(t, tc.want, got)
		})
	}
}
