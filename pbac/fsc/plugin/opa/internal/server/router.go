package server

import (
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/fsc/plugin/opa/handlers"
)

// initRoutes sets up the routing table for HTTP requests.
func (s *service) initRoutes() {
	// API v1.
	v1 := s.svc.Group("/v1")
	v1.Get("/ping", handlers.Ping)
	v1.Post("/auth", handlers.Auth)
}
