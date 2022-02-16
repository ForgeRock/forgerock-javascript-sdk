FROM node:alpine as builder

WORKDIR /app/builder
RUN npm i -g nx

COPY . /app/builder 
RUN npm install

RUN nx run-many --target=build --projects=todo-api,mock-api,autoscript-apps --parallel --skipNxCache
