package main

import (
	"fmt"
	"os"
	"regexp"
	"slices"
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

	sort := make([]string, 0, 128)
	report := make(map[string]string, 128)

	list := c.Search(autorisatieregels.IsValid(true))
	for _, item := range list {
		if item.VoorwaardeSpontaan != "" {
			k, v := makeKeyValue(item, "spontaan", item.VoorwaardeSpontaan)
			sort = append(sort, k)
			report[k] = v
		}
		if item.VoorwaardeSelectie != "" {
			k, v := makeKeyValue(item, "selectie", item.VoorwaardeSelectie)
			sort = append(sort, k)
			report[k] = v
		}
		if item.VoorwaardeAdhoc != "" {
			k, v := makeKeyValue(item, "ad hoc", item.VoorwaardeAdhoc)
			sort = append(sort, k)
			report[k] = v
		}
		if item.VoorwaardeAdres != "" {
			k, v := makeKeyValue(item, "adres", item.VoorwaardeAdres)
			sort = append(sort, k)
			report[k] = v
		}
	}

	slices.Sort(sort)

	for ix := range sort {
		k := sort[ix]
		v := report[k]
		fmt.Printf("## %s\n%s\n\n", k, v)
	}
}

func makeKeyValue(item *autorisatieregels.AutorisatieRegel, kind, condition string) (string, string) {
	condition = convertCondition(condition)
	return fmt.Sprintf("%s - versie %d - %s", item.AfnemerNaam, item.Versie, kind), condition
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
