
GULP=./node_modules/.bin/gulp

.PHONY: install
install:
	npm install

.PHONY: dev
dev:
	$(GULP)

.PHONY: serve
serve:
	$(GULP) serve

.PHONY: dist
dist:
	NODE_ENV=production ${GULP} js
	NODE_ENV=production ${GULP} html
	NODE_ENV=production ${GULP} images

.PHONY: deploy
deploy: dist
	${GULP} deploy

.PHONY: clean
clean:
	rm -rf dist
	mkdir -p dist
