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
import { Api, ApiResponse } from 'effect-http';

import {
  DavinciAuthorizeHeaders,
  DavinciAuthorizeResponseHeaders,
} from '../schemas/authorize.schema.js';
import {
  PingOneCustomHtmlRequestBody,
  PingOneRequestQuery,
} from '../schemas/custom-html-template/custom-html-template-request.schema.js';
import {
  PingOneCustomHtmlResponseBody,
  PingOneCustomHtmlResponseErrorBody,
  PingOnePathParams,
} from '../schemas/custom-html-template/custom-html-template-response.schema.js';
import { SuccessResponseRedirect } from '../schemas/return-success-response-redirect.schema.js';

const customHtmlEndPoint = Api.addEndpoint(
  pipe(
    Api.post(
      'PingOneCustomHtml',
      '/:envid/davinci/connections/:connectionid/capabilities/customHTMLTemplate',
    ).pipe(
      Api.setRequestPath(PingOnePathParams),
      Api.setRequestQuery(PingOneRequestQuery),
      Api.setRequestBody(PingOneCustomHtmlRequestBody),

      Api.setRequestHeaders(DavinciAuthorizeHeaders),

      Api.setResponseBody(Schema.Union(PingOneCustomHtmlResponseBody, SuccessResponseRedirect)),
      Api.setResponseHeaders(DavinciAuthorizeResponseHeaders),

      Api.addResponse(
        ApiResponse.make(401, Schema.Union(PingOneCustomHtmlResponseErrorBody, Schema.String)),
      ),
      Api.addResponse(ApiResponse.make(403, Schema.String)),
    ),
  ),
);

export { customHtmlEndPoint };
