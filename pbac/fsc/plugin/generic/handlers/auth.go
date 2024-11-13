// Package handlers contains the HTTP request handlers for the FSC Auth plugin.
package handlers

import (
	"encoding/base64"
	"errors"
	"fmt"
	"log/slog"
	"net/url"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/oas/fsc/auth"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/fsc/plugin/generic/config"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/control"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/control/cedar"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/control/cerbos"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/control/opa"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/pip"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/shared/types"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/utilities/convert"
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
	p := &authProcess{
		authHandler: *h,
		fc:          fc,
		status:      fiber.StatusInternalServerError,
		started:     time.Now(),
	}

	if p.logger.Enabled(nil, slog.LevelInfo) {
		defer p.log()
	}

	if p.controller == nil {
		p.msg, p.err = "internal configuration error", fmt.Errorf("unsupported policy language: %s", p.cfg.PolicyLanguage)
		return SendMessageResponse(fc, p.status, p.msg)
	}

	if p.verifyRequest(); p.status != fiber.StatusOK {
		return SendMessageResponse(fc, p.status, p.msg)
	}

	p.newAccessRequest()

	if p.resp, p.err = p.controller.Authorize(p.req); p.err != nil {
		p.msg = "authorization process failed"
		return SendMessageResponse(fc, p.status, p.msg)
	}

	p.out = &auth.AuthorizationResponse{Result: &auth.AuthorizationResponseData{Allowed: &p.resp.Allowed}}
	if !p.resp.Allowed && p.resp.Message != "" {
		p.out.Result.Status = &struct {
			Reason *string `json:"reason,omitempty"`
		}{Reason: &p.resp.Message}
	}

	return fc.JSON(p.out)
}

func (p *authProcess) verifyRequest() {
	p.status = fiber.StatusBadRequest

	if len(p.fc.Request().Header.ContentType()) == 0 {
		p.fc.Request().Header.SetContentType("application/json")
	}

	p.authReq = &auth.AuthorizationRequest{}
	if p.err = p.fc.BodyParser(p.authReq); p.err != nil {
		p.msg = "invalid input data"
		return
	}

	if p.authReq.Input.Method == "" {
		p.msg, p.err = "invalid method", errors.New("input.method must be filled")
		return
	}

	if p.authReq.Input.Path == "" {
		p.msg, p.err = "invalid path", errors.New("input.path must be filled")
		return
	}

	p.status = fiber.StatusOK
}

func (p *authProcess) newAccessRequest() {
	s := p.authReq.Input.Path
	if !strings.HasPrefix(s, "http") {
		s = fmt.Sprintf("https://%s", s)
	}
	if p.authReq.Input.Query != "" {
		s = fmt.Sprintf("%s?%s", s, p.authReq.Input.Query)
	}

	u, _ := url.ParseRequestURI(s)

	var d []byte
	if b := convert.OpaqueString(p.authReq.Input.Body); b != "" {
		d, _ = base64.StdEncoding.DecodeString(b)
	}

	uid, now := uuid.New(), time.Now().UTC()
	p.req = &types.Request{
		UID:         &uid,
		URL:         u,
		Method:      p.authReq.Input.Method,
		RequestTime: &now,
		Body:        d,
		Headers:     p.authReq.Input.Headers,
		Attributes:  make(map[string]any),
	}
}

func (p *authProcess) log() {
	args := make([]any, 0, 16)

	if p.authReq != nil {
		args = append(args, "method", p.authReq.Input.Method)
	}
	if p.req != nil {
		args = append(args, "request-uid", p.req.UID)
	}
	if p.resp != nil {
		args = append(args, "allowed", p.resp.Allowed, "policy", p.resp.PolicyKey)
	}

	var msg string
	if p.err != nil {
		msg = "authorization process failed"
		args = append(args, "status", p.status, "error", p.err)
	} else {
		msg = "authorization process successful"
	}

	args = append(args, "elapsed time", time.Since(p.started).String())
	p.logger.Info(msg, args...)
}

type authHandler struct {
	cfg        *config.Config
	logger     *slog.Logger
	controller control.Controller
}

type authProcess struct {
	status  int
	fc      *fiber.Ctx
	authReq *auth.AuthorizationRequest
	req     *types.Request
	resp    *types.Response
	out     *auth.AuthorizationResponse
	started time.Time
	err     error
	msg     string
	authHandler
}
