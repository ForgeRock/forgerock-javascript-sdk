import { Context, Effect } from 'effect';
import { Schema } from '@effect/schema';
import { tokenResponseBody } from '../responses/token/token';
import { HttpError } from 'effect-http';
import { Request } from './request';
import { TokenResponseBody } from '../schemas/token/token';

type TokensResponseBody = Schema.Schema.Type<typeof TokenResponseBody>;
const mock = <Headers, Query>(headers: Headers, query: Query) =>
  Effect.gen(function* () {
    const { get } = yield* Request;

    // throw away our get call in mock env;
    yield* get<typeof headers, typeof query, TokensResponseBody>('/tokens', { headers, query });

    const response = yield* Effect.tryPromise({
      try: () => Promise.resolve(tokenResponseBody),
      catch: () => HttpError.unauthorizedError('unable to retrieve tokens'),
    });
    return response;
  });

const live = <Headers, Query>(headers: Headers, query: Query) =>
  Effect.gen(function* () {
    const { get } = yield* Request;
    return yield* get<typeof headers, typeof query, TokensResponseBody>('/tokens', {
      headers,
      query,
    });
  });
class Tokens extends Context.Tag('@services/Tokens')<Tokens, { getTokens: typeof live }>() {}

const mockTokens = Tokens.of({
  getTokens: mock,
});

const liveTokens = Tokens.of({
  getTokens: live,
});
export { mockTokens, liveTokens, Tokens };
