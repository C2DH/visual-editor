BUILD_TAG ?= latest
PUBLIC_URL ?=/editor

run-dev:
	PUBLIC_URL=${PUBLIC_URL} \
	REACT_APP_EDITOR_BASENAME=${PUBLIC_URL} \
	REACT_APP_GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	REACT_APP_GIT_REVISION=$(shell git rev-parse --short HEAD) \
	npm start

run-build:
	REACT_APP_GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	REACT_APP_GIT_REVISION=$(shell git rev-parse --short HEAD) \
	PUBLIC_URL=/editor yarn build

build-docker-image:
	docker build \
	-t c2dhunilu/visual-editor:${BUILD_TAG} \
	--build-arg PUBLIC_URL=${PUBLIC_URL} \
	--build-arg GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	--build-arg GIT_REVISION=$(shell git rev-parse --short HEAD) .
