package handlers

import (
	"github.com/goccy/go-json"
	"github.com/gofiber/fiber/v2"
)

// Ping is the endpoint for health checks.
// There are no internal service checks, so for now it will always respond with status OK.
func Ping(c *fiber.Ctx) error {
	c.Set(fiber.HeaderContentType, fiber.MIMEApplicationJSON)
	return c.Send(pingResponse)
}

var (
	pingResponse []byte
)

func init() {
	pingResponse, _ = json.Marshal(basicResponse{Message: "pong"})
}
