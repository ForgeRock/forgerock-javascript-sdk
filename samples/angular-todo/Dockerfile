ARG SOURCE_IMAGE=$SOURCE_IMAGE

FROM $SOURCE_IMAGE as builder
WORKDIR /app/builder

RUN npx nx build angular-todo --prod

FROM nginx:1.23.3-alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/builder/dist/samples/angular-todo  .

ENV PORT=8082
EXPOSE ${PORT}