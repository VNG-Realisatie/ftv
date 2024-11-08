package pip

import (
	"testing"

	"github.com/stretchr/testify/require"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
)

func TestParseXML(t *testing.T) {
	testCases := []struct {
		name    string
		body    string
		wantErr bool
	}{
		{name: "empty", wantErr: true},
		{name: "data1", body: xmlData1},
		{name: "data2", body: xmlData2},
		{name: "data3", body: xmlData3},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			a := types.NewAttributeSet()
			require.NotNil(t, a)

			err := parseXML([]byte(tc.body), a)
			if tc.wantErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}

var xmlData1 = `<content>
    <p>this is content area</p>
    <animal>
        <p>This is a dog</p>
        <dog>
           <p>tommy</p>
        </dog>
    </animal>
    <birds>
        <p>this is a bird</p>
        <p>this is a bird</p>
    </birds>
    <animal>
        <p>another animal</p>
    </animal>
</content>`

var xmlData2 = `<data>
    <entry>
        <name>John Doe</name>
        <age>28</age>
    </entry>
    <entry>
        <name>Jane Doe</name>
        <age>29</age>
    </entry>
    <entry>
        <name>Bob Doe</name>
        <age>30</age>
    </entry>
    <entry>
        <name>Beth Doe</name>
        <age>31</age>
    </entry>
</data>`

var xmlData3 = `<page> 
   <title>Apollo 11</title> 
     <redirect title="Foo bar" /> 
     <revision> 
       <text xml:space="preserve"> 
       {{Infobox Space mission 
       |mission_name=&lt;!--See above--&gt; 
       |insignia=Apollo_11_insignia.png}}
       </text> 
     </revision> 
 </page>`

func TestParseJSON(t *testing.T) {
	testCases := []struct {
		name    string
		body    string
		wantErr bool
	}{
		{name: "empty"},
		{name: "bad json", body: `this is not [] json`, wantErr: true},
		{name: "array", body: `["hello", "world", 123, true, "well"]`, wantErr: true},
		{name: "object", body: `{"hello": "world", "int": 123, "bool": true}`},
	}

	for _, tc := range testCases {
		t.Run(tc.name, func(t *testing.T) {
			a := types.NewAttributeSet()
			require.NotNil(t, a)

			err := parseJSON([]byte(tc.body), a)
			if tc.wantErr {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
