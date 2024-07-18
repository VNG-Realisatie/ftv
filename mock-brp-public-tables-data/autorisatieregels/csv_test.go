package autorisatieregels

import (
	"bytes"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestLoadFromCSV(t *testing.T) {
	t.Run("LoadFromCSV", func(t *testing.T) {
		f := bytes.NewBufferString("")
		l := LoadFromCSV(f)
		require.NotNil(t, l)

		c := &cache{}
		err := l(c)
		require.NoError(t, err)
	})
}
