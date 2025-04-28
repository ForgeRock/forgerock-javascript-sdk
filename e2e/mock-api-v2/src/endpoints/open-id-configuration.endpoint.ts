/**
 *
 * Copyright (c) 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import { Schema } from '@effect/schema';
import { pipe } from 'effect';
import { Api } from 'effect-http';
import { openIdConfigurationResponseSchema } from '../schemas/open-id-configuration/open-id-configuration-response.schema.js';

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
