package server

import (
	"fmt"
	"syscall"
	"time"
)

func (s *service) run() {
	go func() {
		// there's no notification from fiber when the HTTP server has started, so we fake it.
		// 10 milliseconds should be ample time.
		time.AfterFunc(10*time.Millisecond, func() {
			s.logger.Info("http service started", "host", s.cfg.Host, "port", s.cfg.Port)
		})

		address := fmt.Sprintf("%s:%d", s.cfg.Host, s.cfg.Port)
		if err := s.svc.ListenTLS(address, s.cfg.Cert, s.cfg.Key); err != nil {
			s.logger.Error("failed to start service", "error", err)
			s.shutdown.Store(true)       // indicate server is stopped or never started.
			s.intChan <- syscall.SIGQUIT // send a signal to end the Run function.
		}
	}()

	// first signal performs orderly shutdown.
	<-s.intChan

	if s.shutdown.Load() {
		return // this indicates the server never got started, so there's nothing to shut down!
	}

	go func() {
		s.logger.Info("service stopping")
		s.svc.Shutdown()
		s.shutdown.Store(true)       // indicate shutdown was successful.
		s.intChan <- syscall.SIGQUIT // send a second signal to end the Run function.
	}()

	// another signal will force the shutdown.
	<-s.intChan

	if s.shutdown.Load() {
		s.logger.Info("service stopped successfully")
	} else {
		s.logger.Info("service aborted")
	}
}
