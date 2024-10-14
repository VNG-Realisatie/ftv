package pbac

import (
	"io"
	"net/url"
)

// Request contains the details of an HTTP request required for access control.
type Request struct {
	URL        *url.URL
	Headers    map[string][]string
	Body       io.Reader
	Attributes map[string]any
}

// Response contains the result of an access control request.
type Response struct {
	Allowed    bool
	Message    string
	NewURL     *url.URL
	NewBody    io.Reader
	Attributes map[string]any
	PolicyKey  string
	PolicyHash string
}
