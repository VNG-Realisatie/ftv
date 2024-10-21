package handlers

import (
	"errors"
	"fmt"
	"log/slog"
	"net/url"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/oas/fsc/auth"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/fsc/plugin/opa/config"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/control"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/control/cedar"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/control/cerbos"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/control/opa"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/pip"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/types"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/utilities/convert"
)

// AuthHandler instantiates an authorization endpoint handler.
func AuthHandler(cfg *config.Config, logger *slog.Logger) fiber.Handler {
	p := pip.New(cfg.PolicyStore, logger)

	var c control.Controller
	switch types.LanguageFromString(cfg.PolicyLanguage) {
	case types.REGO:
		c = opa.NewController(p, cfg.PolicyStore, cfg.PolicyStoreRecurse, logger)
	case types.CERBOS:
		c = cerbos.NewController(p, cfg.PolicyStore, cfg.PolicyStoreRecurse, logger)
	case types.CEDAR:
		c = cedar.NewController(p, cfg.PolicyStore, cfg.PolicyStoreRecurse, logger)
	}

	if c == nil {
		logger.Error("unsupported policy language", "language", cfg.PolicyLanguage)
		return nil
	}

	h := &authHandler{
		cfg:        cfg,
		logger:     logger,
		controller: c,
	}
	return h.run
}

func (h *authHandler) run(fc *fiber.Ctx) error {
	authReq, err := h.verifyRequest(fc)
	if authReq == nil {
		return err
	}

	req := h.newAccessRequest(authReq)
	resp, err2 := h.controller.Authorize(req)
	if err2 != nil {
		status := fiber.StatusInternalServerError
		h.logger.Error("authorization process failed", "status", status, "error", err2)
		return SendMessageResponse(fc, status, "authorization process failed")
	}

	h.logger.Info("authorization processed", "regquest-uid", req.UID, "method", authReq.Input.Method, "path", authReq.Input.Path, "allowed", resp.Allowed, "reason", resp.Message, "policy", resp.PolicyKey)

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

func (h *authHandler) newAccessRequest(in *auth.AuthorizationRequest) *types.Request {
	s1, s2 := convert.OpaqueString(in.Input.Path), convert.OpaqueString(in.Input.Query)

	if !strings.HasPrefix(s1, "http") {
		s1 = fmt.Sprintf("https://%s", s1)
	}
	if s2 != "" {
		s1 = fmt.Sprintf("%s?%s", s1, s2)
	}

	u, _ := url.ParseRequestURI(s1)

	req := &types.Request{
		UID: uuid.New(),
		URL: u,
		// Body:       strings.NewReader(convert.OpaqueString(authReq.Input.Body)),
		Attributes: map[string]any{
			"http-method":  convert.OpaqueString(in.Input.Method),
			"request-time": time.Now(),
		},
	}

	if in.Input.Headers != nil {
		req.Headers = *in.Input.Headers
	}
	if in.Input.OutwayCertificateChain != nil {
		req.Attributes["outway-certificate-chain"] = *in.Input.OutwayCertificateChain
	}

	return req
}

type authHandler struct {
	cfg        *config.Config
	logger     *slog.Logger
	controller control.Controller
}
