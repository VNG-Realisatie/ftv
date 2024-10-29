// Package config handles the configurable options for the FSC Auth plugin.
package config

import (
	"fmt"
	"log/slog"
	"time"

	"gitlab.com/gjuyn/go-config/config"
	"gitlab.com/gjuyn/go-config/config-ext/yaml"

	slog2 "gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/utilities/slog"
)

// Config represents our configuration variables.
type Config struct {
	Host               string        `yaml:"svc.host,omitempty" env:"ADDRESS,HOST" flag:"address,a" default:"0.0.0.0" desc:"Address to use for service"`
	Port               uint16        `yaml:"svc.port,omitempty" env:"PORT" flag:"port,p" default:"8443" desc:"Port to use for https service"`
	CA                 string        `yaml:"svc.tls.ca,omitempty" env:"TLS_CA" flag:"tls-ca,ca" desc:"TLS Certificate authority to use for https service"`
	Cert               string        `yaml:"svc.tls.cert,omitempty" env:"TLS_CERT" flag:"tls-cert,cert" desc:"TLS certificate to use for https service"`
	Key                string        `yaml:"svc.tls.key,omitempty" env:"TLS_KEY" flag:"tls-key,key" desc:"TLS key authority to use for https service"`
	ReadTimeout        time.Duration `yaml:"svc.timeout.read,omitempty" env:"READ_TIMEOUT" flag:"read-timeout" default:"30s" desc:"Read timeout for API requests"`
	WriteTimeout       time.Duration `yaml:"svc.timeout.write,omitempty" env:"WRITE_TIMEOUT" flag:"write-timeout" default:"30s" desc:"Write timeout for API requests"`
	IdleTimeout        time.Duration `yaml:"svc.timeout.idle,omitempty" env:"IDLE_TIMEOUT" flag:"idle-timeout" default:"300s" desc:"Idle timeout for API requests"`
	MaxBody            int           `yaml:"svc.maxBody,omitempty" env:"MAX_BODY_SIZE" flag:"max-body" default:"65536" desc:"Maximum size of request body"`
	LogOutput          string        `yaml:"log.output,omitempty" env:"LOG_OUTPUT" flag:"log-output" default:"stdout" desc:"File for writing log data"`
	LogFormat          string        `yaml:"log.format,omitempty" env:"LOG_FORMAT" flag:"log-format" default:"json" desc:"Format to use when writing log data (json, text)"`
	LogLevel           string        `yaml:"log.level,omitempty" env:"LOG_LEVEL" flag:"log-level" default:"info" desc:"Level for writing log data (debug, info, warn, error)"`
	LogSource          bool          `yaml:"log.source,omitempty" env:"LOG_SOURCE" flag:"log-source" default:"true" desc:"Include source-location when writing log data"`
	PolicyLanguage     string        `yaml:"policies.language,omitempty" env:"POLICIES_LANGUAGE" flag:"policies-language,language" default:"CEDAR" desc:"Language used for policy files"`
	PolicyStore        string        `yaml:"policies.store.path,omitempty" env:"POLICIES_STORE" flag:"policies-store" desc:"Path where policy files are stored"`
	PolicyStoreRecurse bool          `yaml:"policies.store.recurse,omitempty" env:"POLICIES_STORE_RECURSE" flag:"policies-store-recurse" desc:"Search policy file storage recursively"`
	PipStore           string        `yaml:"pip.store.path,omitempty" env:"PIP_STORE" flag:"pip-store" desc:"Path where PIP attribute files are stored"`
	PipStoreRecurse    bool          `yaml:"pip.store.recurse,omitempty" env:"PIP_STORE_RECURSE" flag:"pip-store-recurse" desc:"Search PIP attribute file storage recursively"`
}

const (
	// AppName defines the name and version of this application.
	AppName   = "FSC-AUTH plugin 0.1"
	envPrefix = "FSC_AUTH_"
	cfg1      = "/etc/fsc-auth/default.conf"
	cfg2      = "./etc/fsc-auth.yaml"
	cfg3      = "./fsc-auth.yaml"
)

var files = []string{cfg1, cfg2, cfg3}

// New instantiates a new configuration from one or more files, environment variables and command-line flags.
func New(opts ...config.Option) (*Config, *slog.Logger, error) {
	cfg := &Config{}

	// put fixed and custom configuration options in appropriate order.
	opts = append(
		append(
			[]config.Option{
				yaml.FilesYAML(files...),
				config.EnvironmentPrefix(envPrefix),
				config.AppName(AppName),
			},
			opts...,
		),
		config.NoHelpOnError(),
	)

	// perform initial loading to prefetch logger variables, ignoring the error.
	_ = config.LoadConfig(cfg, opts...)

	// initialize the logger.
	logger, err := slog2.Init(cfg.LogOutput, cfg.LogFormat, cfg.LogLevel, cfg.LogSource)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to initialize logger: %w", err)
	}

	// perform second loading for error checking!
	if err = config.LoadConfig(cfg, append(opts, config.NoDefaults())...); err != nil {
		return nil, logger, fmt.Errorf("failed to load configuration: %w", err)
	}

	return cfg, logger, nil
}
