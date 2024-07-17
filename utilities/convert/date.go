package convert

import "time"

// ToYYYYMMDD returns the given date as a string in format 'yyyymmdd'.
//
// If the given date is nil or zero, an empty string is returned.
func ToYYYYMMDD(date *time.Time) string {
	if date == nil || date.IsZero() {
		return ""
	}
	return date.Format("20060102")
}

// MustYYYYMMDD returns the given date as a time.Time from the given string with format 'yyyymmdd'.
//
// If the input string does not conform to the 'yyyymmdd' format, nil is returned.
// A valid date is always returned in the UTC timezone, with the time component set to 00:00:00.000000000.
func MustYYYYMMDD(input string) *time.Time {
	if t, err := time.ParseInLocation("20060102", input, time.UTC); err == nil {
		return &t
	}
	return nil
}
