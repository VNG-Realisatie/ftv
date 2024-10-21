package pap

// EventType indicates the type of PAP event.
type EventType uint8

// ListAllKeys of possible PAP events.
const (
	PolicyCreated EventType = iota + 1
	PolicyUpdated
	PolicyDeleted
)
