export CLOUDSDK_CORE_PROJECT=attardi-org

SOURCES := $(shell find gatsby/src -name \*.ts -o -name \*.tsx -o -name \*.md)

clean:
	rm -rf app/public ; rm -rf gatsby/public ; rm -rf gatsby/.cache
.PHONY: clean

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
	cd app && go run main.go

deploy: app/public app/app.yaml
	cd app && gcloud app deploy --promote

deploy-www:
	cd app-www && gcloud app deploy

deploy-maria:
	cd app-maria && gcloud app deploy

deploy-rationalcreation:
	cd app-rationalcreation && gcloud app deploy
	
deploy-rationalcreation-www:
	cd app-rationalcreation-www && gcloud app deploy

deploy-unicoders:
	cd app-unicoders && gcloud app deploy

deploy-verbamanent:
	cd app-verbamanent && gcloud app deploy

dispatch:
	gcloud app deploy dispatch.yaml
