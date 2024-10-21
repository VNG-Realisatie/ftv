package types

import (
	"io"
	"net/url"

	"github.com/google/uuid"
)

// Request contains the details of an HTTP request required for access control.
type Request struct {
	UID        uuid.UUID           `json:"UID,omitempty"`
	URL        *url.URL            `json:"URL,omitempty"`
	Headers    map[string][]string `json:"headers,omitempty"`
	Body       io.Reader           `json:"body,omitempty"`
	Attributes map[string]any      `json:"attributes,omitempty"`
}

// Response contains the result of an access control request.
type Response struct {
	Allowed    bool           `json:"allowed,omitempty"`
	Message    string         `json:"message,omitempty"`
	NewURL     *url.URL       `json:"newURL,omitempty"`
	NewBody    io.Reader      `json:"newBody,omitempty"`
	Attributes map[string]any `json:"attributes,omitempty"`
	PolicyKey  string         `json:"policyKey,omitempty"`
	PolicyHash string         `json:"policyHash,omitempty"`
}
