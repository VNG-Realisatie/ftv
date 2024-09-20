package handlers

import (
	"github.com/gofiber/fiber/v2"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/oas/fsc/auth"
)

// Auth is the endpoint for authorization requests.
func Auth(c *fiber.Ctx) error {
	var allowed = true
	var reason string

	// TODO: perform authorization using one or more policies

	resp := auth.AuthorizationResponse{Result: &auth.AuthorizationResponseData{Allowed: &allowed}}
	if !allowed {
		resp.Result.Status.Reason = &reason
	}
	return c.JSON(&resp)
}
