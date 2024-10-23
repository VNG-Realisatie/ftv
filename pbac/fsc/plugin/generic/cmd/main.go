package main

import (
	"os"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/fsc/plugin/generic/config"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/fsc/plugin/generic/server"
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

	logger.Info("configuration loaded successfully", "config", cfg)
	server.Serve(cfg, logger)
}
