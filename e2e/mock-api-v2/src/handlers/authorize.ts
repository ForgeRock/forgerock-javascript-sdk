import { Effect } from 'effect';
import { RouterBuilder } from 'effect-http';
import { apiSpec } from '../spec';
import { CookieService } from '../repository/Cookie';
import { toCookieHeader } from '@effect/platform/Cookies';
import { FetchRepository } from '../repository/fetch';

const authorizeHandler = RouterBuilder.handler(apiSpec, 'DavinciAuthorize', ({ headers, query }) =>
  Effect.gen(function* () {
    /**
     * `handleQuery` validates that the query params passed in are good
     * it returns a `Option` type that is `Some` if a query is ok!
     */
    const { post } = yield* FetchRepository;
    const response = yield* post('/authorize/route', { headers, query });

    const { writeCookie } = yield* CookieService;

    const cookie = yield* writeCookie(headers);
    return {
      ...response,
      headers: {
        'Set-Cookie': toCookieHeader(cookie),
      },
    };
  }),
);

export { authorizeHandler };
