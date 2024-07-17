package convert

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPrependZero10(t *testing.T) {
	testCases := []struct {
		n    uint
		size uint
		want string
	}{
		{n: 0, size: 0, want: "0"},
		{n: 1, size: 0, want: "1"},
		{n: 9, size: 0, want: "9"},
		{n: 10, size: 0, want: "10"},
		{n: 0, size: 4, want: "0000"},
		{n: 1, size: 4, want: "0001"},
		{n: 9, size: 4, want: "0009"},
		{n: 10, size: 4, want: "0010"},
		{n: 99, size: 4, want: "0099"},
		{n: 100, size: 4, want: "0100"},
		{n: 999, size: 4, want: "0999"},
		{n: 1000, size: 4, want: "1000"},
		{n: 9999, size: 4, want: "9999"},
		{n: 10000, size: 4, want: "10000"},
	}

	for _, tc := range testCases {
		t.Run(fmt.Sprintf("value %d size %d", tc.n, tc.size), func(t *testing.T) {
			got := PrependZero10(tc.n, tc.size)
			assert.Equal(t, tc.want, got)
		})
	}
}

func TestMustInt10(t *testing.T) {
	testCases := []struct {
		input string
		want  int
	}{
		{input: " x "},
		{input: ""},
		{input: "  \t\t  "},
		{input: "0"},
		{input: "1", want: 1},
		{input: "\t\t1  ", want: 1},
		{input: "  1\t", want: 1},
		{input: "9", want: 9},
		{input: "10", want: 10},
		{input: "0000"},
		{input: "0001", want: 1},
		{input: "0010", want: 10},
		{input: "0100", want: 100},
		{input: "1000", want: 1000},
		{input: "10000", want: 10000},
		{input: "0009", want: 9},
		{input: "0099", want: 99},
		{input: "0999", want: 999},
		{input: "9999", want: 9999},
		{input: "99999", want: 99999},
		{input: "-1", want: -1},
		{input: "-11", want: -11},
		{input: "-1111", want: -1111},
		{input: "  -11111  ", want: -11111},
	}

	for _, tc := range testCases {
		t.Run(tc.input, func(t *testing.T) {
			got := MustInt10(tc.input)
			assert.Equal(t, tc.want, got)
		})
	}
}

func TestFromInt10(t *testing.T) {
	testCases := []struct {
		input string
		want  int
		fail  bool
	}{
		{input: " x ", fail: true},
		{input: "", fail: true},
		{input: "  \t\t  ", fail: true},
		{input: "0"},
		{input: "1", want: 1},
		{input: "\t\t1  ", want: 1},
		{input: "  1\t", want: 1},
		{input: "9", want: 9},
		{input: "10", want: 10},
		{input: "0000"},
		{input: "0001", want: 1},
		{input: "0010", want: 10},
		{input: "0100", want: 100},
		{input: "1000", want: 1000},
		{input: "10000", want: 10000},
		{input: "0009", want: 9},
		{input: "0099", want: 99},
		{input: "0999", want: 999},
		{input: "9999", want: 9999},
		{input: "99999", want: 99999},
		{input: "-1", want: -1},
		{input: "-11", want: -11},
		{input: "-1111", want: -1111},
		{input: "  -11111  ", want: -11111},
	}

	for _, tc := range testCases {
		t.Run(tc.input, func(t *testing.T) {
			got, err := FromInt10(tc.input)
			if tc.fail {
				assert.Error(t, err)
			} else {
				assert.Equal(t, tc.want, got)
			}
		})
	}
}

func TestMustUint10(t *testing.T) {
	testCases := []struct {
		input string
		want  uint
	}{
		{input: " x "},
		{input: ""},
		{input: "  \t\t  "},
		{input: "0"},
		{input: "1", want: 1},
		{input: "\t\t1  ", want: 1},
		{input: "  1\t", want: 1},
		{input: "9", want: 9},
		{input: "10", want: 10},
		{input: "0000"},
		{input: "0001", want: 1},
		{input: "0010", want: 10},
		{input: "0100", want: 100},
		{input: "1000", want: 1000},
		{input: "10000", want: 10000},
		{input: "0009", want: 9},
		{input: "0099", want: 99},
		{input: "0999", want: 999},
		{input: "9999", want: 9999},
		{input: "99999", want: 99999},
		{input: "-1"},
		{input: "-11"},
		{input: "-1111"},
		{input: "  -11111  "},
	}

	for _, tc := range testCases {
		t.Run(tc.input, func(t *testing.T) {
			got := MustUint10(tc.input)
			assert.Equal(t, tc.want, got)
		})
	}
}

func TestFromUint10(t *testing.T) {
	testCases := []struct {
		input string
		want  uint
		fail  bool
	}{
		{input: " x ", fail: true},
		{input: "", fail: true},
		{input: "  \t\t  ", fail: true},
		{input: "0"},
		{input: "1", want: 1},
		{input: "\t\t1  ", want: 1},
		{input: "  1\t", want: 1},
		{input: "9", want: 9},
		{input: "10", want: 10},
		{input: "0000"},
		{input: "0001", want: 1},
		{input: "0010", want: 10},
		{input: "0100", want: 100},
		{input: "1000", want: 1000},
		{input: "10000", want: 10000},
		{input: "0009", want: 9},
		{input: "0099", want: 99},
		{input: "0999", want: 999},
		{input: "9999", want: 9999},
		{input: "99999", want: 99999},
		{input: "-1", fail: true},
		{input: "-11", fail: true},
		{input: "-1111", fail: true},
		{input: "  -11111  ", fail: true},
	}

	for _, tc := range testCases {
		t.Run(tc.input, func(t *testing.T) {
			got, err := FromUint10(tc.input)
			if tc.fail {
				assert.Error(t, err)
			} else {
				assert.Equal(t, tc.want, got)
			}
		})
	}
}
