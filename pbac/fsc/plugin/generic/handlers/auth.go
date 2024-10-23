package handlers

import (
	"bytes"
	"encoding/base64"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"net/url"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/fsc/plugin/generic/config"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/utilities/convert"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/oas/fsc/auth"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/control"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/control/cedar"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/control/cerbos"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/control/opa"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/pip"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/types"
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

	h.logger.Info("authorization processed", "reguest-uid", req.UID, "method", authReq.Input.Method, "path", authReq.Input.Path, "allowed", resp.Allowed, "reason", resp.Message, "policy", resp.PolicyKey)

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

	if authReq.Input.Path == "" {
		status := fiber.StatusBadRequest
		err := errors.New("input.path must be filled")
		h.logger.Error("bad request", "status", status, "error", err)
		return nil, SendMessageResponse(fc, status, "invalid path")
	}

	return authReq, nil
}

func (h *authHandler) newAccessRequest(in *auth.AuthorizationRequest) *types.Request {
	s := in.Input.Path
	if !strings.HasPrefix(s, "http") {
		s = fmt.Sprintf("https://%s", s)
	}
	if in.Input.Query != "" {
		s = fmt.Sprintf("%s?%s", s, in.Input.Query)
	}

	u, _ := url.ParseRequestURI(s)

	var f io.Reader
	if b := convert.OpaqueString(in.Input.Body); b != "" {
		if d, err := base64.StdEncoding.DecodeString(b); err != nil {
			f = bytes.NewBuffer(d)
		}
	}

	return &types.Request{
		UID:     uuid.New(),
		URL:     u,
		Body:    f,
		Headers: in.Input.Headers,
		Attributes: map[string]any{
			"http-method":              in.Input.Method,
			"request-time":             time.Now().UTC(),
			"outway-certificate-chain": in.Input.OutwayCertificateChain,
		},
	}
}

type authHandler struct {
	cfg        *config.Config
	logger     *slog.Logger
	controller control.Controller
}
