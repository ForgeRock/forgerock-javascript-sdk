import { Schema } from '@effect/schema';
import { Array, Effect, Option, pipe } from 'effect';
import {
  PingOneCustomHtmlRequestBody,
  PingOneRequestQuery,
} from '../../schemas/customHtmlTemplate/requests';
import { ResponseMapKeys, responseMap } from '../../responses';
import { UnableToFindNextStep } from '../../errors';
import { DavinciAuthorizeHeaders, DavinciAuthorizeQuery } from '../../schemas/authorize';
import { validator } from '../../helpers/match';
import { getElementFromCookie } from '../../helpers/cookie';

type DavinciFormData = Schema.Schema.Type<
  typeof PingOneCustomHtmlRequestBody
>['parameters']['data'];

/**
 * Given data in the shape of Ping's Request formData.value
 * We will dive into the object by accessing `formData`
 * And then `value` off the object.
 *
 */
const mapDataToValue = (data: Option.Option<DavinciFormData>) =>
  pipe(
    data,
    Option.map((data) => data.formData),
    Option.map((data) => data.value),
  );

type QueryTypes =
  | Schema.Schema.Type<typeof DavinciAuthorizeQuery>
  | Schema.Schema.Type<typeof PingOneRequestQuery>;

const getArrayFromResponseMap = (query: QueryTypes) =>
  Effect.succeed(responseMap[query.acr_values as ResponseMapKeys]);
/**
 * A helper function that will use `acr_values` from query object
 * to grab the array from the `responseMap`.
 */
const getNextStep = (bool: boolean, query: QueryTypes) =>
  Effect.if(bool, {
    onTrue: () => getArrayFromResponseMap(query),
    onFalse: () => Effect.fail(new UnableToFindNextStep()),
  });

/**
 * Get the first element in the responseMap
 */
const getFirstElement = (arr: (typeof responseMap)[ResponseMapKeys]) =>
  Effect.succeed(pipe(Array.headNonEmpty(arr)));

/**
 * Gets the first element from the responseMap
 * And then creates a basic HttpResponse object that
 * will succeed
 *
 */
const getFirstElementAndRespond = (query: QueryTypes) =>
  pipe(
    Option.fromNullable(query.acr_values),
    Option.map((acr) => responseMap[acr as ResponseMapKeys]),
    Effect.flatMap(getFirstElement),
    Effect.map((body) => ({
      status: 200 as const,
      body,
    })),
  );

type D = Option.Option<
  Schema.Schema.Type<typeof PingOneCustomHtmlRequestBody>['parameters']['data']
>;
type H = Schema.Schema.Type<typeof DavinciAuthorizeHeaders>;

type Q =
  | Schema.Schema.Type<typeof DavinciAuthorizeQuery>
  | Schema.Schema.Type<typeof PingOneRequestQuery>;

const validateRequest = Effect.flatMap(validator);

const validateAndReturnNext = (data: D, headers: H, query: Q) =>
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
    validateRequest,
    /*
     * If we have a true result, that means we have validated our response
     * And we can try to get the next step from our journeyMap
     * getNextStep will get the array from the acr_values in our journey map
     * We then need to parse the cookie header of `stepIndex` to see what is the next step
     */
    Effect.flatMap((bool) => getNextStep(bool, query)),
    Effect.andThen((arr) => getElementFromCookie(arr, headers)),
    /**
     * We have retrieved the next step in our flow / journey.
     * At this stage we are going to form a response body like
     * the fetch call would in a Live server.
     */
    Effect.andThen((body) => ({
      status: 200 as const,
      body,
    })),
  );

export {
  getNextStep,
  getFirstElementAndRespond,
  getArrayFromResponseMap,
  mapDataToValue,
  validateAndReturnNext,
};
