package handlers

import (
	"io"
	"net/http/httptest"
	"testing"

	"github.com/gofiber/fiber/v2"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"gitlab.com/gjuyn/go-config/config"

	cfg2 "gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/fsc/plugin/generic/config"
)

func TestHealth(t *testing.T) {
	t.Run("test health", func(t *testing.T) {
		cfg, _, err := cfg2.New(config.NoFlags())
		require.NoError(t, err)
		require.NotNil(t, cfg)

		srv := fiber.New()
		srv.Get("/health", Health)

		req := httptest.NewRequest("GET", "/health", nil)
		resp, err2 := srv.Test(req, 1)

		require.NoError(t, err2)
		require.NotNil(t, resp)
		defer resp.Body.Close()

		assert.Equal(t, fiber.StatusOK, resp.StatusCode)

		b, err3 := io.ReadAll(resp.Body)
		assert.NoError(t, err3)
		assert.EqualValues(t, responseBody[200], b)
	})
}
