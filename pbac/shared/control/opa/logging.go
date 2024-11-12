package opa

import (
	"context"
	"fmt"
	"log/slog"

	"github.com/open-policy-agent/opa/logging"
)

// Debug implements the OPA Logger interface.
func (l *wrappedLogger) Debug(msg string, a ...any) {
	l.logger.Debug(fmt.Sprintf(msg, a...), l.fields...)
}

// Info implements the OPA Logger interface.
func (l *wrappedLogger) Info(msg string, a ...any) {
	l.logger.Info(fmt.Sprintf(msg, a...), l.fields...)
}

// Warn implements the OPA Logger interface.
func (l *wrappedLogger) Warn(msg string, a ...any) {
	l.logger.Warn(fmt.Sprintf(msg, a...), l.fields...)
}

// Error implements the OPA Logger interface.
func (l *wrappedLogger) Error(msg string, a ...any) {
	l.logger.Error(fmt.Sprintf(msg, a...), l.fields...)
}

// WithFields implements the OPA Logger interface.
func (l *wrappedLogger) WithFields(fields map[string]any) logging.Logger {
	l2 := &wrappedLogger{logger: l.logger, fields: l.fields}
	for k := range fields {
		l2.fields = append(l2.fields, k, fields[k])
	}
	return l2
}

// GetLevel implements the OPA Logger interface.
func (l *wrappedLogger) GetLevel() logging.Level {
	ctx := context.Background()
	switch {
	case l.logger.Enabled(ctx, slog.LevelDebug):
		return logging.Debug
	case l.logger.Enabled(ctx, slog.LevelInfo):
		return logging.Info
	case l.logger.Enabled(ctx, slog.LevelWarn):
		return logging.Warn
	default:
		return logging.Error
	}
}

// SetLevel implements the OPA Logger interface.
func (l *wrappedLogger) SetLevel(logging.Level) {
	// NO-OP!
}

// wrappedLogger is a wrapper to redirect OPA log messages to a standard slog logger.
type wrappedLogger struct {
	logger *slog.Logger
	fields []any
}
