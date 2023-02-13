ARG SOURCE_IMAGE=$SOURCE_IMAGE

FROM $SOURCE_IMAGE as builder
WORKDIR /app/builder

RUN npx nx build reactjs-todo --prod 

FROM nginx:1.23.3-alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/builder/samples/reactjs-todo/public ./public
COPY --from=builder /app/builder/dist/samples/reactjs-todo .

EXPOSE 8443
