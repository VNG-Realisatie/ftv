// Package server handles the HTTP service component of the FSC Auth plugin.
package server

import (
	"errors"
	"log/slog"
	"os"
	"os/signal"
	"sync/atomic"
	"syscall"

	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/fsc/plugin/generic/config"
	"gitlab.com/digilab.overheid.nl/ecosystem/ftv/federatieve-toegangsverlening/pbac/fsc/plugin/generic/handlers"

	"github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
)

// Serve initializes and runs the HTTP service using fiber and fasthttp.
func Serve(cfg *config.Config, logger *slog.Logger) {
	svc := service{
		cfg:     cfg,
		logger:  logger,
		intChan: make(chan os.Signal),
	}
	signal.Notify(svc.intChan, syscall.SIGQUIT, syscall.SIGTERM, syscall.SIGINT)

	svc.svc = fiber.New(fiber.Config{
		CaseSensitive:         true,
		DisableDefaultDate:    true,
		DisableStartupMessage: true,
		BodyLimit:             svc.cfg.MaxBody,
		ReadTimeout:           svc.cfg.ReadTimeout,
		WriteTimeout:          svc.cfg.WriteTimeout,
		IdleTimeout:           svc.cfg.IdleTimeout,
		ErrorHandler:          svc.errorHandler,
		AppName:               config.AppName,
		JSONEncoder:           json.Marshal,
		JSONDecoder:           json.Unmarshal,
		RequestMethods:        []string{fiber.MethodGet, fiber.MethodHead, fiber.MethodPost, fiber.MethodOptions},
	})

	svc.initMiddleware()
	svc.initRoutes()
	svc.run()
}

type service struct {
	cfg      *config.Config
	logger   *slog.Logger
	svc      *fiber.App
	intChan  chan os.Signal
	shutdown atomic.Bool
}

// errorHandler is the default error handler for things gone awry in fiber.
// E.g. invalid paths, bad parameters, code panics, etc.
// The actual error gets logged while the error response body is based on the embedded status code.
// If the error does not embed a status code, InternalServerError will be used as the status.
func (s *service) errorHandler(req *fiber.Ctx, err error) error {
	status := fiber.StatusInternalServerError

	var e *fiber.Error
	if errors.As(err, &e) {
		status = e.Code
	}

	s.logger.Error("internal server error", "status", status, "error", err)
	return handlers.SendBasicResponse(req, status)
}
