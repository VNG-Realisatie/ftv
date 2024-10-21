package pap

import (
	"io/fs"
	"os"
	"path/filepath"
)

func (c *cache) load() {
	_ = filepath.WalkDir(c.path, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}

		if d.IsDir() {
			if c.recurse {
				return nil
			}
			return filepath.SkipDir
		}

		f, err2 := os.Open(path)
		if err2 != nil {
			return err2
		}

		defer f.Close()

		return c.Create(d.Name(), f)
	})
}
