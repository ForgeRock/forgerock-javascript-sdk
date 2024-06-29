import { Option, pipe, Context, Effect } from 'effect';
import { Schema } from '@effect/schema';
import { errorMap } from '../responses';
import { DavinciAuthorizeHeaders, DavinciAuthorizeQuery } from '../schemas/authorize';
import { FetchError } from '../errors';
import { getElementFromCookie, parseCookieHeaderForIndex } from '../helpers/cookie';
import { validator } from '../helpers/match';
import {
  PingOneCustomHtmlRequestBody,
  PingOneRequestQuery,
} from '../schemas/customHtmlTemplate/requests';
import { PingOneCustomHtmlResponseBody } from '../schemas/customHtmlTemplate/responses';
import { NoSuchElementException } from 'effect/Cause';
import { HttpError } from 'effect-http';
import { getFirstElementAndRespond, getNextStep, mapDataToValue } from './fetch-test';

type PostSuccessResponse = {
  status: 200;
  body: Schema.Schema.Type<typeof PingOneCustomHtmlResponseBody>;
};

type GetSuccessResponse = null;

/**
 * We define a fetch service here
 * the fetch service is a mimic of what the Authorization Server may
 * do, so we need to validate responses, and then return the proper next step
 */
interface FetchRepository {
  post: (
    route: string,
    init: {
      headers: Schema.Schema.Type<typeof DavinciAuthorizeHeaders>;
      query:
        | Schema.Schema.Type<typeof DavinciAuthorizeQuery>
        | Schema.Schema.Type<typeof PingOneRequestQuery>;
      body?: Schema.Schema.Type<typeof PingOneCustomHtmlRequestBody>;
    },
  ) => Effect.Effect<PostSuccessResponse, HttpError.HttpError | NoSuchElementException, never>;

  get: (
    route: string,
    headers: HeadersInit,
  ) => Effect.Effect<GetSuccessResponse, FetchError, never>;
}

const FetchRepository = Context.GenericTag<FetchRepository>('fetch');

const fn = (
  data: Option.Option<
    Schema.Schema.Type<typeof PingOneCustomHtmlRequestBody>['parameters']['data']
  >,
  headers: Schema.Schema.Type<typeof DavinciAuthorizeHeaders>,
  query:
    | Schema.Schema.Type<typeof DavinciAuthorizeQuery>
    | Schema.Schema.Type<typeof PingOneRequestQuery>,
) =>
  pipe(
    headers, // start with headers passed in
    parseCookieHeaderForIndex, // then parse them for the index
    (option) => {
      return Effect.if(Option.isSome(option), {
        // if we have a Some type, that means we have an existing cookie
        onTrue: () =>
          pipe(
            data,

            /**
             * This performs a `map` on the `Option` type
             * and just tries to dive deeper into the object
             * to get to formData.value so we can validate
             * the submitted data
             *
             */
            mapDataToValue,
            /**
             * Validate the response with our validator function
             **/
            Effect.flatMap(validator),
            /*
             * If we have a true result, that means we have validated our response
             * And we can try to get the next step from our journeyMap
             * getNextStep will get the array from the acr_values in our journey map
             * We then need to parse the cookie header of `stepIndex` to see what is the next step
             */
            Effect.flatMap((bool) => getNextStep(bool, query)),
            Effect.map((arr) => getElementFromCookie(arr, headers)),
            /**
             * We have retrieved the next step in our flow / journey.
             * At this stage we are going to form a response body like
             * the fetch call would in a Live server.
             */
            Effect.andThen((body) => ({
              status: 200 as const,
              body,
            })),
          ),
        /**
         * We have no cookie header to parse,
         * so we use the acr_values header to get the first element in
         * The journeyMap array
         */
        onFalse: () => getFirstElementAndRespond(query),
      });
    },
  );

const fetchTest = FetchRepository.of({
  post: (_route, { body, query, headers }) => {
    return pipe(
      Option.fromNullable(body?.parameters.data),
      (option) => fn(option, headers, query),

      /**
       * Here is where we handle errors
       * When you create a new error, its important to handle that error
       * We want to respond to the client with whatever the error is
       * So we use the HttpError module to respond back with the type of error
       * and the body of the error we need to respond with
       */
      Effect.catchTags({
        NoSuchElementException: () =>
          HttpError.unauthorizedError(errorMap['InvalidUsernamePassword']),
        InvalidProtectNode: () => HttpError.unauthorizedError(errorMap['InvalidUsernamePassword']),
        InvalidUsernamePassword: (err) => HttpError.unauthorizedError(errorMap[err._tag]),
        UnableToFindNextStep: () =>
          HttpError.unauthorizedError(errorMap['InvalidUsernamePassword']),
      }),
    );
  },
  // Implement when needed
  get: () => Effect.succeed(null),
});

export { fetchTest, FetchRepository, FetchError };
