FROM okteto.dev/base as base

FROM nginx:1.21.6

WORKDIR /usr/share/nginx/html

COPY --from=base /app/builder/dist/samples/angular-todo  .

ENV PORT=8000
EXPOSE ${PORT}