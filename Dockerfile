FROM node:16-alpine AS visual-editor-builder

ARG GIT_BRANCH
ARG GIT_REVISION
ARG PUBLIC_URL

WORKDIR /visual-editor

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY public ./public
COPY src ./src
COPY .env ./.env

ENV NODE_ENV=production
ENV NODE_OPTIONS=--max_old_space_size=4096
ENV REACT_APP_LANGUAGES="fr|French|fr_FR,en|British English|en_GB,de|German|de_DE"
ENV REACT_APP_DEFAULT_LANGUAGE=fr_FR
ENV REACT_APP_MILLER_CLIENT_ID=b7X9djWuMXK5WZBCNINieUFyQfnFkIPqgf3MsaN5
ENV REACT_APP_VISUAL_EDITOR_GIT_BRANCH=${GIT_BRANCH}
ENV REACT_APP_VISUAL_EDITOR_GIT_REVISION=${GIT_REVISION}
ENV REACT_APP_EDITOR_BASENAME=${PUBLIC_URL}
ENV PUBLIC_URL=${PUBLIC_URL}
ENV REACT_APP_MAPBOX_STYLE_URL=mapbox://styles/mapbox/streets-v11
ENV REACT_APP_MAPBOX_ACCESS_TOKEN=pk.eyJ1IjoiZGFuaWVsZWd1aWRvdW5pIiwiYSI6ImNsMmVyOW5vazAyOXczaW8zYmJnOGczeWIifQ.R8HvtSP3S8gTlpkUeWq-BA
ENV REACT_APP_FRONTEND_URL=https://ww2.lu
ENV REACT_APP_DOCUMENT_SCHEMA=/miller-static/schema/document/payload.json

RUN yarn build

FROM busybox:stable
WORKDIR /visual-editor
COPY --from=visual-editor-builder /visual-editor/build ./
