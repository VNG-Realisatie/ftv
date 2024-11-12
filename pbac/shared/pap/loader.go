package pap

import (
	"io/fs"
	"os"
	"path/filepath"
)

// LoadFromStore loads all policies from the store.
func (c *pap) LoadFromStore(path string, recurse bool) {
	err := filepath.WalkDir(path, func(p string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if d.IsDir() {
			if recurse || p == path {
				return nil
			}
			return filepath.SkipDir
		}

		f, err2 := os.Open(p)
		if err2 != nil {
			return err2
		}

		defer f.Close()
		return c.Add(d.Name(), f)
	})

	if err != nil {
		c.logger.Error("pap: error loading policies", "path", path, "err", err)
	}
}
