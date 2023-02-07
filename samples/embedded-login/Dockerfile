ARG SOURCE_IMAGE=$SOURCE_IMAGE

FROM $SOURCE_IMAGE as builder
WORKDIR /app/builder
COPY . .

RUN npx nx build embedded-login --prod

FROM nginx:1.23.3-alpine

WORKDIR /usr/share/nginx/html

ENV PORT=8001

COPY --from=builder /app/builder/dist/samples/embedded-login .

EXPOSE 8001

