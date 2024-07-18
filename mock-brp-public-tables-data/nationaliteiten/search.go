package nationaliteiten

import (
	"regexp"
	"time"
)

// Search implements the Selecter interface.
func (c *cache) Search(opts ...SearchOpt) []*Nationaliteit {
	s := search{c: c}
	for i := range opts {
		opts[i](&s)
	}
	return s.search()
}

// SearchOpt is the function signature for search options.
type SearchOpt func(s *search)

// CodeFrom sets the minimum code to search for.
func CodeFrom(from uint) SearchOpt {
	return func(s *search) {
		s.codeFrom = from
	}
}

// CodeTo sets the maximum code to search for.
func CodeTo(to uint) SearchOpt {
	return func(s *search) {
		s.codeTo = to
	}
}

// OmschrijvingRX sets the regular expresion to match with Omschrijving.
func OmschrijvingRX(rx *regexp.Regexp) SearchOpt {
	return func(s *search) {
		s.omschrijvingRX = rx
	}
}

// OmschrijvingFrom sets the minimum omschrijving to search for.
func OmschrijvingFrom(from string) SearchOpt {
	return func(s *search) {
		s.omschrijvingFrom = from
	}
}

// OmschrijvingTo sets the maximum omschrijving to search for.
func OmschrijvingTo(to string) SearchOpt {
	return func(s *search) {
		s.omschrijvingTo = to
	}
}

// DatumIngangFrom sets the minimum DatumIngang to search for.
//
// An entry with an empty DatumIngang will never match this.
func DatumIngangFrom(from time.Time) SearchOpt {
	return func(s *search) {
		s.datumIngangFrom = from
	}
}

// DatumIngangTo sets the maximum DatumIngang to search for.
//
// An entry with an empty DatumIngang will never match this.
func DatumIngangTo(to time.Time) SearchOpt {
	return func(s *search) {
		s.datumIngangTo = to
	}
}

// DatumEindeFrom sets the minimum DatumEinde to search for.
//
// An entry with an empty DatumEinde will never match this.
func DatumEindeFrom(from time.Time) SearchOpt {
	return func(s *search) {
		s.datumEindeFrom = from
	}
}

// DatumEindeTo sets the maximum DatumEinde to search for.
//
// An entry with an empty DatumEinde will never match this.
func DatumEindeTo(to time.Time) SearchOpt {
	return func(s *search) {
		s.datumEindeTo = to
	}
}

func (s *search) search() []*Nationaliteit {
	out := make([]*Nationaliteit, 0)

	s.c.mutex.RLock()
	defer s.c.mutex.RUnlock()

	for _, n := range s.c.byCode {
		if s.codeFrom > 0 && n.Code < s.codeFrom {
			continue
		}
		if s.codeTo > 0 && n.Code > s.codeTo {
			continue
		}

		if !s.datumIngangFrom.IsZero() && (n.DatumIngang == nil || n.DatumIngang.Before(s.datumIngangFrom)) {
			continue
		}
		if !s.datumIngangTo.IsZero() && (n.DatumIngang == nil || n.DatumIngang.After(s.datumIngangTo)) {
			continue
		}

		if !s.datumEindeFrom.IsZero() && (n.DatumEinde == nil || n.DatumEinde.Before(s.datumEindeFrom)) {
			continue
		}
		if !s.datumEindeTo.IsZero() && (n.DatumEinde == nil || n.DatumEinde.After(s.datumEindeTo)) {
			continue
		}

		if s.omschrijvingFrom != "" && n.Omschrijving < s.omschrijvingFrom {
			continue
		}
		if s.omschrijvingTo != "" && n.Omschrijving > s.omschrijvingTo {
			continue
		}
		if s.omschrijvingRX != nil && !s.omschrijvingRX.MatchString(n.Omschrijving) {
			continue
		}

		out = append(out, n)
	}

	return out
}

type search struct {
	c                *cache
	codeFrom         uint
	codeTo           uint
	omschrijvingRX   *regexp.Regexp
	omschrijvingFrom string
	omschrijvingTo   string
	datumIngangTo    time.Time
	datumIngangFrom  time.Time
	datumEindeTo     time.Time
	datumEindeFrom   time.Time
}
