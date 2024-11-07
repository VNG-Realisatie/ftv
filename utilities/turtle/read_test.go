package turtle

import (
	"bytes"
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestLoadSimple(t *testing.T) {
	const data = `
@prefix foaf: <http://xmlns.com/foaf/0.1/> .

<profile.ttl#me> a           foaf:Person.
<profile.ttl#me> foaf:knows  <students.ttl#bob>.
<profile.ttl#me> foaf:knows  <students.ttl#charlie> .
<profile.ttl#me> foaf:knows  <students.ttl#david>.
<profile.ttl#me> foaf:name   "Alice".
`

	t.Run("load simple", func(t *testing.T) {
		r := bytes.NewBufferString(data)
		require.NotNil(t, r)

		g, err := Load(r, "text/turtle")
		require.NoError(t, err)
		require.NotNil(t, g)

		ch := g.IterTriples()
		require.NotNil(t, ch)

		for term := range ch {
			s := term.String()
			assert.NotEmpty(t, s)
		}
	})
}

func TestLoadSimpleError(t *testing.T) {
	const data = `not really RDF`

	t.Run("load simple error", func(t *testing.T) {
		r := bytes.NewBufferString(data)
		require.NotNil(t, r)

		g, err := Load(r, "text/turtle")
		require.Error(t, err)
		require.Nil(t, g)
	})
}

func TestLoadReal(t *testing.T) {
	t.Run("load file", func(t *testing.T) {
		r, err := os.Open("../../testdata/tooiont.ttl")
		require.NoError(t, err)
		require.NotNil(t, r)

		defer r.Close()

		g, err2 := Load(r, "text/turtle")
		require.NoError(t, err2)
		require.NotNil(t, g)

		ch := g.IterTriples()
		require.NotNil(t, ch)

		for term := range ch {
			s := term.String()
			assert.NotEmpty(t, s)
		}
	})
}

func TestLoadRealError(t *testing.T) {
	t.Run("load file error", func(t *testing.T) {
		r, err := os.Open("../../testdata/error.ttl")
		require.NoError(t, err)
		require.NotNil(t, r)

		defer r.Close()

		g, err2 := Load(r, "text/turtle")
		require.Error(t, err2)
		require.Nil(t, g)
	})
}

func TestLoadURI(t *testing.T) {
	const uri = `https://identifier.overheid.nl/tooi/def/ont.ttl`

	t.Run("load uri", func(t *testing.T) {
		g, err := LoadFromURI(uri, true)
		require.NoError(t, err)
		require.NotNil(t, g)

		ch := g.IterTriples()
		require.NotNil(t, ch)

		for term := range ch {
			s := term.String()
			assert.NotEmpty(t, s)
		}
	})
}

func TestLoadURIError(t *testing.T) {
	const uri = `https://identifier.overheid.nl/tooi/def/ont.txt`

	t.Run("load uri error", func(t *testing.T) {
		g, err := LoadFromURI(uri, true)
		require.Error(t, err)
		require.Nil(t, g)
	})
}
