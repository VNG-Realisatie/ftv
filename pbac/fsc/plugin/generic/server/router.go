package server

import (
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/fsc/plugin/opa/handlers"
)

// initRoutes sets up the routing table for HTTP requests.
func (s *service) initRoutes() {
	auth := handlers.AuthHandler(s.cfg, s.logger)
	if auth == nil {
		panic("failed to initialize authorization handler")
	}

	// API v1.
	v1 := s.svc.Group("/v1")
	v1.Get("/health", handlers.Health)
	v1.Post("/auth", auth)
}
