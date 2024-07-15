import { Effect, Context, pipe, Layer } from 'effect';
import { HttpError } from 'effect-http';

import { getElementFromCookie } from '../helpers/cookie';
import { getNextStep } from './mock-env-helpers';

import { HeaderTypes, QueryTypes } from '../types';

type Init<Headers extends HeaderTypes, Query extends QueryTypes, Body = null> = {
  headers: Headers;
  query: Query;
  body?: Body;
};
const liveGet = <Body>(route, init): Effect.Effect<Body, HttpError.HttpError, never> =>
  Effect.tryPromise({
    try: (signal) => fetch(route, { signal, method: 'GET', ...init }),
    catch: (err) => HttpError.unauthorized(`failure to fetch ${route}: \n ${err}`),
  }).pipe(
    Effect.tryMapPromise<Response, Body, HttpError.HttpError>({
      try: (response) => response.json(),
      catch: () => HttpError.internalServerError('failure to parse response body'),
    }),
  );

const livePost = <
  Query extends QueryTypes,
  Headers extends HeaderTypes,
  RequestBody = any,
  ResponseBody = any,
>(
  route,
  init: Init<Headers, Query, RequestBody>,
): Effect.Effect<ResponseBody, HttpError.HttpError, never> =>
  Effect.tryPromise({
    try: (signal) =>
      fetch(route, {
        signal,
        method: 'POST',
        body: JSON.stringify(init.body),
        headers: init.headers,
      } as RequestInit),
    catch: () => HttpError.badRequest(`failure to post to route: ${route}`),
  }).pipe(
    Effect.tryMapPromise<Response, ResponseBody, HttpError.HttpError>({
      try: (response) => response.json(),
      catch: () =>
        HttpError.internalServerError(`failure to make response from Post request to: ${route}`),
    }),
  );

function mockGet<Headers extends HeaderTypes, Query extends QueryTypes, ResponseBody>(
  route,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init: Init<Headers, Query, Body>,
): Effect.Effect<ResponseBody, HttpError.HttpError, never> {
  return Effect.tryPromise({
    try: () => Promise.resolve({}) as unknown as PromiseLike<ResponseBody>,
    catch: () => HttpError.internalServerError(`failure to fetch ${route}:`),
  });
}

function mockPost<Headers extends HeaderTypes, Query extends QueryTypes, Body, ResponseBody>(
  route,
  { headers, query }: Init<Headers, Query, Body>,
): Effect.Effect<ResponseBody, HttpError.HttpError, never> {
  return pipe(
    getNextStep(true, query),
    Effect.andThen((arr) => getElementFromCookie(arr, headers)),
  ) as unknown as Effect.Effect<ResponseBody, HttpError.HttpError, never>;
}
class Request extends Context.Tag('@services/request')<
  Request,
  { get: typeof mockGet; post: typeof mockPost }
>() {}

const mockRequest = Layer.succeed(Request, {
  get: mockGet,
  post: mockPost,
});

const liveRequest = Layer.succeed(Request, {
  get: liveGet,
  post: livePost,
});
export { Request, mockRequest, liveRequest };
