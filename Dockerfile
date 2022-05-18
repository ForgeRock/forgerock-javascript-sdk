FROM node:alpine

WORKDIR /app/builder
RUN npm i -g nx

COPY . /app/builder 
RUN npm install --ignore-scripts
ENV NODE_ENV production
ARG AM_URL
ARG API_URL
ARG DEBUGGER_OFF
ARG REALM_PATH
ARG JOURNEY_LOGIN
ARG JOURNEY_REGISTER
ARG WEB_OAUTH_CLIENT
ARG REST_OAUTH_CLIENT
ARG REST_OAUTH_SECRET
ARG SCOPE
ARG TIMEOUT
ARG TREE

RUN nx run-many --target=config --projects=angular-todo --skipNxCache
RUN nx run-many --target=build --all --parallel  --prod --skipNxCache
