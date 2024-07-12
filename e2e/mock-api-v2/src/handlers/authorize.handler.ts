import { toCookieHeader } from '@effect/platform/Cookies';
import { Effect } from 'effect';
import { RouterBuilder } from 'effect-http';

import { Authorize } from '../services/authorize.service';
import { CookieService } from '../services/cookie.service';
import { apiSpec } from '../spec';

const authorizeHandler = RouterBuilder.handler(apiSpec, 'DavinciAuthorize', ({ headers, query }) =>
  Effect.gen(function* () {
    const { handleAuthorize } = yield* Authorize;

    /**
     * Forward our request to AS
     */
    const response = yield* handleAuthorize(headers, query);

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
