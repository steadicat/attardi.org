SOURCES := $(shell find gatsby/src -name \*.ts -o -name \*.tsx -o -name \*.md)

gatsby/node_modules: gatsby/package.json
	cd gatsby && yarn install
	touch gatsby/node_modules

dev: gatsby/node_modules
	cd gatsby && gatsby develop

build: gatsby/node_modules
	cd gatsby && gatsby build

app/app.yaml: app/app.template.yaml gatsby/buildconfig.ts $(SOURCES)
	cd gatsby && ts-node buildconfig.ts

serve: app/app.yaml
	cd app && goapp serve

deploy: build
	cd gatsby && ts-node buildconfig.ts
	cd app && goapp deploy