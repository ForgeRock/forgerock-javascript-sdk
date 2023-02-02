ARG SOURCE_IMAGE=$SOURCE_IMAGE

FROM $SOURCE_IMAGE as builder
WORKDIR /app/builder

RUN npx nx build central-login --parallel --prod

FROM nginx:1.19.2

WORKDIR /usr/share/nginx/html

ENV PORT=8002

COPY --from=base /app/builder/dist/samples/central-login .

EXPOSE 8002

