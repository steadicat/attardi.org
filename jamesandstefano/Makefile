include Secrets

words:
	yarn run ts-node -T words.ts
.PHONY: words

dev:
	DEV=true AIRTABLE_API_KEY=$(AIRTABLE_API_KEY) go run main.go
.PHONY: dev

build:
	yarn run ts-node -T build.tsx
.PHONY: build

deploy: build
	gcloud app deploy
.PHONY: deploy