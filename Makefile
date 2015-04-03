
GULP=./node_modules/.bin/gulp

.PHONY: install
install:
	npm install

.PHONY: dev
dev:
	$(GULP)

.PHONY: deploy
deploy: dist
	${GULP} deploy

.PHONY: clean
clean:
	rm -rf dist
	mkdir -p dist
