/**
 *
 * Copyright (c) 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import { toCookieHeader } from '@effect/platform/Cookies';
import { Effect } from 'effect';
import { RouterBuilder } from 'effect-http';

import { CookieService } from '../services/cookie.service.js';
import { CustomHtmlTemplate } from '../services/custom-html-template.service.js';
import { apiSpec } from '../spec.js';

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
