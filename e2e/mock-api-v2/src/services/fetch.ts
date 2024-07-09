import { Option, pipe, Context, Effect, Match } from 'effect';
import { Schema } from '@effect/schema';
import { errorMap } from '../responses';
import { DavinciAuthorizeHeaders, DavinciAuthorizeQuery } from '../schemas/authorize';
import { FetchError } from '../errors';
import { parseCookieHeaderForIndex } from '../helpers/cookie';
import {
  PingOneCustomHtmlRequestBody,
  PingOneRequestQuery,
} from '../schemas/customHtmlTemplate/requests';
import { HttpError } from 'effect-http';
import { getFirstElementAndRespond, validateAndReturnNext } from './fetch-test';
import type { Routes } from '../helpers/routeTypes';
import { userInfoResponse } from '../responses/userinfo/userinfo';
import { tokenResponseBody } from '../responses/token/token';

type Init<T = null> = {
  headers: Schema.Schema.Type<typeof DavinciAuthorizeHeaders>;
  query:
    | Schema.Schema.Type<typeof DavinciAuthorizeQuery>
    | Schema.Schema.Type<typeof PingOneRequestQuery>;
  body?: T;
};
/**
 * We define a fetch service here
 * the fetch service is a mimic of what the Authorization Server may
 * do, so we need to validate responses, and then return the proper next step
 */
interface Fetch {
  post: typeof postTest;
  get: typeof getTest;
}

const postTest = (
  route: Routes,
  { body, query, headers }: Init<Schema.Schema.Type<typeof PingOneCustomHtmlRequestBody>>,
) => {
  return pipe(
    Option.fromNullable(body?.parameters.data),
    (data) =>
      pipe(headers, parseCookieHeaderForIndex, (option) => {
        return Effect.if(Option.isSome(option), {
          onTrue: () => validateAndReturnNext(data, headers, query),
          /**
           * We have no cookie header to parse,
           * so we use the acr_values header to get the first element in
           * The journeyMap array
           */
          onFalse: () => getFirstElementAndRespond(query),
        });
      }),
    /**
     * Here is where we handle errors
     * When you create a new error, its important to handle that error
     * We want to respond to the client with whatever the error is
     * So we use the HttpError module to respond back with the type of error
     * and the body of the error we need to respond with
     */
    Effect.catchTags({
      NoSuchElementException: () => HttpError.unauthorizedError('No Such Element'),
      InvalidProtectNode: () => HttpError.unauthorizedError('Error submitting Protect node'),
      InvalidUsernamePassword: (err) => HttpError.unauthorizedError(errorMap[err._tag]),
      UnableToFindNextStep: () =>
        HttpError.unauthorizedError('Unable to find the next step in the journey'),
    }),
  );
};

/**
 * The `get` function implementation for `test`
 *
 */
const getTest = <T extends keyof typeof mappedResponses>(route: T, init: Init) => {
  /**
   * This object is helpful for narrowing the returning acr_values
   * from the route passed in.
   *
   * when we call `get` from the service, the function result is narrowed
   * based on the url we pass in.
   *
   * The values of each key are functions to prevent an eager evaluation
   */
  const mappedResponses = {
    '/authorize': () => pipe(init['query'], getFirstElementAndRespond),
    '/userinfo': () => Effect.succeed(userInfoResponse),
    '/tokens': () => Effect.succeed(tokenResponseBody),
  } as const;

  return Match.type<Routes>().pipe(
    Match.when('/authorize', () => mappedResponses['/authorize']),
    Match.when('/userinfo', () => mappedResponses['/userinfo']),
    Match.when('/tokens', () => mappedResponses['/tokens']),
    Match.exhaustive,
  )(route)() as ReturnType<(typeof mappedResponses)[T]>;
};

const Fetch = Context.GenericTag<Fetch>('fetch');

const fetchTest = Fetch.of({
  post: postTest,
  get: getTest,
});

export { fetchTest, Fetch, FetchError };
