
gatsby/node_modules: gatsby/package.json
	cd gatsby && yarn install
	touch gatsby/node_modules

dev: gatsby/node_modules
	cd gatsby && gatsby develop

build: gatsby/node_modules
	cd gatsby && gatsby build

app/app.yaml: app/app.template.yaml gatsby/buildconfig.ts
	cd gatsby && ts-node buildconfig.ts

serve: app/app.yaml
	cd app && goapp serve
