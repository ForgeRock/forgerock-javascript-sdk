import { Schema } from '@effect/schema';
import { pipe } from 'effect';
import { Api } from 'effect-http';
import { openIdConfigurationResponseSchema } from '../schemas/open-id-configuration/open-id-configuration-response.schema';

const openidConfiguration = Api.addEndpoint(
  pipe(
    Api.get('openidConfiguration', '/:envid/as/.well-known/openid-configuration').pipe(
      Api.setRequestPath(Schema.Struct({ envid: Schema.String })),
      Api.setResponseBody(openIdConfigurationResponseSchema),
      Api.setResponseStatus(200),
    ),
  ),
);

export { openidConfiguration };
