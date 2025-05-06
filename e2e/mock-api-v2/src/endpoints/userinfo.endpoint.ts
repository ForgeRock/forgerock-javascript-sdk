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
import { Api, ApiResponse, Security } from 'effect-http';

import { UserInfoSchema } from '../schemas/userinfo/userinfo.schema.js';

const userInfo = Api.addEndpoint(
  pipe(
    Api.get('UserInfo', '/:envid/as/userinfo').pipe(
      Api.setRequestPath(Schema.Struct({ envid: Schema.String })),
      Api.setSecurity(Security.bearer({})),
      Api.setResponseStatus(200),
      Api.setResponseBody(UserInfoSchema),
      Api.addResponse(ApiResponse.make(401, Schema.String)),
    ),
  ),
);

export { userInfo };
