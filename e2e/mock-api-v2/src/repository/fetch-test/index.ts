import { Schema } from '@effect/schema';
import { Array, Effect, Option, pipe } from 'effect';
import {
  PingOneCustomHtmlRequestBody,
  PingOneRequestQuery,
} from '../../schemas/customHtmlTemplate/requests';
import { ResponseMapKeys, responseMap } from '../../responses';
import { FetchError, UnableToFindNextStep } from '../../errors';
import { DavinciAuthorizeHeaders, DavinciAuthorizeQuery } from '../../schemas/authorize';

type DavinciFormData = Schema.Schema.Type<
  typeof PingOneCustomHtmlRequestBody
>['parameters']['data'];

const mapDataToValue = (data: Option.Option<DavinciFormData>) =>
  pipe(
    data,
    Option.map((data) => data.formData),
    Option.map((data) => data.value),
  );

type QueryTypes =
  | Schema.Schema.Type<typeof DavinciAuthorizeQuery>
  | Schema.Schema.Type<typeof PingOneRequestQuery>;

const getNextStep = (bool: boolean, query: QueryTypes) =>
  Effect.if(bool, {
    onTrue: () => Effect.succeed(responseMap[query.acr_values as ResponseMapKeys]), // get the array
    onFalse: () => Effect.fail(new UnableToFindNextStep()),
  });

const getFirstElement = (arr: (typeof responseMap)[ResponseMapKeys]) =>
  Effect.succeed(
    pipe(
      Array.head(arr),
      Option.getOrThrowWith(() => Effect.fail(new FetchError())),
    ),
  );

const getFirstElementAndRespond = (query: QueryTypes) =>
  pipe(
    responseMap[query.acr_values as ResponseMapKeys],
    getFirstElement,
    Effect.map((body) => ({
      status: 200 as const,
      body,
    })),
  );

export { getNextStep, getFirstElementAndRespond, mapDataToValue };
