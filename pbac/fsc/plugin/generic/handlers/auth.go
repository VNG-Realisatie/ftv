// Package handlers contains the HTTP request handlers for the FSC Auth plugin.
package handlers

import (
	"context"
	"encoding/base64"
	"errors"
	"fmt"
	"log/slog"
	"net/url"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/oas/fsc/auth"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/fsc/plugin/generic/config"
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
	c, err := newController(cfg, logger)
	if c == nil {
		logger.Error("configuration error", "error", err)
		return nil
	}

	h := &authHandler{cfg: cfg, logger: logger, controller: c}
	return h.run
}

func newController(cfg *config.Config, logger *slog.Logger) (control.Controller, error) {
	switch types.LanguageFromString(cfg.PolicyLanguage) {
	case types.REGO:
		p := pip.New(cfg.PipStore, cfg.PipStoreRecurse, logger, nil, nil)
		return opa.NewController(p, cfg.PolicyStore, cfg.PolicyStoreRecurse, logger), nil
	case types.CERBOS:
		p := pip.New(cfg.PipStore, cfg.PipStoreRecurse, logger, nil, nil)
		return cerbos.NewController(p, cfg.PolicyStore, cfg.PolicyStoreRecurse, logger), nil
	case types.CEDAR:
		p := pip.New(cfg.PipStore, cfg.PipStoreRecurse, logger, cedar.NewAttributeBuilder(logger), cedar.NewEntityBuilder(logger))
		return cedar.NewController(p, cfg.PolicyStore, cfg.PolicyStoreRecurse, logger), nil
	default:
		return nil, fmt.Errorf("unsupported policy language '%s'", cfg.PolicyLanguage)
	}
}

func (h *authHandler) run(fc *fiber.Ctx) error {
	if h.logger.Enabled(context.TODO(), slog.LevelDebug) {
		started := time.Now()
		defer func() {
			h.logger.Debug("authorization handler", "elapsed time", time.Since(started).String())
		}()
	}

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

	out := auth.AuthorizationResponse{Result: &auth.AuthorizationResponseData{Allowed: &resp.Allowed}}
	if !resp.Allowed && resp.Message != "" {
		out.Result.Status = &struct {
			Reason *string `json:"reason,omitempty"`
		}{Reason: &resp.Message}
	}

	h.logger.Info("authorization processed", "request-uid", req.UID, "method", authReq.Input.Method, "path", authReq.Input.Path, "allowed", resp.Allowed, "reason", resp.Message, "policy", resp.PolicyKey)
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
		fc.Request().Header.SetContentType("application/json")
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

	var d []byte
	if b := convert.OpaqueString(in.Input.Body); b != "" {
		d, _ = base64.StdEncoding.DecodeString(b)
	}

	return &types.Request{
		UID:         uuid.New(),
		URL:         u,
		Method:      in.Input.Method,
		RequestTime: time.Now().UTC(),
		Body:        d,
		Headers:     in.Input.Headers,
		Attributes: map[string]any{
			"outway-certificate-chain": in.Input.OutwayCertificateChain,
		},
	}
}

type authHandler struct {
	cfg        *config.Config
	logger     *slog.Logger
	controller control.Controller
}
