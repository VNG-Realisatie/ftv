//go:build tools
// +build tools

package main

import (
	"os"

	_ "github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/fsc/plugin/opa/internal/config"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/fsc/plugin/opa/internal/server"
)

func main() {
	cfg, logger, err := config.New()
	if err != nil {
		if logger != nil {
			logger.Error("init failed", "error", err)
			os.Exit(1)
		}
		panic(err)
	}
	server.Serve(cfg, logger)
}
