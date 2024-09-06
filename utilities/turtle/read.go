package turtle

import (
	"fmt"
	"io"
	"net/http"
	"strings"

	"github.com/deiu/rdf2go"
)

// Load loads a turtle graph from the given input stream.
//
// Use mime to indicate the mimetype for the input stream.
// Only "text/turtle" & "application/ld+json" are currently supported.
func Load(r io.Reader, mime string) (*rdf2go.Graph, error) {
	g := rdf2go.NewGraph("")
	if err := g.Parse(r, mime); err != nil {
		return nil, err
	}
	return g, nil
}

// LoadFromURI loads a turtle graph from the given uri.
//
// If skipVerify is true, the host certificate will not be verified.
func LoadFromURI(uri string, skipVerify bool) (*rdf2go.Graph, error) {
	g := rdf2go.NewGraph(uri, skipVerify)
	if err := loadURI(g, uri); err != nil {
		return nil, err
	}
	return g, nil
}

func loadURI(g *rdf2go.Graph, uri string) error {
	q, err := http.NewRequest("GET", uri, nil)
	if err != nil {
		return err
	}

	q.Header.Set("Accept", "text/turtle;q=1,application/ld+json;q=0.5")

	r, err := client.Do(q)
	if err != nil {
		return err
	}

	if r != nil {
		defer r.Body.Close()
		if r.StatusCode == 200 {
			return g.Parse(r.Body, fixContentType(r.Header.Get("Content-Type")))
		}
	}

	return fmt.Errorf("Could not fetch graph from %s - HTTP %d", uri, r.StatusCode)
}

func fixContentType(in string) string {
	if ix := strings.Index(in, ";"); ix > 0 {
		return in[:ix]
	}
	return in
}

var (
	client = rdf2go.NewHttpClient(true)
)
