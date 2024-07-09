import { Effect } from 'effect';
import { RouterBuilder } from 'effect-http';
import { apiSpec } from '../spec';
import { Fetch } from '../services/fetch';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userInfoHandler = RouterBuilder.handler(apiSpec, 'UserInfo', (request, security) =>
  Effect.gen(function* () {
    const { get } = yield* Fetch;

    /**
     * This should realistically pass the bearer token
     * which is what `security` (second argument to the callback fn)
     */
    const response = yield* get('/userinfo', {} as any);

    return response;
  }),
);

export { userInfoHandler };
