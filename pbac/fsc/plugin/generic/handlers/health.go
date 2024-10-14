package handlers

import (
	"github.com/gofiber/fiber/v2"
)

// Health is the endpoint for health checks.
//
// There are no internal service checks, so for now it will always respond with a static OK message.
func Health(fc *fiber.Ctx) error {
	return SendBasicResponse(fc, fiber.StatusOK)
}
