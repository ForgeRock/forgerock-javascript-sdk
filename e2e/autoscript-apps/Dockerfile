ARG SOURCE_IMAGE=$SOURCE_IMAGE

FROM $SOURCE_IMAGE as builder

FROM nginx:1.23.3-alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/builder/dist/e2e/autoscript-apps .
