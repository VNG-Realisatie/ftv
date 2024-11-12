package pap

// EventType indicates the type of PAP event.
type EventType uint8

// ListAllKeys of possible PAP events.
const (
	PolicyAdded EventType = iota + 1
	PolicyReplaced
	PolicyRemoved
)

func (e EventType) String() string {
	switch e {
	case PolicyAdded:
		return "added"
	case PolicyReplaced:
		return "replaced"
	case PolicyRemoved:
		return "removed"
	default:
		return "<invalid>"
	}
}
