import { Effect, Context, pipe } from 'effect';
import { HttpError } from 'effect-http';
import { getNextStep } from './fetch-test';
import { getElementFromCookie } from '../helpers/cookie';

type Init<Headers, Query, Body = null> = {
  headers: Headers;
  query: Query;
  body?: Body;
};
const liveGet = <Body>(route, init): Effect.Effect<Body, HttpError.HttpError, never> =>
  Effect.tryPromise({
    try: (signal) => fetch(route, { signal, method: 'GET', ...init }),
    catch: (err) => HttpError.unauthorizedError(`failure to fetch ${route}: \n ${err}`),
  }).pipe(
    Effect.tryMapPromise<Response, Body, HttpError.HttpError>({
      try: (response) => response.json(),
      catch: () => HttpError.internalHttpError('failure to parse response body'),
    }),
  );

const livePost = <Query, Headers, RequestBody = any, ResponseBody = any>(
  route,
  init: Init<Query, Headers, RequestBody>,
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
        HttpError.internalHttpError(`failure to make response from Post request to: ${route}`),
    }),
  );

const mockGet = <Headers, Query, ResponseBody>(
  route,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init: Init<Headers, Query, Body>,
): Effect.Effect<ResponseBody, HttpError.HttpError, never> =>
  Effect.tryPromise({
    try: () => Promise.resolve({}) as unknown as PromiseLike<ResponseBody>,
    catch: () => HttpError.unauthorizedError(`failure to fetch ${route}:`),
  });

const mockPost = <Headers, Query, Body, ResponseBody>(
  route,
  { headers, query }: Init<Headers, Query, Body>,
): Effect.Effect<ResponseBody, HttpError.HttpError, never> =>
  pipe(
    getNextStep(true, query as any),
    Effect.andThen((arr) => getElementFromCookie(arr, headers as any)),
  ) as unknown as Effect.Effect<ResponseBody, HttpError.HttpError, never>;

class Request extends Context.Tag('@services/request')<
  Request,
  { get: typeof mockGet; post: typeof mockPost }
>() {}

const mockRequest = Request.of({
  get: mockGet,
  post: mockPost,
});

const liveRequest = Request.of({
  get: liveGet,
  post: livePost,
});
export { Request, mockRequest, liveRequest };
