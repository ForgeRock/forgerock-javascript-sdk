ARG SOURCE_IMAGE=$SOURCE_IMAGE

FROM $SOURCE_IMAGE as builder
WORKDIR /app/builder

RUN npx nx build angular-todo --prod

FROM nginx:1.21.6

WORKDIR /usr/share/nginx/html

COPY --from=base /app/builder/dist/samples/angular-todo  .

ENV PORT=8082
EXPOSE ${PORT}