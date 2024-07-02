import { Schema } from '@effect/schema';
import { pipe } from 'effect';
import { Api } from 'effect-http';
import { TokenResponseBody } from '../schemas/token/token';

const pingOneToken = Api.addEndpoint(
  pipe(
    Api.post('PingOneToken', '/:envid/as/token').pipe(
      Api.setRequestPath(Schema.Struct({ envid: Schema.String })),
      Api.setRequestBody(Api.FormData),

      // Responses
      Api.setResponseBody(TokenResponseBody),
      Api.setResponseStatus(200),
    ),
  ),
);

export { pingOneToken };
