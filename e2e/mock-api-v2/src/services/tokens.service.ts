/**
 *
 * Copyright (c) 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import { Schema } from '@effect/schema';
import { Context, Effect, Layer } from 'effect';
import { HttpError } from 'effect-http';

import { Request } from './request.service.js';
import { tokenResponseBody } from '../responses/token/token.js';
import { TokenResponseBody } from '../schemas/token/token.schema.js';

import { HeaderTypes } from '../types/index.js';

type TokensResponseBody = Schema.Schema.Type<typeof TokenResponseBody>;

class Tokens extends Context.Tag('@services/Tokens')<
  Tokens,
  {
    getTokens: <Headers extends HeaderTypes>(
      headers: Headers,
    ) => Effect.Effect<TokensResponseBody, HttpError.HttpError, never>;
  }
>() {}

const mockTokens = Layer.effect(
  Tokens,
  Effect.gen(function* () {
    const { get } = yield* Request;
    return {
      getTokens: (headers) =>
        Effect.gen(function* () {
          // throw away our get call in mock env;
          yield* get<typeof headers, null, TokensResponseBody>('/tokens', {
            headers,
            query: null,
          });

          const response = yield* Effect.tryPromise({
            try: () => Promise.resolve(tokenResponseBody),
            catch: () => HttpError.unauthorized('unable to retrieve tokens'),
          });
          return response;
        }),
    };
  }),
);

const liveTokens = Layer.effect(
  Tokens,
  Effect.gen(function* () {
    const { get } = yield* Request;
    return {
      getTokens: (headers) =>
        Effect.gen(function* () {
          return yield* get<typeof headers, null, TokensResponseBody>('/tokens', {
            headers,
            query: null,
          });
        }),
    };
  }),
);

export { mockTokens, liveTokens, Tokens };
