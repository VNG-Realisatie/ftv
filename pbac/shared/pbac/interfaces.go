package pbac

// Controller represents the interface for a PBAC controller component.
type Controller interface {
	String() string
	Name() string
	Version() string
	Authorize(req *Request) (*Response, error)
}
