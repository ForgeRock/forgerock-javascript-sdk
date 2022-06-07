FROM node:alpine

WORKDIR /app/builder
RUN npm i -g nx

COPY . /app/builder 
RUN npm install --ignore-scripts

ENV NODE_ENV production
ARG AM_URL={$AM_URL}
ARG API_URL=${API_URL}
ARG DEBUGGER_OFF=${DEBUGGER_OFF}
ARG REALM_PATH=${REALM_PATH}
ARG JOURNEY_LOGIN=${JOURNEY_LOGIN}
ARG JOURNEY_REGISTER=${JOURNEY_REGISTER}
ARG WEB_OAUTH_CLIENT=${WEB_OAUTH_CLIENT}
ARG REST_OAUTH_CLIENT=${REST_OAUTH_CLIENT}
ARG REST_OAUTH_SECRET=${REST_OAUTH_SECRET}
ARG SCOPE=${SCOPE}
ARG TIMEOUT=${TIMEOUT}
ARG TREE=${TREE}

RUN nx run-many --target=config --projects=angular-todo --skipNxCache
RUN nx run-many --target=build --all --parallel  --prod --skipNxCache
