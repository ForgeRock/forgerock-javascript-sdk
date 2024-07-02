import { Effect } from 'effect';
import { RouterBuilder } from 'effect-http';
import { apiSpec } from '../spec';
import { CookieService } from '../repository/Cookie';
import { toCookieHeader } from '@effect/platform/Cookies';
import { FetchRepository } from '../repository/fetch';

const authorizeHandler = RouterBuilder.handler(apiSpec, 'DavinciAuthorize', ({ headers, query }) =>
  Effect.gen(function* () {
    const { get } = yield* FetchRepository;

    /**
     * Forward our request to AS
     */
    const response = yield* get('/authorize', {
      headers,
      query,
    });

    const { writeCookie } = yield* CookieService;
    /**
     * Write our cookies to send to the client
     */
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
