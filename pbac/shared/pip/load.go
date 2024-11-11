package pip

import (
	"io/fs"
	"os"
	"path/filepath"

	"gopkg.in/yaml.v3"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
)

func (p *pip) load() {
	if p.attrStore != "" {
		p.iterateFolders(p.attrStore, p.recurse, p.loadAttributes)
	}
	if p.entityStore != "" {
		p.iterateFolders(p.entityStore, p.recurse, p.loadEntities)
	}
}

func (p *pip) iterateFolders(path string, recurse bool, f func(path string)) {
	err := filepath.WalkDir(path, func(path2 string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if d.IsDir() {
			if recurse || path2 == path {
				return nil
			}
			return filepath.SkipDir
		}

		f(path2)
		return nil
	})

	if err != nil {
		p.logger.Error("pip: error iterating folders", "path", path, "err", err)
	}
}

func (p *pip) loadAttributes(path string) {
	f, err := os.Open(path)
	if err != nil {
		p.logger.Error("pip: error opening attributes file", "path", path, "err", err)
		return
	}

	defer f.Close()

	attributes := make([]struct {
		Key   string `yaml:"key"`
		Value any    `yaml:"value"`
	}, 0)

	if err = yaml.NewDecoder(f).Decode(&attributes); err != nil {
		p.logger.Error("pip: error decoding attributes file", "path", path, "err", err)
		return
	}

	for i := range attributes {
		a := attributes[i]
		p.AddAttribute(a.Key, a.Value)
	}
}

func (p *pip) loadEntities(path string) {
	f, err := os.Open(path)
	if err != nil {
		p.logger.Error("pip: error opening entities file", "path", path, "err", err)
		return
	}

	defer f.Close()

	entities := make([]struct {
		Type    string         `yaml:"type"`
		ID      string         `yaml:"id"`
		Attrs   map[string]any `yaml:"attributes,omitempty"`
		Parents []string       `yaml:"parents,omitempty"`
	}, 0)

	if err = yaml.NewDecoder(f).Decode(&entities); err != nil {
		p.logger.Error("pip: error decoding entities file", "path", path, "err", err)
		return
	}

	for i := range entities {
		e, attrs := entities[i], p.newAttributes()
		for j := range e.Attrs {
			attrs.AddAttribute(j, e.Attrs[j])
		}
		p.entities.AddEntity(types.NewEntity(e.Type, e.ID, attrs, e.Parents...))
	}
}
