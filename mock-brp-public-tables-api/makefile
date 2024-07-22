.PHONY: container watch

docker: ## build docker container for live preview
	@docker build . -t api-preview

watch: docker  ## run live preview
	@docker run --rm -it -p 8000:8000 -v ${PWD}/spec:/api api-preview /watch.sh /api/openapi.yaml

generated: ## generate the code
	@oapi-codegen -config ./spec/config.yaml ./spec/openapi.yaml

help:
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
