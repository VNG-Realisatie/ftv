package cedar

import (
	"log/slog"
	"maps"
	"math"
	"sync"
	"time"

	"github.com/cedar-policy/cedar-go"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/types"
)

// NewAttributeBuilder returns the function prototype for building a new Cedar based attribute set.
func NewAttributeBuilder(logger *slog.Logger) types.AttributesBuilder {
	return func(in ...types.AttributeSet) types.AttributeSet {
		return NewAttributeSet(logger, in...)
	}
}

// NewAttributeSet instantiates a new Cedar based attribute set.
func NewAttributeSet(logger *slog.Logger, in ...types.AttributeSet) types.AttributeSet {
	a := &attributes{logger: logger, set: make(cedar.RecordMap)}
	for i := range in {
		a.Merge(in[i])
	}
	return a
}

// AddAttribute implements the AttributeSet interface.
func (a *attributes) AddAttribute(key string, value any) {
	a.mutex.Lock()
	a.set[cedar.String(key)] = a.anyToValue(value)
	a.mutex.Unlock()
}

// GetAttribute implements the AttributeSet interface.
func (a *attributes) GetAttribute(key string) any {
	a.mutex.RLock()
	defer a.mutex.RUnlock()
	return a.set[cedar.String(key)]
}

// RemoveAttribute implements the AttributeSet interface.
func (a *attributes) RemoveAttribute(key string) {
	a.mutex.Lock()
	delete(a.set, cedar.String(key))
	a.mutex.Unlock()
}

// Iterate implements the AttributeSet interface.
func (a *attributes) Iterate(f types.AttributeIterator) {
	a.mutex.RLock()
	for k := range a.set {
		f(k.String(), a.valueToAny(a.set[k]))
	}
	a.mutex.RUnlock()
}

// Merge implements the AttributeSet interface.
func (a *attributes) Merge(in ...types.AttributeSet) {
	a.mutex.Lock()
	for i := range in {
		if set, ok := in[i].(*attributes); ok {
			set.mutex.RLock()
			maps.Copy(a.set, set.set)
			set.mutex.RUnlock()
		} else {
			in[i].Iterate(func(key string, value any) {
				a.set[cedar.String(key)] = a.anyToValue(value)
			})
		}
	}
	a.mutex.Unlock()
}

func (a *attributes) valueToAny(v cedar.Value) any {
	switch t := v.(type) {
	case nil:
		return nil
	case cedar.String:
		return string(t)
	case cedar.Boolean:
		return bool(t)
	case cedar.Long:
		return int64(t)
	case cedar.Decimal:
		return t.Value
	case cedar.Datetime:
		return time.UnixMilli(t.Milliseconds()).UTC()
	case cedar.Duration:
		return time.Millisecond * time.Duration(t.ToMilliseconds())

	case cedar.Set:
		return a.setToSlice(t)

	case cedar.Record:
		return a.recordToMap(t)

	default:
		a.logger.Warn("unsupported attribute conversion from Cedar", "type", t)
		return t.String()
	}
}

func (a *attributes) setToSlice(v cedar.Set) []any {
	s := v.Slice()
	if len(s) == 0 {
		return nil
	}

	out := make([]any, len(s))
	for i := range s {
		out[i] = a.valueToAny(v.Slice()[i])
	}
	return out
}

func (a *attributes) recordToMap(v cedar.Record) map[string]any {
	m := v.Map()
	if len(m) == 0 {
		return nil
	}

	out := make(map[string]any, len(m))
	for k, v := range m {
		out[string(k)] = a.valueToAny(v)
	}
	return out
}

func (a *attributes) anyToValue(in any) cedar.Value {
	if cv, ok := in.(cedar.Value); ok {
		return cv
	}

	switch t := in.(type) {
	case nil:
		return nil
	case string:
		return cedar.String(t)
	case bool:
		return cedar.Boolean(t)
	case int64:
		return cedar.Long(t)
	case float64:
		return cedar.Decimal{Value: int64(math.Round(t * cedar.DecimalPrecision))}
	case time.Time:
		return cedar.FromStdTime(t)
	case time.Duration:
		return cedar.FromStdDuration(t)

	case []string:
		s := make([]cedar.Value, len(t))
		for i := range t {
			s[i] = cedar.String(t[i])
		}
		return cedar.NewSet(s)

	case map[string]string:
		s := make(cedar.RecordMap, len(t))
		for k, v := range t {
			s[cedar.String(k)] = cedar.String(v)
		}
		return cedar.NewRecord(s)

	case map[string]any:
		s := make(cedar.RecordMap, len(t))
		for k, v := range t {
			s[cedar.String(k)] = a.anyToValue(v)
		}
		return cedar.NewRecord(s)

	default:
		a.logger.Warn("unsupported attribute conversion to Cedar", "type", t)
		return nil
	}
}

type attributes struct {
	logger *slog.Logger
	set    cedar.RecordMap
	mutex  sync.RWMutex
}
