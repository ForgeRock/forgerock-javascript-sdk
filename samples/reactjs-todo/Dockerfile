FROM okteto.dev/base as base

FROM nginx:1.19.2

WORKDIR /usr/share/nginx/html

COPY --from=base /app/builder/samples/reactjs-todo/public ./public
COPY --from=base /app/builder/dist/samples/reactjs-todo .

EXPOSE 80
