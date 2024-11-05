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
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/standards"
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
	started := time.Now()
	out := auth.AuthorizationResponse{}
	status := fiber.StatusInternalServerError

	var authReq *auth.AuthorizationRequest
	var req *types.Request
	var resp *types.Response
	var err error

	if h.logger.Enabled(context.TODO(), slog.LevelInfo) {
		defer func() {
			args := make([]any, 0, 16)

			if authReq != nil {
				args = append(args, "method", authReq.Input.Method)
			}
			if req != nil {
				args = append(args, "request-uid", req.UID)
			}
			if resp != nil {
				args = append(args, "allowed", resp.Allowed, "policy", resp.PolicyKey)
			}

			var msg string
			if err != nil {
				msg = "authorization process failed"
				args = append(args, "status", status, "error", err)
			} else {
				msg = "authorization processed successfully"
			}

			args = append(args, "elapsed time", time.Since(started).String())
			h.logger.Info(msg, args...)
		}()
	}

	var msg string
	authReq, status, msg, err = h.verifyRequest(fc)
	if status != fiber.StatusOK {
		return SendMessageResponse(fc, status, msg)
	}

	req = h.newAccessRequest(authReq)
	resp, err = h.controller.Authorize(req)
	if err != nil {
		status = fiber.StatusInternalServerError
		return SendMessageResponse(fc, status, "authorization process failed")
	}

	out.Result = &auth.AuthorizationResponseData{Allowed: &resp.Allowed}
	if !resp.Allowed && resp.Message != "" {
		out.Result.Status = &struct {
			Reason *string `json:"reason,omitempty"`
		}{Reason: &resp.Message}
	}

	return fc.JSON(&out)
}

func (h *authHandler) verifyRequest(fc *fiber.Ctx) (*auth.AuthorizationRequest, int, string, error) {
	if h.controller == nil {
		return nil, fiber.StatusInternalServerError, "internal configuration error", fmt.Errorf("unsupported policy language: %s", h.cfg.PolicyLanguage)
	}

	if len(fc.Request().Header.ContentType()) == 0 {
		fc.Request().Header.SetContentType("application/json")
	}

	authReq := &auth.AuthorizationRequest{}
	if err := fc.BodyParser(authReq); err != nil {
		return nil, fiber.StatusBadRequest, "invalid input data", err
	}

	if authReq.Input.Method == "" {
		return nil, fiber.StatusBadRequest, "invalid method", errors.New("input.method must be filled")
	}
	if authReq.Input.Path == "" {
		return nil, fiber.StatusBadRequest, "invalid path", errors.New("input.path must be filled")
	}

	return authReq, fiber.StatusOK, "", nil
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
			standards.AttrOutwayCerts: in.Input.OutwayCertificateChain,
		},
	}
}

type authHandler struct {
	cfg        *config.Config
	logger     *slog.Logger
	controller control.Controller
}
