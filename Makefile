install:
	npm ci

lint:
	npx eslint

gendiff:
	node bin/gendiff.js

test:
	npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8