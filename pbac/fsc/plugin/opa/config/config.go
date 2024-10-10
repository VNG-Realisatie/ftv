package config

import (
	"fmt"
	"log/slog"
	"time"

	"gitlab.com/gjuyn/go-config/config"
	"gitlab.com/gjuyn/go-config/config-ext/yaml"

	logger "gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/utilities/slog"
)

// Config represents our configuration variables.
type Config struct {
	Host         string        `yaml:"svc.host,omitempty" env:"ADDRESS,HOST" flag:"address,a" default:"0.0.0.0" desc:"Address to use for service"`
	Port         uint16        `yaml:"svc.tls.port,omitempty" env:"TLS_PORT,PORT" flag:"tls-port,port,p" default:"8443" desc:"Port to use for https service"`
	CA           string        `yaml:"svc.tls.ca,omitempty" env:"TLS_CA" flag:"tls-ca,ca" desc:"TLS Certificate authority to use for https service"`
	Cert         string        `yaml:"svc.tls.cert,omitempty" env:"TLS_CERT" flag:"tls-cert,cert" desc:"TLS certificate to use for https service"`
	Key          string        `yaml:"svc.tls.key,omitempty" env:"TLS_KEY" flag:"tls-key,key" desc:"TLS key authority to use for https service"`
	ReadTimeout  time.Duration `yaml:"svc.timeout.read,omitempty" env:"READ_TIMEOUT" flag:"read-timeout" default:"30s" desc:"Read timeout for API requests"`
	WriteTimeout time.Duration `yaml:"svc.timeout.write,omitempty" env:"WRITE_TIMEOUT" flag:"write-timeout" default:"30s" desc:"Write timeout for API requests"`
	IdleTimeout  time.Duration `yaml:"svc.timeout.idle,omitempty" env:"IDLE_TIMEOUT" flag:"idle-timeout" default:"300s" desc:"Idle timeout for API requests"`
	MaxBody      int           `yaml:"svc.maxBody,omitempty" env:"MAX_BODY_SIZE" flag:"max-body" default:"65536" desc:"Maximum size of request body"`
	LogOutput    string        `yaml:"log.output,omitempty" env:"LOG_OUTPUT" flag:"log-output" default:"stdout" desc:"File for writing log data"`
	LogFormat    string        `yaml:"log.format,omitempty" env:"LOG_FORMAT" flag:"log-format" default:"json" desc:"Format to use when writing log data (json, text)"`
	LogLevel     string        `yaml:"log.level,omitempty" env:"LOG_LEVEL" flag:"log-level" default:"info" desc:"Level for writing log data (debug, info, warn, error)"`
	LogSource    bool          `yaml:"log.source,omitempty" env:"LOG_SOURCE" flag:"log-source" default:"true" desc:"Include source-location when writing log data"`
}

const (
	AppName   = "FSC-OPA plugin 0.1"
	envPrefix = "FSC_OPA_"
	cfg1      = "/etc/fsc-opa/default.conf"
	cfg2      = "../etc/fsc-opa.yaml"
	cfg3      = "./fsc-opa.yaml"
)

var files = []string{cfg1, cfg2, cfg3}

// New instantiates a new configuration from one or more files, environment variables and command-line flags.
func New(opts ...config.Option) (*Config, *slog.Logger, error) {
	c := &Config{}

	opts = append([]config.Option{
		yaml.FilesYAML(files...),
		config.EnvironmentPrefix(envPrefix),
		config.AppName(AppName),
	}, opts...)

	// initial load to prefetch logger variables.
	_ = config.LoadConfig(c, append(opts, config.NoHelpOnError())...)

	// initialize the logger.
	l, err := logger.Init(c.LogOutput, c.LogFormat, c.LogLevel, c.LogSource)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to initialize logger: %w", err)
	}

	// second load for error checking!
	if err = config.LoadConfig(c, append(opts, config.NoDefaults())...); err != nil {
		return nil, l, fmt.Errorf("failed to load configuration: %w", err)
	}

	return c, l, nil
}
