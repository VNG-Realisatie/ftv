package convert

import (
	"errors"
	"fmt"
	"math"
	"strconv"
	"strings"
)

// PrependZero10 returns the input number as a decimal encoded string.
//
// If the length of n, expressed as a decimal number, is less than size,
// the output is prepended zith zeroes until it is of size length.
func PrependZero10(n, size uint) string {
	return fmt.Sprintf("%0*d", size, n)
}

// MustIntDecimal converts the input string to an integer using decimal decoding.
//
// Any white space in the input is discarded before parsing.
// If the string starts with one or more zeroes, they are discarded.
// If the string cannot be parsed to an integer, zero is returned.
func MustIntDecimal(input string) int {
	if i, err := FromIntDecimal(input); err == nil {
		return i
	}
	return 0
}

// FromIntDecimal converts the input string to an integer using decimal decoding.
//
// Any white space in the input is discarded before parsing.
// If the string starts with one or more zeroes, they are discarded.
// If the string cannot be parsed to an integer, the parser error is returned.
func FromIntDecimal(input string) (int, error) {
	i, err := strconv.ParseInt(strings.TrimSpace(input), 10, 64)
	if err != nil {
		return 0, err
	}
	return int(i), nil
}

// MustUintDecimal converts the input string to an unsigned integer using decimal decoding.
//
// Any white space in the input is discarded before parsing.
// If the string starts with one or more zeroes, they are discarded.
// If the string cannot be parsed to an unsigned integer, zero is returned.
func MustUintDecimal(input string) uint {
	if i, err := FromUintDecimal(input); err == nil {
		return i
	}
	return 0
}

// FromUintDecimal converts the input string to an unsigned integer using decimal decoding.
//
// Any white space in the input is discarded before parsing.
// If the string starts with one or more zeroes, they are discarded.
// If the string cannot be parsed to an unsigned integer, the parser error is returned.
func FromUintDecimal(input string) (uint, error) {
	i, err := strconv.ParseUint(strings.TrimSpace(input), 10, 64)
	if err != nil {
		return 0, err
	}
	return uint(i), nil
}

// MustUint8Decimal converts the input string to an 8-bit unsigned integer using decimal decoding.
//
// Any white space in the input is discarded before parsing.
// If the string starts with one or more zeroes, they are discarded.
// If the string cannot be parsed to an unsigned integer or does not fit in 8 bits, zero is returned.
func MustUint8Decimal(input string) uint8 {
	if i, err := FromUintDecimal(input); err == nil && i <= math.MaxUint8 {
		return uint8(i)
	}
	return 0
}

// FromUint8Decimal converts the input string to an 8-bit unsigned integer using decimal decoding.
//
// Any white space in the input is discarded before parsing.
// If the string starts with one or more zeroes, they are discarded.
// If the string cannot be parsed to an unsigned integer, the parser error is returned.
// If the numeric value does not fit in 8 bits, an error is returned.
func FromUint8Decimal(input string) (uint8, error) {
	i, err := strconv.ParseUint(strings.TrimSpace(input), 10, 64)
	if err != nil {
		return 0, err
	}
	if i > math.MaxUint8 {
		return 0, errors.New("value out of bounds")
	}
	return uint8(i), nil
}

// MustUint32Decimal converts the input string to a 32-bit unsigned integer using decimal decoding.
//
// Any white space in the input is discarded before parsing.
// If the string starts with one or more zeroes, they are discarded.
// If the string cannot be parsed to an unsigned integer or does not fit in 32 bits, zero is returned.
func MustUint32Decimal(input string) uint32 {
	if i, err := FromUintDecimal(input); err == nil && i <= math.MaxUint32 {
		return uint32(i)
	}
	return 0
}

// FromUint32Decimal converts the input string to a 32-bit unsigned integer using decimal decoding.
//
// Any white space in the input is discarded before parsing.
// If the string starts with one or more zeroes, they are discarded.
// If the string cannot be parsed to an unsigned integer, the parser error is returned.
// If the numeric value does not fit in 32 bits, an error is returned.
func FromUint32Decimal(input string) (uint32, error) {
	i, err := strconv.ParseUint(strings.TrimSpace(input), 10, 64)
	if err != nil {
		return 0, err
	}
	if i > math.MaxUint32 {
		return 0, errors.New("value out of bounds")
	}
	return uint32(i), nil
}
