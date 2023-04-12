ARG SOURCE_IMAGE=$SOURCE_IMAGE

FROM $SOURCE_IMAGE as builder

ENV NODE_ENV production

RUN npx nx build todo-api --prod

EXPOSE 8081

CMD ["node", "dist/samples/todo-api/main.js"]
