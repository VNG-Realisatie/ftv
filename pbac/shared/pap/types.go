package pap

// EventSink is the function signature for handling PAP events.
type EventSink func(t EventType, key string)
