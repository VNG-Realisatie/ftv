package convert

import (
	"fmt"
	"strconv"
	"strings"
)

// PrependZero10 returns the input number as a decimal encoded string.
//
// If if the length of n, expressed as a decimal number, is less than size,
// the output is prepended zith zeroes until it is of size length.
func PrependZero10(n, size uint) string {
	return fmt.Sprintf("%0*d", size, n)
}

// MustInt10 converts the input string to an integer using decimal decoding.
//
// Any white space in the input is discarded before parsing.
// If the string starts with one or more zeroes, they are discarded.
// If the string cannot be parsed to an integer, zero is returned.
func MustInt10(input string) int {
	if i, err := FromInt10(input); err == nil {
		return i
	}
	return 0
}

// FromInt10 converts the input string to an integer using decimal decoding.
//
// Any white space in the input is discarded before parsing.
// If the string starts with one or more zeroes, they are discarded.
// If the string cannot be parsed to an integer, the parser error is returned.
func FromInt10(input string) (int, error) {
	i, err := strconv.ParseInt(strings.TrimSpace(input), 10, 64)
	if err != nil {
		return 0, err
	}
	return int(i), nil
}

// MustUint10 converts the input string to an unsigned integer using decimal decoding.
//
// Any white space in the input is discarded before parsing.
// If the string starts with one or more zeroes, they are discarded.
// If the string cannot be parsed to an unsigned integer, zero is returned.
func MustUint10(input string) uint {
	if i, err := FromUint10(input); err == nil {
		return i
	}
	return 0
}

// FromUint10 converts the input string to an unsigned integer using decimal decoding.
//
// Any white space in the input is discarded before parsing.
// If the string starts with one or more zeroes, they are discarded.
// If the string cannot be parsed to an unsigned integer, the parser error is returned.
func FromUint10(input string) (uint, error) {
	i, err := strconv.ParseUint(strings.TrimSpace(input), 10, 64)
	if err != nil {
		return 0, err
	}
	return uint(i), nil
}
