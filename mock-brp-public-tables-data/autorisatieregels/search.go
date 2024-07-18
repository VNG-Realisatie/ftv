package autorisatieregels

import (
	"regexp"
	"time"
)

// Search implements the Selecter interface.
func (c *cache) Search(opts ...SearchOpt) []*AutorisatieRegel {
	s := search{c: c}
	for i := range opts {
		opts[i](&s)
	}
	return s.search()
}

// SearchOpt is the function signature for search options.
type SearchOpt func(s *search)

// Afnemer sets the exact Afnemer to search for.
func Afnemer(afnemer uint32) SearchOpt {
	return func(s *search) {
		s.afnemerFrom = afnemer
		s.afnemerTo = afnemer
	}
}

// AfnemerFrom sets the minimum Afnemer to search for.
func AfnemerFrom(from uint32) SearchOpt {
	return func(s *search) {
		s.afnemerFrom = from
	}
}

// AfnemerTo sets the maximum Afnemer to search for.
func AfnemerTo(to uint32) SearchOpt {
	return func(s *search) {
		s.afnemerTo = to
	}
}

// NaamRX sets the regular expresion to match with AfnemerNaam.
func NaamRX(rx *regexp.Regexp) SearchOpt {
	return func(s *search) {
		s.naamRX = rx
	}
}

// NaamFrom sets the minimum AfnemerNaam to search for.
func NaamFrom(from string) SearchOpt {
	return func(s *search) {
		s.naamFrom = from
	}
}

// NaamTo sets the maximum AfnemerNaam to search for.
func NaamTo(to string) SearchOpt {
	return func(s *search) {
		s.naamTo = to
	}
}

// IsValid limits the search to valid (true) or not valid (false) AutorisatieRegels.
//
// An AutorisatieRegel is valid if the DatumIngang is nil or not after the current date,
// and the DatumEinde is nil or not before the current date.
func IsValid(valid bool) SearchOpt {
	return func(s *search) {
		if valid {
			s.valid = 1
		} else {
			s.valid = 2
		}
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

func (s *search) search() []*AutorisatieRegel {
	out := make([]*AutorisatieRegel, 0)

	s.c.mutex.RLock()
	defer s.c.mutex.RUnlock()

	for _, n := range s.c.byAfnemer {
		if s.afnemerFrom > 0 && n.Afnemer < s.afnemerFrom {
			continue
		}
		if s.afnemerTo > 0 && n.Afnemer > s.afnemerTo {
			continue
		}

		if (s.valid == 1 && !n.IsValid()) || (s.valid == 2 && n.IsValid()) {
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

		if s.naamFrom != "" && n.AfnemerNaam < s.naamFrom {
			continue
		}
		if s.naamTo != "" && n.AfnemerNaam > s.naamTo {
			continue
		}
		if s.naamRX != nil && !s.naamRX.MatchString(n.AfnemerNaam) {
			continue
		}

		out = append(out, n)
	}

	return out
}

type search struct {
	valid           uint8
	afnemerFrom     uint32
	afnemerTo       uint32
	c               *cache
	naamRX          *regexp.Regexp
	naamFrom        string
	naamTo          string
	datumIngangTo   time.Time
	datumIngangFrom time.Time
	datumEindeTo    time.Time
	datumEindeFrom  time.Time
}
