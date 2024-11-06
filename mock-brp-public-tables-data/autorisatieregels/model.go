package autorisatieregels

import (
	"fmt"
	"strings"
	"time"
	"unicode/utf8"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/utilities/compare"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/utilities/convert"
)

// AutorisatieRegel represents the data for an authorization rule as defined in table 35 of the BRP register.
//
// Fields are sorted by size to reduce memory consumption.
type AutorisatieRegel struct {
	Geheimhouding            uint8      `json:"geheimhouding,omitempty"`            // 95.12 Indicatie geheimhouding
	VerstrekkingsBeperking   uint8      `json:"verstrekkingsBeperking,omitempty"`   // 95.13 Verstrekkingsbeperking
	KindVerstrekken          uint8      `json:"kindVerstrekken,omitempty"`          // 95.14 Bijzondere betrekking kind verstrekken
	ConditioneleVerstrekking uint8      `json:"conditioneleVerstrekking,omitempty"` // 95.43 Conditionele verstrekking
	SelectieSoort            uint8      `json:"selectieSoort,omitempty"`            // 95.52 Selectiesoort
	BerichtAanduiding        uint8      `json:"berichtAanduiding,omitempty"`        // 95.53 Berichtaanduiding
	SelectiePeriode          uint8      `json:"selectiePeriode,omitempty"`          // 95.55 Selectieperiode
	PlaatsingsBevoegdheid    uint8      `json:"plaatsingsBevoegdheid,omitempty"`    // 95.62 Plaatsingsbevoegdheid persoonslijst
	AdresBevoegdheid         uint8      `json:"adresBevoegdheid,omitempty"`         // 95.66 Adresvraagbevoegdheid
	Versie                   uint32     `json:"versie,omitempty"`                   // versie
	Afnemer                  uint32     `json:"afnemer,omitempty"`                  // 95.10 Afnemersindicatie
	RubriekSpontaan          uint32     `json:"rubriekSpontaan,omitempty"`          // 95.40 Rubrieknummer spontaan
	SleutelRubriek           uint32     `json:"sleutelRubriek,omitempty"`           // 95.42 Sleutelrubriek
	RubriekSelectie          uint32     `json:"rubriekSelectie,omitempty"`          // 95.50 Rubrieknummer selectie
	RubriekAdhoc             uint32     `json:"rubriekAdhoc,omitempty"`             // 95.60 Rubrieknummer ad hoc
	VerstrekkingenAdhoc      uint32     `json:"verstrekkingenAdhoc,omitempty"`      // 95.63 Afnemersverstrekkingen ad hoc
	RubriekAdres             uint32     `json:"rubriekAdres,omitempty"`             // 95.70 Rubrieknummer adresgeoriënteerd
	MediumSpontaan           rune       `json:"mediumSpontaan,omitempty"`           // 95.44 Medium spontaan
	MediumSelectie           rune       `json:"mediumSelectie,omitempty"`           // 95.56 Medium selectie
	MediumAdhoc              rune       `json:"mediumAdhoc,omitempty"`              // 95.67 Medium ad hoc
	MediumAdres              rune       `json:"mediumAdres,omitempty"`              // 95.73 Medium adresgeoriënteerd
	EersteSelectie           *time.Time `json:"eersteSelectie,omitempty"`           // 95.54 Eerste selectiedatum
	DatumIngang              *time.Time `json:"datumIngang,omitempty"`              // 99.98 Datum ingang tabelregel
	DatumEinde               *time.Time `json:"datumEinde,omitempty"`               // 99.99 Datum beëindiging tabelregel
	AfnemerNaam              string     `json:"afnemerNaam,omitempty"`              // 95.20 Afnemernaam
	Aantekening              string     `json:"aantekening,omitempty"`              // 95.11 Aantekening
	VoorwaardeSpontaan       string     `json:"voorwaardeSpontaan,omitempty"`       // 95.41 Voorwaarderegel spontaan
	VoorwaardeSelectie       string     `json:"voorwaardeSelectie,omitempty"`       // 95.51 Voorwaarderegel selectie
	VoorwaardeAdhoc          string     `json:"voorwaardeAdhoc,omitempty"`          // 95.61 Voorwaarderegel ad hoc
	VoorwaardeAdres          string     `json:"voorwaardeAdres,omitempty"`          // 95.71 Voorwaarderegel adresgeoriënteerd
}

// NewFromCSV instantiates a new AutorisatieRegel, using the given data according to the given CSV headers.
//
// This function assumes that the input data is in conformance with the format and rules of BRP tabel 35.
// An exception to this is that the headers in the input data may also be supplied without their unique field code.
func NewFromCSV(headers, data []string) *AutorisatieRegel {
	ld := len(data)
	var a AutorisatieRegel

	for i := range headers {
		if i < ld {
			h, d := unescapeQuotes(headers[i]), unescapeQuotes(data[i])

			var fc string
			if len(h) >= 5 {
				fc = h[:5]
			}

			switch fc {
			case "95.10":
				a.Afnemer = convert.MustUint32Decimal(d)
			case "95.11":
				a.Aantekening = d
			case "95.12":
				a.Geheimhouding = convert.MustUint8Decimal(d)
			case "95.13":
				a.VerstrekkingsBeperking = convert.MustUint8Decimal(d)
			case "95.14":
				a.KindVerstrekken = convert.MustUint8Decimal(d)
			case "95.20":
				a.AfnemerNaam = d
			case "95.40":
				a.RubriekSpontaan = convert.MustUint32Decimal(d)
			case "95.41":
				a.VoorwaardeSpontaan = d
			case "95.42":
				a.SleutelRubriek = convert.MustUint32Decimal(d)
			case "95.43":
				a.ConditioneleVerstrekking = convert.MustUint8Decimal(d)
			case "95.44":
				a.MediumSpontaan, _ = utf8.DecodeRuneInString(d)
			case "95.50":
				a.RubriekSelectie = convert.MustUint32Decimal(d)
			case "95.51":
				a.VoorwaardeSelectie = d
			case "95.52":
				a.SelectieSoort = convert.MustUint8Decimal(d)
			case "95.53":
				a.BerichtAanduiding = convert.MustUint8Decimal(d)
			case "95.54":
				a.EersteSelectie = convert.MustYYYYMMDD(d)
			case "95.55":
				a.SelectiePeriode = convert.MustUint8Decimal(d)
			case "95.56":
				a.MediumSelectie, _ = utf8.DecodeRuneInString(d)
			case "95.60":
				a.RubriekAdhoc = convert.MustUint32Decimal(d)
			case "95.61":
				a.VoorwaardeAdhoc = d
			case "95.62":
				a.PlaatsingsBevoegdheid = convert.MustUint8Decimal(d)
			case "95.63":
				a.VerstrekkingenAdhoc = convert.MustUint32Decimal(d)
			case "95.66":
				a.AdresBevoegdheid = convert.MustUint8Decimal(d)
			case "95.67":
				a.MediumAdhoc, _ = utf8.DecodeRuneInString(d)
			case "95.70":
				a.RubriekAdres = convert.MustUint32Decimal(d)
			case "95.71":
				a.VoorwaardeAdres = d
			case "95.73":
				a.MediumAdres, _ = utf8.DecodeRuneInString(d)
			case "99.98":
				a.DatumIngang = convert.MustYYYYMMDD(d)
			case "99.99":
				a.DatumEinde = convert.MustYYYYMMDD(d)

			default:
				lowerH := strings.ToLower(h)
				switch {
				case strings.Contains(lowerH, "versie"):
					a.Versie = convert.MustUint32Decimal(d)

				case strings.Contains(lowerH, "afnemer"):
					switch {
					case strings.Contains(lowerH, "indicatie"):
						a.Afnemer = convert.MustUint32Decimal(d)
					case strings.Contains(lowerH, "naam"):
						a.AfnemerNaam = d
					}

				case strings.Contains(lowerH, "aantekening"):
					a.Aantekening = d
				case strings.Contains(lowerH, "geheimhouding"):
					a.Geheimhouding = convert.MustUint8Decimal(d)
				case strings.Contains(lowerH, "kind verstrekken"):
					a.KindVerstrekken = convert.MustUint8Decimal(d)
				case strings.Contains(lowerH, "selectiesoort"):
					a.SelectieSoort = convert.MustUint8Decimal(d)
				case strings.Contains(lowerH, "berichtaanduiding"):
					a.BerichtAanduiding = convert.MustUint8Decimal(d)
				case strings.Contains(lowerH, "selectieperiode"):
					a.SelectiePeriode = convert.MustUint8Decimal(d)

				case strings.Contains(lowerH, "datum"):
					switch {
					case strings.Contains(lowerH, "ingang"):
						a.DatumIngang = convert.MustYYYYMMDD(d)
					case strings.Contains(lowerH, "beëindiging"):
						a.DatumEinde = convert.MustYYYYMMDD(d)
					case strings.Contains(lowerH, "selectie"):
						a.EersteSelectie = convert.MustYYYYMMDD(d)
					}

				case strings.Contains(lowerH, "verstrekking"):
					switch {
					case strings.Contains(lowerH, "beperking"):
						a.VerstrekkingsBeperking = convert.MustUint8Decimal(d)
					case strings.Contains(lowerH, "conditionele"):
						a.ConditioneleVerstrekking = convert.MustUint8Decimal(d)
					}

				case strings.Contains(lowerH, "rubrieknummer"):
					switch {
					case strings.Contains(lowerH, "selectie"):
						a.RubriekSelectie = convert.MustUint32Decimal(d)
					case strings.Contains(lowerH, "spontaan"):
						a.RubriekSpontaan = convert.MustUint32Decimal(d)
					case strings.Contains(lowerH, "ad hoc"):
						a.RubriekAdhoc = convert.MustUint32Decimal(d)
					case strings.Contains(lowerH, "adres"):
						a.RubriekAdres = convert.MustUint32Decimal(d)
					}

				case strings.Contains(lowerH, "voorwaarderegel"):
					switch {
					case strings.Contains(lowerH, "spontaan"):
						a.VoorwaardeSpontaan = d
					case strings.Contains(lowerH, "selectie"):
						a.VoorwaardeSelectie = d
					case strings.Contains(lowerH, "ad hoc"):
						a.VoorwaardeAdhoc = d
					case strings.Contains(lowerH, "adres"):
						a.VoorwaardeAdres = d
					}

				case strings.Contains(lowerH, "medium"):
					switch {
					case strings.Contains(lowerH, "spontaan"):
						a.MediumSpontaan, _ = utf8.DecodeRuneInString(d)
					case strings.Contains(lowerH, "selectie"):
						a.MediumSelectie, _ = utf8.DecodeRuneInString(d)
					case strings.Contains(lowerH, "ad hoc"):
						a.MediumAdhoc, _ = utf8.DecodeRuneInString(d)
					case strings.Contains(lowerH, "adres"):
						a.MediumAdres, _ = utf8.DecodeRuneInString(d)
					}

				case strings.Contains(lowerH, "bevoegdheid"):
					switch {
					case strings.Contains(lowerH, "plaatsing"):
						a.PlaatsingsBevoegdheid = convert.MustUint8Decimal(d)
					case strings.Contains(lowerH, "adres"):
						a.AdresBevoegdheid = convert.MustUint8Decimal(d)
					}
				}
			}
		}
	}

	return &a
}

// AfnemerX returns Afnemer as a 6-digit string, prepended with zeroes if needed.
func (a *AutorisatieRegel) AfnemerX() string {
	return convert.PrependZero10(uint(a.Afnemer), 6)
}

// RubriekSpontaanX returns RubriekSpontaan as a 6-digit string, prepended with zeroes if needed.
func (a *AutorisatieRegel) RubriekSpontaanX() string {
	return convert.PrependZero10(uint(a.RubriekSpontaan), 6)
}

// SleutelRubriekX returns SleutelRubriek as a 6-digit string, prepended with zeroes if needed.
func (a *AutorisatieRegel) SleutelRubriekX() string {
	return convert.PrependZero10(uint(a.SleutelRubriek), 6)
}

// RubriekSelectieX returns RubriekSelectie as a 6-digit string, prepended with zeroes if needed.
func (a *AutorisatieRegel) RubriekSelectieX() string {
	return convert.PrependZero10(uint(a.RubriekSelectie), 6)
}

// EersteSelectieX returns EersteSelectie as an 8-digit string in the format 'yyyymmdd'.
//
// If EersteSelectie is empty or zero, an empty string is returned.
func (a *AutorisatieRegel) EersteSelectieX() string {
	return convert.ToYYYYMMDD(a.EersteSelectie)
}

// SelectiePeriodeX returns SelectiePeriode as a 2-digit string, prepended with zeroes if needed.
func (a *AutorisatieRegel) SelectiePeriodeX() string {
	return convert.PrependZero10(uint(a.SelectiePeriode), 2)
}

// RubriekAdhocX returns RubriekAdhoc as a 6-digit string, prepended with zeroes if needed.
func (a *AutorisatieRegel) RubriekAdhocX() string {
	return convert.PrependZero10(uint(a.RubriekAdhoc), 6)
}

// VerstrekkingenAdhocX returns VerstrekkingenAdhoc as a 6-digit string, prepended with zeroes if needed.
func (a *AutorisatieRegel) VerstrekkingenAdhocX() string {
	return convert.PrependZero10(uint(a.VerstrekkingenAdhoc), 6)
}

// RubriekAdresX returns RubriekAdres as a 6-digit string, prepended with zeroes if needed.
func (a *AutorisatieRegel) RubriekAdresX() string {
	return convert.PrependZero10(uint(a.RubriekAdres), 6)
}

// DatumIngangX returns DatumIngang as an 8-digit string in the format 'yyyymmdd'.
//
// If DatumIngang is empty or zero, an empty string is returned.
func (a *AutorisatieRegel) DatumIngangX() string {
	return convert.ToYYYYMMDD(a.DatumIngang)
}

// DatumEindeX returns DatumEinde as an 8-digit string in the format 'yyyymmdd'.
//
// If DatumEinde is empty or zero, an empty string is returned.
func (a *AutorisatieRegel) DatumEindeX() string {
	return convert.ToYYYYMMDD(a.DatumEinde)
}

// IsValid returns true if the AutorisatieRegel is valid; e.g. the DatumEinde is nil or in the future.
func (a *AutorisatieRegel) IsValid() bool {
	return a.DatumEinde == nil || !a.DatumEinde.Before(time.Now())
}

// IsSupersededBy returns true if this AutorisatieRegel is superseded by the other AutorisatieRegel.
//
// The AutorisatieRegel is superseded only if,
// the other AutorisatieRegel is valid (e.g. not ended compared to the current date),
// and,
// the AutorisatieRegel is not valid or the other AutorisatieRegel has a more recent IngangsDatum.
func (a *AutorisatieRegel) IsSupersededBy(other *AutorisatieRegel) bool {
	switch {
	case !other.IsValid():
		return false
	case a.DatumIngang == nil || !a.IsValid():
		return true
	default:
		return other.DatumIngang.After(*a.DatumIngang)
	}
}

// IsEqual returns true if this AutorisatieRegel contains the exact same values as the other AutorisatieRegel.
func (a *AutorisatieRegel) IsEqual(other *AutorisatieRegel) bool {
	return a.Geheimhouding == other.Geheimhouding &&
		a.VerstrekkingsBeperking == other.VerstrekkingsBeperking &&
		a.KindVerstrekken == other.KindVerstrekken &&
		a.ConditioneleVerstrekking == other.ConditioneleVerstrekking &&
		a.SelectieSoort == other.SelectieSoort &&
		a.BerichtAanduiding == other.BerichtAanduiding &&
		a.SelectiePeriode == other.SelectiePeriode &&
		a.PlaatsingsBevoegdheid == other.PlaatsingsBevoegdheid &&
		a.AdresBevoegdheid == other.AdresBevoegdheid &&
		a.Versie == other.Versie &&
		a.Afnemer == other.Afnemer &&
		a.RubriekSpontaan == other.RubriekSpontaan &&
		a.SleutelRubriek == other.SleutelRubriek &&
		a.RubriekSelectie == other.RubriekSelectie &&
		a.RubriekAdhoc == other.RubriekAdhoc &&
		a.VerstrekkingenAdhoc == other.VerstrekkingenAdhoc &&
		a.RubriekAdres == other.RubriekAdres &&
		a.MediumSpontaan == other.MediumSpontaan &&
		a.MediumSelectie == other.MediumSelectie &&
		a.MediumAdhoc == other.MediumAdhoc &&
		a.MediumAdres == other.MediumAdres &&
		compare.TimePtrsEqual(a.EersteSelectie, other.EersteSelectie) &&
		compare.TimePtrsEqual(a.DatumIngang, other.DatumIngang) &&
		compare.TimePtrsEqual(a.DatumEinde, other.DatumEinde) &&
		a.AfnemerNaam == other.AfnemerNaam &&
		a.Aantekening == other.Aantekening &&
		a.VoorwaardeSpontaan == other.VoorwaardeSpontaan &&
		a.VoorwaardeSelectie == other.VoorwaardeSelectie &&
		a.VoorwaardeAdhoc == other.VoorwaardeAdhoc &&
		a.VoorwaardeAdres == other.VoorwaardeAdres
}

func afnemerKey(afnemer, versie uint32) uint64 {
	return uint64(afnemer)<<32 + uint64(versie)
}

func naamKey(afnemer uint32, naam string, versie uint32) string {
	return fmt.Sprintf("%s:%d:%d", strings.ToLower(naam), afnemer, versie)
}

func unescapeQuotes(in string) string {
	out, done := strings.CutPrefix(in, "\"")
	if done {
		out, _ = strings.CutSuffix(out, "\"")
	}
	return out
}
