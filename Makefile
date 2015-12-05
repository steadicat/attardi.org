NODE_BIN=./node_modules/.bin
HASHMARK=$(NODE_BIN)/hashmark -l 6 --asset-map assets.json --cwd build --silent

clean:
	rm -rf build
	rm -f app.yaml
	rm -f assets.json

dirs:
	mkdir -p build
	mkdir -p build/img
	mkdir -p build/errors

node_modules: package.json
	npm install

devjs: node_modules
	node assetserver.js

devhtml: node_modules
	LOCAL_ASSETS=true NODE_ENV=production $(NODE_BIN)/supervisor --harmony -n exit -w buildhtml.js -w js -- buildhtml.js

devserver: buildconfig
	goapp serve

dev: buildimg buildstatic
	make devjs & make devhtml & make devserver

buildconfig:
	node buildconfig.js

buildjs: node_modules dirs
	NODE_ENV=production $(NODE_BIN)/webpack
	$(HASHMARK) main.js build/{hash}.js
	rm -rf build/main.js

buildhtml: node_modules dirs buildimg buildjs
	NODE_ENV=production node buildhtml.js

buildimg: dirs
	mkdir -p build/images
	cp images/* build/images
	$(HASHMARK) images/*.{png,jpg} build/img/{name}-{hash}{ext}
	rm -rf build/images

buildstatic:
	cp -r static/* build/

build: clean buildjs buildimg buildstatic buildhtml buildconfig

deploy: build
	goapp deploy

lint:
	$(NODE_BIN)/eslint js/**/*.js

.PHONY: clean dirs devjs devhtml devserver dev buildconfig buildjs buildhtml buildimg build deploy lint
