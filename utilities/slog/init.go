package slog

import (
	"io"
	"log/slog"
	"os"
	"strings"
)

// Init instantiates a new logger with the given parameters.
func Init(output, format, level string, source bool) (*slog.Logger, error) {
	f, err := initSink(output)
	if err != nil {
		return nil, err
	}

	lvl := initLevel(level)
	opts := slog.HandlerOptions{
		AddSource: source,
		Level:     lvl,
	}

	var h slog.Handler
	switch strings.ToLower(format) {
	case "text":
		h = slog.NewTextHandler(f, &opts)
	default:
		h = slog.NewJSONHandler(f, &opts)
	}

	return slog.New(h), nil
}

func initSink(output string) (io.Writer, error) {
	var f io.Writer
	var err error

	switch strings.ToLower(output) {
	case "", "stdout":
		f = os.Stdout
	case "stderr":
		f = os.Stderr
	default:
		f, err = os.OpenFile(output, os.O_APPEND+os.O_WRONLY, 0644)
	}

	return f, err
}

func initLevel(level string) slog.Level {
	switch strings.ToLower(level) {
	case "debug":
		return slog.LevelDebug
	case "warn", "warning":
		return slog.LevelWarn
	case "err", "error":
		return slog.LevelError
	default:
		return slog.LevelInfo
	}
}
