package types

import (
	"net/url"
	"time"

	"github.com/google/uuid"
)

// Request contains the details of an HTTP request required for access control.
type Request struct {
	UID         *uuid.UUID          `json:"uid,omitempty"`
	URL         *url.URL            `json:"url,omitempty"`
	Method      string              `json:"method,omitempty"`
	RequestTime *time.Time          `json:"requestTime,omitempty"`
	Headers     map[string][]string `json:"headers,omitempty"`
	Body        []byte              `json:"body,omitempty"`
	Attributes  map[string]any      `json:"attributes,omitempty"`
}

// Response contains the result of an access control request.
type Response struct {
	Allowed    bool           `json:"allowed,omitempty"`
	Message    string         `json:"message,omitempty"`
	NewURL     *url.URL       `json:"newURL,omitempty"`
	NewBody    []byte         `json:"newBody,omitempty"`
	Attributes map[string]any `json:"attributes,omitempty"`
	PolicyKey  string         `json:"policyKey,omitempty"`
	PolicyHash string         `json:"policyHash,omitempty"`
}
