import { Schema } from '@effect/schema';
import { Context, Effect, Layer } from 'effect';
import { HttpError } from 'effect-http';

import { Request } from './request.service';
import { tokenResponseBody } from '../responses/token/token';
import { TokenResponseBody } from '../schemas/token/token.schema';

import { HeaderTypes, QueryTypes } from '../types';

type TokensResponseBody = Schema.Schema.Type<typeof TokenResponseBody>;

class Tokens extends Context.Tag('@services/Tokens')<
  Tokens,
  {
    getTokens: <Headers extends HeaderTypes, Query extends QueryTypes>(
      headers: Headers,
      query: Query,
    ) => Effect.Effect<TokensResponseBody, HttpError.HttpError, never>;
  }
>() {}

const mockTokens = Layer.effect(
  Tokens,
  Effect.gen(function* () {
    const { get } = yield* Request;
    return {
      getTokens: (headers, query) =>
        Effect.gen(function* () {
          // throw away our get call in mock env;
          yield* get<typeof headers, typeof query, TokensResponseBody>('/tokens', {
            headers,
            query,
          });

          const response = yield* Effect.tryPromise({
            try: () => Promise.resolve(tokenResponseBody),
            catch: () => HttpError.unauthorizedError('unable to retrieve tokens'),
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
      getTokens: (headers, query) =>
        Effect.gen(function* () {
          return yield* get<typeof headers, typeof query, TokensResponseBody>('/tokens', {
            headers,
            query,
          });
        }),
    };
  }),
);

export { mockTokens, liveTokens, Tokens };
