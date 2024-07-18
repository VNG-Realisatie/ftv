PROJECT_NAME := "mock-brp-public-tables-data"
PKG := "gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/$(PROJECT_NAME)"
PKG_LIST := $(shell go list ./...)
GO_FILES := $(shell find . -name '*.go' | grep -v _test.go)

.PHONY: all dep-up fmt vet lint test race msan cover coverhtml escape examples help

all: vet lint test race examples

dep-up: ## upgrade all dependencies
	@go get -u ./...
	@go mod tidy

fmt: ${GO_FILES}  ## format all source code
	@go fmt ${PKG_LIST}

vet: fmt  ## vet all source code
	@go vet ${PKG_LIST}

lint: fmt ## lint all source code (requires revive tool)
	@revive -set_exit_status ${PKG_LIST}

test: fmt ## run all unit tests
	@go test -cover ${PKG_LIST}

bench: fmt ## run all benchmarks
	@go test -bench . -benchmem ${PKG_LIST}

race: fmt ## run race detector
	@go test -race ${PKG_LIST}

msan: fmt ## run memory sanitizer
	@go test -msan ${PKG_LIST}

cover: fmt ## run coverage report
	@../scripts/coverage.sh

coverhtml: fmt ## run coverage report and display in browser (requires xdg-open tool)
	@../scripts/coverage.sh html
	@xdg-open cover.html

escape: fmt ## run escape analysis
	@go build -gcflags "-m" ${PKG_LIST} 2>&1

examples: fmt ## build example binaries

help:
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
