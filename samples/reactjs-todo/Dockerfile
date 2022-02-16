FROM okteto.dev/base as base

ARG WEB_OAUTH_CLIENT
ARG AM_URL
ARG APP_URL
ARG API_URL
ARG DEBUGGER_OFF
ARG REALM_PATH
ARG JOURNEY_LOGIN
ARG JOURNEY_REGISTER 

FROM node:alpine as builder

ARG WEB_OAUTH_CLIENT
ARG AM_URL
ARG APP_URL
ARG API_URL
ARG DEBUGGER_OFF
ARG REALM_PATH
ARG JOURNEY_LOGIN
ARG JOURNEY_REGISTER

WORKDIR /app/builder

COPY --from=base /app/builder/package* .
COPY --from=base /app/builder/nx.json .
COPY --from=base /app/builder/tsconfig.base.json .
COPY --from=base /app/builder/workspace.json .
COPY --from=base /app/builder/node_modules ./node_modules
COPY --from=base /app/builder/packages ./packages
COPY --from=base /app/builder/samples ./samples
COPY --from=base /app/builder/babel.config.json ./
COPY --from=base /app/builder/e2e ./e2e

RUN npx nx build reactjs-todo --skipNxCache

FROM nginx:1.19.2

WORKDIR /usr/share/nginx/html
ENV PORT=8443
EXPOSE ${PORT}

COPY --from=builder /app/builder/samples/reactjs-todo/public .
COPY --from=builder /app/builder/dist/samples/reactjs-todo .
