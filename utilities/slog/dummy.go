package slog

import (
	"context"
	"log/slog"
	"sync"
	"time"
)

// DummyHandler represents a dummy log handler for use with the standard slog library.
//
// Log records are stored in memory.
// Be sure to clear the log occasionally if you intend to use it for a long time,
// or you may run out of memory at some point.
//
// DummyHandler is safe to use with concurrent go routines.
type DummyHandler struct {
	level   slog.Level
	group   string
	attrs   []slog.Attr
	records []slog.Record
	mutex   sync.RWMutex
}

// NewDummyHandler instantiates a new dummy log handler.
func NewDummyHandler(lvl slog.Level) *DummyHandler {
	return &DummyHandler{level: lvl, records: make([]slog.Record, 0, 16)}
}

// Enabled implements the slog.Handler interface.
func (d *DummyHandler) Enabled(_ context.Context, lvl slog.Level) bool {
	return lvl >= d.level
}

// Handle implements the slog.Handler interface.
func (d *DummyHandler) Handle(_ context.Context, rec slog.Record) error {
	d.mutex.Lock()
	d.records = append(d.records, rec)
	d.mutex.Unlock()
	return nil
}

// WithAttrs implements the slog.Handler interface.
func (d *DummyHandler) WithAttrs(attrs []slog.Attr) slog.Handler {
	d.mutex.Lock()
	d.attrs = attrs
	d.mutex.Unlock()
	return d
}

// WithGroup implements the slog.Handler interface.
func (d *DummyHandler) WithGroup(name string) slog.Handler {
	d.mutex.Lock()
	d.group = name
	d.mutex.Unlock()
	return d
}

// Group returns the handler group.
func (d *DummyHandler) Group() string {
	d.mutex.RLock()
	defer d.mutex.RUnlock()
	return d.group
}

// Attributes returns the handler attributes.
func (d *DummyHandler) Attributes() []slog.Attr {
	d.mutex.RLock()
	defer d.mutex.RUnlock()
	return d.attrs
}

// Count returns the number of stored log records.
func (d *DummyHandler) Count() int {
	d.mutex.RLock()
	defer d.mutex.RUnlock()
	return len(d.records)
}

// Iterate iterates through the stored log records.
func (d *DummyHandler) Iterate(f func(t time.Time, msg string, lvl slog.Level)) {
	d.mutex.RLock()
	for i := range d.records {
		rec := d.records[i]
		f(rec.Time, rec.Message, rec.Level)
	}
	d.mutex.RUnlock()
}

// Clear removes all stored log records.
func (d *DummyHandler) Clear() {
	d.mutex.Lock()
	d.records = d.records[:0]
	d.mutex.Unlock()
}
