FROM node:12-alpine as visual-editor-builder

ARG GIT_BRANCH
ARG GIT_REVISION
ARG PUBLIC_URL=/editor
 
WORKDIR /visual-editor

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY public ./public
COPY src ./src
COPY .env .

ENV NODE_ENV production
ENV NODE_OPTIONS --max_old_space_size=4096

ENV REACT_APP_VISUAL_EDITOR_GIT_BRANCH=${GIT_BRANCH}
ENV REACT_APP_VISUAL_EDITOR_GIT_REVISION=${GIT_REVISION}
ENV PUBLIC_URL=${PUBLIC_URL}

RUN yarn build

FROM busybox
WORKDIR /visual-editor
COPY --from=visual-editor-builder /visual-editor/build ./