import { Context, Effect, Layer } from 'effect';
import { HttpError } from 'effect-http';
import { Request } from './request.service.js';

import {
  CustomHtmlRequestBody,
  CustomHtmlResponseBody,
  HeaderTypes,
  QueryTypes,
} from '../types/index.js';
import { validateCustomHtmlRequest } from './mock-env-helpers/index.js';

class CustomHtmlTemplate extends Context.Tag('@services/CustomHtmlTemplate')<
  CustomHtmlTemplate,
  {
    handleCustomHtmlTemplate: <Headers extends HeaderTypes, Query extends QueryTypes>(
      headers: Headers,
      query: Query,
      body: CustomHtmlRequestBody,
    ) => Effect.Effect<CustomHtmlResponseBody, HttpError.HttpError, never>;
  }
>() {}

const mockCustomHtmlTemplate = Layer.effect(
  CustomHtmlTemplate,
  Effect.gen(function* () {
    const { post } = yield* Request;
    return {
      handleCustomHtmlTemplate: (headers, query, body) =>
        Effect.gen(function* () {
          yield* validateCustomHtmlRequest(body).pipe(
            Effect.catchTags({
              NoSuchElementException: () => HttpError.notFound('could not find the element'),
              InvalidProtectNode: () =>
                HttpError.unauthorized('invalid protect node, did not pass validation'),
              InvalidUsernamePassword: () =>
                HttpError.unauthorized('invalid username or password, did not pass validation'),
            }),
          );

          const response = yield* post<
            typeof headers,
            typeof query,
            typeof body,
            CustomHtmlResponseBody
          >('/customHtmlTemplate', { headers, query, body });

          return response;
        }),
    };
  }),
);

const liveCustomHtmlTemplate = Layer.effect(
  CustomHtmlTemplate,
  Effect.gen(function* () {
    const { post } = yield* Request;
    return {
      handleCustomHtmlTemplate: (headers, query, body) =>
        Effect.gen(function* () {
          const response = yield* post<
            typeof headers,
            typeof query,
            typeof body,
            CustomHtmlResponseBody
          >('/customHtmlTemplate', { headers, query, body });

          return response;
        }),
    };
  }),
);
export {
  CustomHtmlTemplate,
  mockCustomHtmlTemplate,
  liveCustomHtmlTemplate,
  CustomHtmlResponseBody,
};
