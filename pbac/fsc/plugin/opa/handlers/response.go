package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/utils"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/utilities/convert"
)

// SendBasicResponse sends a basic response corresponding with the given status code.
// If the given status code is not in the supported statuses list, an empty body will be sent.
func SendBasicResponse(req *fiber.Ctx, status int) error {
	req.Set(fiber.HeaderContentType, fiber.MIMEApplicationJSON)
	return req.Status(status).Send(responseBody[status])
}

// SendMessageResponse sends a basic response corresponding with the given status code.
func SendMessageResponse(req *fiber.Ctx, status int, msg string) error {
	req.Set(fiber.HeaderContentType, fiber.MIMEApplicationJSON)
	return req.Status(status).JSON(&basicResponse{Message: msg})
}

type basicResponse struct {
	Message string `json:"message,omitempty"`
	Data    any    `json:"data,omitempty"`
}

var (
	supportedStatus = [...]int{
		fiber.StatusOK,
		fiber.StatusCreated,
		fiber.StatusBadRequest,
		fiber.StatusForbidden,
		fiber.StatusNotFound,
		fiber.StatusConflict,
		fiber.StatusInternalServerError,
	}
	responseBody = make(map[int][]byte, len(supportedStatus))
)

func init() {
	for _, status := range supportedStatus {
		responseBody[status] = convert.MustMarshall(&basicResponse{Message: utils.StatusMessage(status)})
	}
}
