PROJECT_NAME := "fsc-opa"
PKG := "gitlab.com/digilab.overheid.nl/ecosystem/federatieve-toegangsverlening/pbac/fsc/plugin/opa/$(PROJECT_NAME)"
PKG_LIST := $(shell go list ./...)
GO_FILES := $(shell find . -name '*.go' | grep -v _test.go)

.PHONY: all lint dep fmt test race cover coverhtml escape app help

all: test

lint: ## lint all source code
	@golint -set_exit_status ${PKG_LIST}

dep: ## upgrade all dependencies
	@go get -u ./...
	@go mod tidy

fmt: ${GO_FILES}  ## format source code
	@go fmt ${PKG_LIST}

test: fmt ## run all unit tests
	@go test -cover ${PKG_LIST}

bench: fmt ## run all benchmarks
	@go test -bench . -benchmem ${PKG_LIST}

race: fmt ## run race detector
	@go test -race ${PKG_LIST}

cover: fmt ## run coverage report
	@../../../../scripts/coverage.sh

coverhtml: fmt ## run coverage report and display in browser (requires xdg-open)
	@../../../../scripts/coverage.sh html
	@xdg-open cover.html > /dev/null 2>&1

escape: fmt ## run escape analysis
	@go build -gcflags "-m" ${PKG_LIST} 2>&1

app: fmt ## build binaries
	@go build -ldflags "-s -w" -o ../../../..bin/fsc-opa cmd/*.go

help:
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
