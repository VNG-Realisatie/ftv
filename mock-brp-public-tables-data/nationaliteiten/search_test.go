package nationaliteiten

import (
	"bytes"
	"regexp"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

var (
	data = `"05.11 Nationaliteitscode","05.12 Omschrijving","99.98 Datum ingang","99.99 Datum einde"
"0000","Onbekend","",""
"0001","Nederlandse","",""
"0002","Behandeld als Nederlander","20070401","20070401"
"0027","Slowaakse","19930101",""
"0028","Tsjechische","19930101",""
"0029","Burger van Bosnië-Herzegovina","19920406",""
"0030","Georgische","19911231",""
"0031","Turkmeense","19911231",""
"0032","Tadzjiekse","19911231",""
"0033","Oezbeekse","19911231",""
"0034","Oekraïense","19911231",""
"0035","Kirgizische","19911231",""
"0036","Moldavische","19911231",""
"0037","Kazachse","19911231",""
"0038","Belarussische","19911231",""
"0039","Azerbeidzjaanse","19911231",""
"0040","Armeense","19911231",""
"0041","Russische","19911231",""
"0042","Sloveense","19920115",""
"0043","Kroatische","19920115",""
"0044","Letse","19910828",""
"0045","Estische","19910828",""
"0046","Litouwse","19910828",""
"0047","Marshalleilandse","",""
"0048","Myanmarese","",""
"0049","Namibische","",""
"0050","Albanese","",""
"0051","Andorrese","",""
"0052","Belgische","",""
"0053","Bulgaarse","",""
"0054","Deense","",""
"0055","Burger van de Bondsrepubliek Duitsland","",""
"0056","Finse","",""
"0057","Franse","",""
"0058","Jemenitische","19900522",""
"0059","Griekse","",""
"0060","Brits burger","",""
"0061","Hongaarse","",""
"0062","Ierse","",""
"0063","IJslandse","",""
"0064","Italiaanse","",""
"0065","Joegoslavische","","20040201"
"0066","Liechtensteinse","",""
"0067","Luxemburgse","",""
"0068","Maltese","",""
"0069","Monegaskische","",""
"0070","Noorse","",""
"0071","Oostenrijkse","",""
"0072","Poolse","",""
"0073","Portugese","",""
"0074","Roemeense","",""
"0075","Burger van de Sovjet-Unie","","19911231"
"0076","San Marinese","",""
"0077","Spaanse","",""
"0078","Tsjecho-Slowaakse","","19930101"
"0079","Vaticaanse","",""
"0080","Zweedse","",""
"0081","Zwitserse","",""
"0082","Oost-Duitse","","19901003"
"0083","Brits onderdaan","",""
"0084","Eritrese","19930528",""
"0085","Brits overzees burger","",""
"0086","Macedonische","19930419","20190212"
"0087","Kosovaarse","20080615",""
"0088","Macedonische/Burger van Noord-Macedonië","20190212",""
"0100","Algerijnse","",""
"0101","Angolese","",""
"0104","Burundese","",""
`
	loader = LoadFromCSV(bytes.NewBufferString(data))
)

func TestCache_Search(t *testing.T) {
	var (
		d1 = time.Date(1991, 12, 1, 0, 0, 0, 0, time.UTC)
		d2 = time.Date(1991, 12, 31, 0, 0, 0, 0, time.UTC)
		d3 = time.Date(1990, 1, 1, 0, 0, 0, 0, time.UTC)
		d4 = time.Date(1993, 12, 31, 0, 0, 0, 0, time.UTC)
	)

	testCases := []struct {
		name      string
		opts      []SearchOpt
		wantCount int
	}{
		{
			name:      "code from",
			opts:      []SearchOpt{CodeFrom(100)},
			wantCount: 3,
		},
		{
			name:      "code to",
			opts:      []SearchOpt{CodeTo(30)},
			wantCount: 7,
		},
		{
			name:      "code range",
			opts:      []SearchOpt{CodeFrom(50), CodeTo(60)},
			wantCount: 11,
		},
		{
			name:      "omschrijving from",
			opts:      []SearchOpt{OmschrijvingFrom("San")},
			wantCount: 11,
		},
		{
			name:      "omschrijving from",
			opts:      []SearchOpt{OmschrijvingTo("Belg")},
			wantCount: 8,
		},
		{
			name:      "omschrijving rx (1)",
			opts:      []SearchOpt{OmschrijvingRX(regexp.MustCompile(`Nederlandse|Belgische`))},
			wantCount: 2,
		},
		{
			name:      "datum ingang range",
			opts:      []SearchOpt{DatumIngangFrom(d1), DatumIngangTo(d2)},
			wantCount: 12,
		},
		{
			name:      "datum einde range",
			opts:      []SearchOpt{DatumEindeFrom(d3), DatumEindeTo(d4)},
			wantCount: 3,
		},
	}

	c, err := New(loader)
	require.NoError(t, err)
	require.NotNil(t, c)

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			got := c.Search(tc.opts...)
			assert.Equal(t, tc.wantCount, len(got))
		})
	}
}
