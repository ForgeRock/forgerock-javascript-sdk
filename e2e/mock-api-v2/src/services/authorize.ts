import { Context, Effect, pipe } from 'effect';
import { Schema } from '@effect/schema';
import { Request } from './request';
import { getFirstElementAndRespond } from './fetch-test';
import { HttpError } from 'effect-http';
import { PingOneCustomHtmlResponseBody } from '../schemas/customHtmlTemplate/responses';

type AuthorizeResponseBody = Schema.Schema.Type<typeof PingOneCustomHtmlResponseBody>;

const mock = <Headers, Query>(
  headers: Headers,
  query: Query,
): Effect.Effect<{ status: 200; body: AuthorizeResponseBody }, HttpError.HttpError, Request> =>
  Effect.gen(function* () {
    const { get } = yield* Request;

    /** in a mock env lets throw away this **/
    yield* get<typeof headers, typeof query, AuthorizeResponseBody>('/authorize', {
      headers,
      query,
    });

    return yield* pipe(
      query as any, // fix this later, to match querytypes type
      getFirstElementAndRespond,
      Effect.catchTags({
        NoSuchElementException: (err) =>
          HttpError.internalHttpError(`failure to get journey from map, ${err}`),
      }),
    );
  });

const live = <Headers, Query>(
  headers: Headers,
  query: Query,
): Effect.Effect<{ status: 200; body: AuthorizeResponseBody }, HttpError.HttpError, Request> =>
  Effect.gen(function* () {
    const { get } = yield* Request;

    const response = yield* get<typeof headers, typeof query, AuthorizeResponseBody>('/authorize', {
      headers,
      query,
    });

    return { status: 200 as const, body: response };
  });

class Authorize extends Context.Tag('@services/authorize')<
  Authorize,
  { handleAuthorize: typeof live }
>() {}

const authorizeMock = Authorize.of({
  handleAuthorize: mock,
});

const authorizeLive = Authorize.of({
  handleAuthorize: live,
});
export { Authorize, authorizeLive, authorizeMock };
