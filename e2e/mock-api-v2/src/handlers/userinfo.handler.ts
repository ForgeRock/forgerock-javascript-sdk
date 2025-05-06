import { Effect } from 'effect';
import { RouterBuilder } from 'effect-http';
import { apiSpec } from '../spec.js';
import { UserInfo } from '../services/userinfo.service.js';

const userInfoHandler = RouterBuilder.handler(apiSpec, 'UserInfo', (request, security) =>
  Effect.gen(function* () {
    const { getUserInfo } = yield* UserInfo;

    const response = yield* getUserInfo(security, {});

    return response;
  }),
);

export { userInfoHandler };
