import { Schema } from '@effect/schema';
import { pipe } from 'effect';
import { Api, ApiResponse } from 'effect-http';

import {
  DavinciAuthorizeHeaders,
  DavinciAuthorizeResponseHeaders,
} from '../schemas/authorize.schema';
import {
  PingOneCustomHtmlRequestBody,
  PingOneRequestQuery,
} from '../schemas/custom-html-template/custom-html-template-request.schema';
import {
  PingOneCustomHtmlResponseBody,
  PingOneCustomHtmlResponseErrorBody,
  PingOnePathParams,
} from '../schemas/custom-html-template/custom-html-template-response.schema';
import { SuccessResponseRedirect } from '../schemas/return-success-response-redirect.schema';

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
    ),
  ),
);

export { customHtmlEndPoint };
