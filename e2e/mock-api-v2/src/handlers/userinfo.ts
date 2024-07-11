import { Effect } from 'effect';
import { RouterBuilder } from 'effect-http';
import { apiSpec } from '../spec';
import { UserInfo } from '../services/userinfo';

const userInfoHandler = RouterBuilder.handler(apiSpec, 'UserInfo', (request, security) =>
  Effect.gen(function* () {
    const { getUserInfo } = yield* UserInfo;

    const response = yield* getUserInfo(security, {});

    return response;
  }),
);

export { userInfoHandler };
