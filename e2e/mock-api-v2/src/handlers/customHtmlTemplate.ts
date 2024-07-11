import { Effect } from 'effect';
import { RouterBuilder } from 'effect-http';
import { apiSpec } from '../spec';
import { CookieService } from '../services/Cookie';
import { toCookieHeader } from '@effect/platform/Cookies';
import { CustomHtmlTemplate } from '../services/customHtmlTemplate';

const customHtmlHandler = RouterBuilder.handler(
  apiSpec,
  'PingOneCustomHtml',
  ({ headers, query, body }) =>
    Effect.gen(function* () {
      const { handleCustomHtmlTemplate } = yield* CustomHtmlTemplate;
      const response = yield* handleCustomHtmlTemplate<typeof headers, typeof query>(
        headers,
        query,
        body,
      );

      const { writeCookie } = yield* CookieService;

      const cookie = yield* writeCookie(headers, response.interactionToken);

      return {
        status: 200 as const,
        body: response,
        headers: {
          'Set-Cookie': toCookieHeader(cookie),
        },
      };
    }),
);

export { customHtmlHandler };
