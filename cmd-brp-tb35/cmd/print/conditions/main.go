package main

import (
	"fmt"
	"os"
	"regexp"
	"sort"
	"strings"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/cmd-brp-tb35/internal/maps"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/mock-brp-public-tables-data/autorisatieregels"
)

func main() {
	path := "./test-data/Tabel35_Autorisatietabel.csv"
	f, err := os.Open(path)
	if err != nil {
		panic(err)
	}
	defer f.Close()

	c, err2 := autorisatieregels.New(autorisatieregels.LoadFromCSV(f))
	if err2 != nil {
		panic(err2)
	}

	keys := make([]string, 0, 128)
	report := make(map[string]reportLine, 128)

	list := c.Search(autorisatieregels.IsValid(true))
	for _, item := range list {
		if item.VoorwaardeSpontaan != "" {
			l := makeReportLine(item.AfnemerNaam, "spontaan", convertCondition(item.VoorwaardeSpontaan))
			keys = append(keys, l.key())
			report[l.key()] = l
		}
		if item.VoorwaardeSelectie != "" {
			l := makeReportLine(item.AfnemerNaam, "selectie", convertCondition(item.VoorwaardeSelectie))
			keys = append(keys, l.key())
			report[l.key()] = l
		}
		if item.VoorwaardeAdhoc != "" {
			l := makeReportLine(item.AfnemerNaam, "adhoc", convertCondition(item.VoorwaardeAdhoc))
			keys = append(keys, l.key())
			report[l.key()] = l
		}
		if item.VoorwaardeAdres != "" {
			l := makeReportLine(item.AfnemerNaam, "adres", convertCondition(item.VoorwaardeAdres))
			keys = append(keys, l.key())
			report[l.key()] = l
		}
	}

	sort.Slice(keys, func(i, j int) bool {
		return strings.ToLower(keys[i]) < strings.ToLower(keys[j])
	})

	var last reportLine

	for ix := range keys {
		k := keys[ix]
		l := report[k]

		switch {
		case l.orgPrefix != last.orgPrefix:
			fmt.Printf("## %s\n### %s\n#### %s\n%s\n", l.orgPrefix, l.org(), l.kind, l.condition)
		case l.orgSuffix != last.orgSuffix:
			fmt.Printf("### %s\n#### %s\n%s\n", l.org(), l.kind, l.condition)
		default:
			fmt.Printf("#### %s\n%s\n", l.kind, l.condition)
		}

		last = l
	}
}

type reportLine struct {
	orgPrefix string
	orgSuffix string
	kind      string
	condition string
}

func (r reportLine) key() string {
	return fmt.Sprintf("%s %s %s", r.orgPrefix, r.orgSuffix, r.kind)
}

func (r reportLine) org() string {
	if strings.Contains(r.orgSuffix, r.orgPrefix) {
		return r.orgSuffix
	}
	return fmt.Sprintf("%s %s", r.orgPrefix, r.orgSuffix)
}

func fixPrefix(in string) string {
	if prefix, ok := prefixes[in]; ok {
		return prefix
	}
	return in
}

var prefixes = map[string]string{
	"St.":                 "Stichting",
	"Radboud":             "Universiteit",
	"Erasmus":             "Universiteit",
	"Noordelijk":          "Belastingkantoor",
	"Min.":                "Ministerie",
	"Pensioenuitvoerders": "Pensioenuitvoerder",
	"RDOG":                "GGD",
}

func makeReportLine(org, kind, condition string) reportLine {
	r := reportLine{kind: kind, condition: condition}
	ix := strings.Index(org, " ")
	iy := strings.Index(org, "/")

	switch {
	case strings.HasPrefix(org, "MvEL&I"):
		r.orgPrefix = "Ministerie"
		r.orgSuffix = "van EL&I"
	case strings.HasPrefix(org, "MvI&M"):
		r.orgPrefix = "Ministerie"
		r.orgSuffix = "van I&M"
	case strings.HasPrefix(org, "MvVWS"):
		r.orgPrefix = "Ministerie"
		r.orgSuffix = "van VWS"
	case strings.HasPrefix(org, "CBS"):
		r.orgPrefix = "CBS"
		r.orgSuffix = org
	case strings.HasPrefix(org, "Wageningen"):
		r.orgPrefix = "Universiteit"
		r.orgSuffix = org
	case ix > 0:
		r.orgPrefix = fixPrefix(org[:ix])
		r.orgSuffix = org
	case iy > 0:
		r.orgPrefix = fixPrefix(org[:iy])
		r.orgSuffix = org
	default:
		r.orgPrefix = org
	}

	return r
}

func convertCondition(in string) string {
	list := rx1.FindAllString(in, -1)

	for ix := range list {
		item := list[ix]
		op, opOK := maps.OperatorByCode[item]

		switch {
		case rx2.MatchString(item):
			list[ix] = convertElement(item)
		case opOK:
			list[ix] = op
		default:
		}
	}

	return strings.Join(list, " ")
}

func convertElement(in string) string {
	switch in {
	case "19.89.20":
		return "SELECTION-DATE"
	case "19.89.30":
		return "TODAY"
	}

	category, ok1 := maps.CategoryByCode[in[:2]]
	element, ok2 := maps.ElementByCode[in[3:]]
	if ok1 && ok2 {
		return fmt.Sprintf("'%s %s:%s'", in, category, element)
	}

	return fmt.Sprintf("'%s'", in)
}

var (
	rx1 = regexp.MustCompile(`\(|\)|"[^"]*"|[^ ()]+`)
	rx2 = regexp.MustCompile(`[0-9]{2}\.[0-9]{2}\.[0-9]{2}`)
)
