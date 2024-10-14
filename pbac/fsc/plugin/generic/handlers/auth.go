package handlers

import (
	"errors"
	"fmt"
	"log/slog"
	"net/url"
	"strings"

	"github.com/gofiber/fiber/v2"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/oas/fsc/auth"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/fsc/plugin/opa/config"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/pbac"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/pbac/control"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/utilities/convert"
)

// AuthHandler instantiates an authorization endpoint handler.
func AuthHandler(cfg *config.Config, logger *slog.Logger) fiber.Handler {
	h := &authHandler{
		cfg:        cfg,
		logger:     logger,
		controller: control.New(cfg, logger),
	}
	return h.run
}

func (h *authHandler) run(fc *fiber.Ctx) error {
	authReq, err := h.verifyRequest(fc)
	if authReq == nil {
		return err
	}

	resp, err2 := h.controller.Authorize(h.newAccessRequest(authReq))
	if err2 != nil {
		status := fiber.StatusInternalServerError
		h.logger.Error("authorization process failed", "status", status, "error", err2)
		return SendMessageResponse(fc, status, "authorization process failed")
	}

	h.logger.Info("authorization processed", "allowed", resp.Allowed, "reason", resp.Message, "policy", resp.PolicyKey)

	out := auth.AuthorizationResponse{Result: &auth.AuthorizationResponseData{Allowed: &resp.Allowed}}
	if !resp.Allowed {
		out.Result.Status.Reason = &resp.Message
	}
	return fc.JSON(&out)
}

func (h *authHandler) verifyRequest(fc *fiber.Ctx) (*auth.AuthorizationRequest, error) {
	if h.controller == nil {
		status := fiber.StatusInternalServerError
		err := fmt.Errorf("unsupported policy language: %s", h.cfg.PolicyLanguage)
		h.logger.Error("unsupported policy language", "status", status, "error", err)
		return nil, SendMessageResponse(fc, status, "internal configuration error")
	}

	if len(fc.Request().Header.ContentType()) == 0 {
		fc.Request().Header.Set("Content-Type", "application/json")
	}

	authReq := &auth.AuthorizationRequest{}
	if err := fc.BodyParser(authReq); err != nil {
		status := fiber.StatusBadRequest
		h.logger.Error("bad request", "status", status, "error", err)
		return nil, SendMessageResponse(fc, status, "invalid input data")
	}

	if authReq.Input.Path == nil {
		status := fiber.StatusBadRequest
		err := errors.New("input.path must be filled")
		h.logger.Error("bad request", "status", status, "error", err)
		return nil, SendMessageResponse(fc, status, "invalid path")
	}

	return authReq, nil
}

func (h *authHandler) newAccessRequest(in *auth.AuthorizationRequest) *pbac.Request {
	s1, s2 := convert.OpaqueString(in.Input.Path), convert.OpaqueString(in.Input.Query)

	if !strings.HasPrefix(s1, "http") {
		s1 = fmt.Sprintf("https://%s", s1)
	}
	if s2 != "" {
		s1 = fmt.Sprintf("%s?%s", s1, s2)
	}

	u, _ := url.ParseRequestURI(s1)

	req := &pbac.Request{
		URL: u,
		// Body:       strings.NewReader(convert.OpaqueString(authReq.Input.Body)),
		Attributes: map[string]any{
			"Method": convert.OpaqueString(in.Input.Method),
		},
	}

	if in.Input.Headers != nil {
		req.Headers = *in.Input.Headers
	}
	if in.Input.OutwayCertificateChain != nil {
		req.Attributes["OutwayCertificateChain"] = *in.Input.OutwayCertificateChain
	}

	return req
}

type authHandler struct {
	cfg        *config.Config
	logger     *slog.Logger
	controller pbac.Controller
}
