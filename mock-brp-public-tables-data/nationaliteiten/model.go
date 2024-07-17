package nationaliteiten

import (
	"strings"
	"time"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/utilities/convert"
)

// Nationaliteit represents the data for a nationality as defined in table 32 of the BRP register.
type Nationaliteit struct {
	Code         uint       `json:"code,omitempty"`         // 05.11
	Omschrijving string     `json:"omschrijving,omitempty"` // 05.12
	DatumIngang  *time.Time `json:"datumIngang,omitempty"`  // 99.98
	DatumEinde   *time.Time `json:"datumEinde,omitempty"`   // 99.99
}

// NewFromCSV instantiates a new Nationaliteit, using the given data according to the given CSV headers.
func NewFromCSV(headers, data []string) *Nationaliteit {
	ld := len(data)
	var n Nationaliteit

	for i := range headers {
		if i < ld {
			h, d := headers[i], data[i]

			var fc string
			if len(h) >= 5 {
				fc = h[:5]
			}

			switch {
			case fc == "05.11":
				n.Code = convert.MustUint10(d)
			case fc == "05.12":
				n.Omschrijving = d
			case fc == "99.98":
				n.DatumIngang = convert.MustYYYYMMDD(d)
			case fc == "99.99":
				n.DatumEinde = convert.MustYYYYMMDD(d)

			default:
				lowerH := strings.ToLower(h)
				switch {
				case strings.Contains(lowerH, "code"):
					n.Code = convert.MustUint10(d)
				case strings.Contains(lowerH, "omschrijving"):
					n.Omschrijving = d
				case strings.Contains(lowerH, "datum"):
					switch {
					case strings.Contains(lowerH, "ingang"):
						n.DatumIngang = convert.MustYYYYMMDD(d)
					case strings.Contains(lowerH, "einde"):
						n.DatumEinde = convert.MustYYYYMMDD(d)
					}
				}
			}
		}
	}

	return &n
}

// CodeX returns Code as a 4-digit string, prepended with zeroes if needed.
func (n *Nationaliteit) CodeX() string {
	return convert.PrependZero10(n.Code, 4)
}

// DatumIngangX returns DatumIngang as an 8-digit string in the format 'yyyymmdd'.
//
// If DatumIngang is empty or zero, an empty string is returned.
func (n *Nationaliteit) DatumIngangX() string {
	return convert.ToYYYYMMDD(n.DatumIngang)
}

// DatumEindeX returns DatumEinde as an 8-digit string in the format 'yyyymmdd'.
//
// If DatumEinde is empty or zero, an empty string is returned.
func (n *Nationaliteit) DatumEindeX() string {
	return convert.ToYYYYMMDD(n.DatumEinde)
}
