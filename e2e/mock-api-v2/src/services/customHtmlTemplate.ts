import { Context, Effect, Option, pipe } from 'effect';
import { Schema } from '@effect/schema';
import { Request } from './request';
import { PingOneCustomHtmlResponseBody } from '../schemas/customHtmlTemplate/responses';
import { HttpError } from 'effect-http';
import { validator } from '../helpers/match';
import { PingOneCustomHtmlRequestBody } from '../schemas/customHtmlTemplate/requests';
import { SuccessResponseRedirect } from '../schemas/returnSuccessResponseRedirect';

type CustomHtmlResponseBody =
  | Schema.Schema.Type<typeof PingOneCustomHtmlResponseBody>
  | Schema.Schema.Type<typeof SuccessResponseRedirect>;
type CustomHtmlRequestBody = Schema.Schema.Type<typeof PingOneCustomHtmlRequestBody>;

const live = <Headers, Query>(
  headers: Headers,
  query: Query,
  body: CustomHtmlRequestBody,
): Effect.Effect<CustomHtmlResponseBody, HttpError.HttpError, Request> =>
  Effect.gen(function* () {
    const { post } = yield* Request;

    const response = yield* post<typeof headers, typeof query, typeof body, CustomHtmlResponseBody>(
      '/customHtmlTemplate',
      { headers, query, body },
    );

    return response;
  });

const mock = <Headers, Query>(
  headers: Headers,
  query: Query,
  body: CustomHtmlRequestBody,
): Effect.Effect<CustomHtmlResponseBody, HttpError.HttpError, Request> =>
  Effect.gen(function* () {
    const { post } = yield* Request;

    const data = Option.fromNullable(body?.parameters.data);

    const bool = yield* pipe(
      data,
      Option.map((data) => data.formData),
      Option.map((data) => data.value),
      Effect.flatMap((data) => validator(data)),
      Effect.catchTags({
        NoSuchElementException: () => HttpError.unauthorizedError('could not find the element'),
        InvalidProtectNode: () =>
          HttpError.unauthorizedError('invalid protect node, did not pass validation'),
        InvalidUsernamePassword: () =>
          HttpError.unauthorizedError('invalid username or password, did not pass validation'),
      }),
    );

    if (!bool) {
      yield* Effect.fail(HttpError.unauthorizedError('unable to validate response'));
    }
    const response = yield* post<typeof headers, typeof query, typeof body, CustomHtmlResponseBody>(
      '/customHtmlTemplate',
      { headers, query, body },
    );

    return response;
  });

class CustomHtmlTemplate extends Context.Tag('@services/CustomHtmlTemplate')<
  CustomHtmlTemplate,
  { handleCustomHtmlTemplate: typeof live }
>() {}

const mockCustomHtmlTemplate = CustomHtmlTemplate.of({
  handleCustomHtmlTemplate: mock,
});

const liveCustomHtmlTemplate = CustomHtmlTemplate.of({
  handleCustomHtmlTemplate: live,
});
export { CustomHtmlTemplate, mockCustomHtmlTemplate, liveCustomHtmlTemplate };
