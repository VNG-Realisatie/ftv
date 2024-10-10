package handlers

import (
	"log/slog"

	"github.com/gofiber/fiber/v2"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/oas/fsc/auth"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/fsc/plugin/opa/config"
)

// AuthHandler instantiates an authorization endpoint handler.
func AuthHandler(cfg *config.Config, log *slog.Logger) fiber.Handler {
	h := &authHandler{cfg: cfg, log: log}
	return h.run
}

func (h *authHandler) run(fc *fiber.Ctx) error {
	req := &auth.AuthorizationRequest{}
	if err := fc.BodyParser(req); err != nil {
		status := fiber.StatusBadRequest
		h.log.Error("bad request", "status", status, "error", err)
		return SendMessageResponse(fc, status, "invalid body")
	}

	var allowed = true
	var reason string

	// TODO: perform authorization using one or more policies

	resp := auth.AuthorizationResponse{Result: &auth.AuthorizationResponseData{Allowed: &allowed}}
	if !allowed {
		resp.Result.Status.Reason = &reason
	}
	return fc.JSON(&resp)
}

type authHandler struct {
	cfg *config.Config
	log *slog.Logger
}
