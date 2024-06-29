import { Effect } from 'effect';
import { RouterBuilder } from 'effect-http';
import { apiSpec } from '../spec';
import { FetchRepository } from '../repository/fetch';
import { CookieService } from '../repository/Cookie';
import { toCookieHeader } from '@effect/platform/Cookies';

const customHtmlHandler = RouterBuilder.handler(
  apiSpec,
  'PingOneCustomHtml',
  ({ headers, query, body }) =>
    Effect.gen(function* () {
      const { post } = yield* FetchRepository;
      const response = yield* post('/customHtmlTemplate', { headers, query, body });

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

export { customHtmlHandler };
