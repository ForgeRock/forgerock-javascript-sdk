FROM node:alpine as base

WORKDIR /app/builder

RUN npm i -g nx

COPY . /app/builder 

RUN npm install --ignore-scripts --include=dev

ARG AM_URL=$AM_URL
ENV AM_URL=$AM_URL
ARG REALM_PATH=$REALM_PATH
ENV REALM_PATH=$REALM_PATH
ARG CENTRAL_LOGIN_CLIENT=$CENTRAL_LOGIN_CLIENT
ARG WEB_OAUTH_CLIENT=$CENTRAL_LOGIN_CLIENT
ARG SCOPE=$SCOPE
ENV SCOPE=$SCOPE
ARG TIMEOUT=$TIMEOUT
ENV TIMEOUT=$TIMEOUT
ARG TREE=$TREE
ENV TREE=$TREE

RUN nx build central-login --parallel --prod --skipNxCache

FROM nginx:1.19.2

WORKDIR /usr/share/nginx/html

ENV PORT=8002

COPY --from=base /app/builder/dist/samples/central-login .

EXPOSE 8002

