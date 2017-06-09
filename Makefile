NODE=$(shell which node)
NPM=$(shell which npm)
YARN=$(shell which yarn)
JQ=$(shell which jq)

VERSION=$(shell jq ".version" package.json)

info:
	@echo node version: `$(NODE) --version` "($(NODE))"
	@echo npm version: `$(NPM) --version` "($(NPM))"
	@echo yarn version: `$(YARN) --version` "($(YARN))"
	@echo jq version: `$(JQ) --version` "($(JQ))"
	@echo assoclist.js version: $(VERSION)

deps: deps-project

deps-project:
	@[[ ! -z "$(YARN)" ]] && $(YARN) install || $(NPM) install

tests:
	@npm run test

assoclist.js: src/index.js
	babel $< > $@

build: assoclist.js

all: tests build

version:
	@sh ./scripts/version $(VERSION)
	@$(JQ) '.version' package.json | cut -d\" -f2 > .version

release-commit:
	git commit --allow-empty -m "Release `cat .version`."
	git add .
	git commit --amend -m "`git log -1 --format=%s`"

release-tag:
	git tag "`cat .version`"

publish-version: release-commit release-tag
	git push git@github.com:diasbruno/assoclist.js "`git branch | grep '^*' | awk '{ print $$2 }'`" "`cat .version`"
	npm publish
	@rm .version

_pre_build: clean deps tests
publish: _pre_build assoclist.js version release-commit release-tag publish-version

clean:
	rm -rf assoclist.js
