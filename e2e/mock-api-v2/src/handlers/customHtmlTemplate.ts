import { Effect } from 'effect';
import { RouterBuilder } from 'effect-http';
import { apiSpec } from '../spec';
import { Fetch } from '../services/fetch';
import { CookieService } from '../services/Cookie';
import { toCookieHeader } from '@effect/platform/Cookies';

const customHtmlHandler = RouterBuilder.handler(
  apiSpec,
  'PingOneCustomHtml',
  ({ headers, query, body }) =>
    Effect.gen(function* () {
      const { post } = yield* Fetch;
      const response = yield* post('/customHtmlTemplate', { headers, query, body });

      const { writeCookie } = yield* CookieService;
      if (response.body.capabilityName === 'returnSuccessResponseRedirect') {
        const cookie = yield* writeCookie(headers, response.body.interactionToken);
        return {
          ...response,
          headers: {
            'Set-Cookie': toCookieHeader(cookie),
          },
        };
      }
      const cookie = yield* writeCookie(headers);

      return {
        ...response,
        headers: {
          'Set-Cookie': toCookieHeader(cookie),
        },
      };
    }),
);

export { customHtmlHandler };
