run-dev:
	REACT_APP_VISUAL_EDITOR_GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	REACT_APP_VISUAL_EDITOR_GIT_REVISION=$(shell git rev-parse --short HEAD) \
	yarn start

run-build:
	REACT_APP_VISUAL_EDITOR_GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	REACT_APP_VISUAL_EDITOR_GIT_REVISION=$(shell git rev-parse --short HEAD) \
	PUBLIC_URL=/editor yarn build

build-docker-image:
	docker build \
	-t c2dhunilu/visual-editor \
	--build-arg GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD) \
	--build-arg GIT_REVISION=$(shell git rev-parse --short HEAD) .

