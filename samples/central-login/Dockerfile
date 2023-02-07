ARG SOURCE_IMAGE=$SOURCE_IMAGE

FROM $SOURCE_IMAGE as builder
WORKDIR /app/builder

RUN npx nx build central-login --parallel --prod

FROM nginx:1.23.3-alpine

WORKDIR /usr/share/nginx/html

ENV PORT=8002

COPY --from=builder /app/builder/dist/samples/central-login .

EXPOSE 8002

