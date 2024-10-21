package control

import (
	"fmt"
	"log/slog"

	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/pap"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/pip"
	"gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/shared/types"
)

// Controller represents the interface for a PBAC controller component.
type Controller interface {
	String() string
	Name() string
	Version() string
	Authorize(req *types.Request) (*types.Response, error)
}

// Base contains the common attributes of a controller.
type Base struct {
	logger   *slog.Logger
	name     string
	version  string
	fullName string
	pap      pap.PAP
	pip      pip.PIP
}

// NewBase instantiates a new controller base.
func NewBase(name, version string, logger *slog.Logger) Base {
	return Base{
		logger:   logger,
		name:     name,
		version:  version,
		fullName: fmt.Sprintf("%s %s", name, version),
	}
}

// String implements the Controller interface.
func (b *Base) String() string {
	return b.fullName
}

// Name implements the Controller interface.
func (b *Base) Name() string {
	return b.name
}

// Version implements the Controller interface.
func (b *Base) Version() string {
	return b.version
}

// Logger returns the logger used by the controller.
func (b *Base) Logger() *slog.Logger {
	return b.logger
}

// PAP returns the PAP used by the controller.
func (b *Base) PAP() pap.PAP {
	return b.pap
}

// SetPAP sets the PAP for the controller.
func (b *Base) SetPAP(pap pap.PAP) {
	b.pap = pap
}

// PIP returns the PIP used by the controller.
func (b *Base) PIP() pip.PIP {
	return b.pip
}

// SetPIP sets the PIP for the controller.
func (b *Base) SetPIP(pip pip.PIP) {
	b.pip = pip
}
