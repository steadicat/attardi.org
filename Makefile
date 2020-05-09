export CLOUDSDK_CORE_PROJECT=attardi-org

SOURCES := $(shell find gatsby/src -name \*.ts -o -name \*.tsx -o -name \*.md)

gatsby/node_modules: gatsby/package.json
	cd gatsby && yarn install
	touch gatsby/node_modules

dev: gatsby/node_modules
	cd gatsby && gatsby develop

gatsby/public: gatsby/node_modules $(SOURCES)
	cd gatsby && gatsby build

app/public: gatsby/public
	mv gatsby/public app/public

app/app.yaml: app/app.template.yaml gatsby/buildconfig.ts $(SOURCES) | app/public
	cd gatsby && ts-node -T buildconfig.ts

serve: app/app.yaml
	cd app && go run

deploy: app/public app/app.yaml
	cd app && gcloud app deploy --version 1 --no-promote

deploy-www:
	cd app-www && gcloud app deploy --version 1

deploy-maria:
	cd app-maria && gcloud app deploy --version 1