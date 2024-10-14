package server

import (
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

func (s *service) initMiddleware() {
	// catch panics.
	s.svc.Use(recover.New())

	// CORS support so we can use the browser!
	s.svc.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Cache-Control",
	}))

	// caching.
	//s.svc.Use(cache.New(cache.Config{
	//	Next:                 cacheNext,
	//	Expiration:           5 * time.Minute,
	//	KeyGenerator:         cacheKey,
	//	ExpirationGenerator:  cacheTTL,
	//	StoreResponseHeaders: true,
	//	MaxBytes:             0,
	//}))

	s.svc.Use(helmet.New()) // default headers for enhanced security.
}
