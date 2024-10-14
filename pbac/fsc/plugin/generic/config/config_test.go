package config

import (
	"os"
	"testing"

	"gitlab.com/gjuyn/go-config/config-ext/yaml"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"gitlab.com/gjuyn/go-config/config"
)

var testCfg = `
svc:
  host: "127.0.0.1"
  port: 8080
  maxBody: 2048
log:
  format: "text"
  level: "warn"
  output: "STDOUT"
  source: true
`

func TestNew(t *testing.T) {
	t.Run("new config", func(t *testing.T) {
		dir := t.TempDir()
		file := dir + "/config.yaml"
		err := os.WriteFile(file, []byte(testCfg), 0644)
		require.NoError(t, err)

		c, l, err2 := New(config.NoFlags(), yaml.FilesYAML(file))
		require.NoError(t, err2)
		require.NotNil(t, l)
		require.NotNil(t, c)

		assert.Equal(t, "127.0.0.1", c.Host)
		assert.Equal(t, uint16(8080), c.Port)
		assert.Equal(t, 2048, c.MaxBody)
		assert.Equal(t, "text", c.LogFormat)
		assert.Equal(t, "warn", c.LogLevel)
		assert.Equal(t, "STDOUT", c.LogOutput)
		assert.True(t, c.LogSource)
	})
}
