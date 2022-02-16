FROM okteto.dev/base as builder

FROM nginx:1.19.2

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/builder/dist/e2e/autoscript-apps .
