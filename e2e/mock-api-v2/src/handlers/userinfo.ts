import { Effect } from 'effect';
import { RouterBuilder } from 'effect-http';
import { apiSpec } from '../spec';
import { Userinfo } from '../repository/userinfo';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userInfoHandler = RouterBuilder.handler(apiSpec, 'UserInfo', (request, security) =>
  Effect.gen(function* () {
    const { getUserInfo } = yield* Userinfo;

    /**
     * This should realistically pass the bearer token
     * which is what `security` (second argument to the callback fn)
     */
    const response = yield* getUserInfo('/userinfo');

    return response;
  }),
);

export { userInfoHandler };
