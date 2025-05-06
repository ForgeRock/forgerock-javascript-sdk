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

import {
  AuthorizePath,
  DavinciAuthorizeHeaders,
  DavinciAuthorizeQuery,
  DavinciAuthorizeResponseHeaders,
} from '../schemas/authorize.schema.js';
import { PingOneCustomHtmlResponseBody } from '../schemas/custom-html-template/custom-html-template-response.schema.js';
import { SuccessResponseRedirect } from '../schemas/return-success-response-redirect.schema.js';

const davinciAuthorize = Api.addEndpoint(
  pipe(
    Api.get('DavinciAuthorize', '/:envid/as/authorize').pipe(
      Api.setRequestPath(AuthorizePath),
      Api.setRequestQuery(DavinciAuthorizeQuery),
      Api.setRequestHeaders(DavinciAuthorizeHeaders),
    ),

    Api.setResponseBody(Schema.Union(PingOneCustomHtmlResponseBody, SuccessResponseRedirect)),
    Api.setResponseHeaders(DavinciAuthorizeResponseHeaders),
    Api.setResponseStatus(200),
  ),
);

export { davinciAuthorize };
