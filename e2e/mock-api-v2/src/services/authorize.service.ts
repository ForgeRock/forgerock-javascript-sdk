import { Schema } from '@effect/schema';
import { Context, Effect, Layer, pipe } from 'effect';
import { HttpError } from 'effect-http';

import { getFirstElementAndRespond } from './mock-env-helpers/index.js';
import { Request } from './request.service.js';
import { PingOneCustomHtmlResponseBody } from '../schemas/custom-html-template/custom-html-template-response.schema.js';

import { HeaderTypes, QueryTypes } from '../types/index.js';

type AuthorizeResponseBody = Schema.Schema.Type<typeof PingOneCustomHtmlResponseBody>;

class Authorize extends Context.Tag('@services/authorize')<
  Authorize,
  {
    handleAuthorize: <Headers extends HeaderTypes, Query extends QueryTypes>(
      headers: Headers,
      query: Query,
    ) => Effect.Effect<{ status: 200; body: AuthorizeResponseBody }, HttpError.HttpError, never>;
  }
>() {}

const authorizeMock = Layer.effect(
  Authorize,
  Effect.gen(function* () {
    const { get } = yield* Request;

    return {
      handleAuthorize: (headers, query) =>
        Effect.gen(function* () {
          /** in a mock env lets throw away this **/
          yield* get<typeof headers, typeof query, AuthorizeResponseBody>('/authorize', {
            headers,
            query,
          });

          return yield* pipe(
            query,
            getFirstElementAndRespond,
            Effect.catchTags({
              NoSuchElementException: (err) =>
                HttpError.notFound(`failure to get journey from map, ${err}`),
            }),
          );
        }),
    };
  }),
);

const authorizeLive = Layer.effect(
  Authorize,
  Effect.gen(function* () {
    const { get } = yield* Request;
    return {
      handleAuthorize: (headers, query) =>
        Effect.gen(function* () {
          const response = yield* get<typeof headers, typeof query, AuthorizeResponseBody>(
            '/authorize',
            {
              headers,
              query,
            },
          );

          return { status: 200 as const, body: response };
        }),
    };
  }),
);

export { Authorize, authorizeLive, authorizeMock };
