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

import { TokenResponseBody } from '../schemas/token/token.schema.js';

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
