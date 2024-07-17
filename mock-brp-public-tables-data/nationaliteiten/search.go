package nationaliteiten

import "time"

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

func (s *search) search() []*Nationaliteit {
	return nil
}

type search struct {
	c                *cache
	codeFrom         uint
	codeTo           uint
	omschrijvingFrom string
	omschrijvingTo   string
	omschrijvingPart string
	datumIngangTo    *time.Time
	datumIngangFrom  *time.Time
	datumEindeTo     *time.Time
	datumEindeFrom   *time.Time
}
