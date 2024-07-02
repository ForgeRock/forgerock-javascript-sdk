import { pipe } from 'effect';
import { Api, ApiResponse } from 'effect-http';
import {
  PingOneCustomHtmlResponseBody,
  PingOneCustomHtmlResponseErrorBody,
  PingOnePathParams,
} from '../schemas/customHtmlTemplate/responses';
import {
  PingOneCustomHtmlRequestBody,
  PingOneRequestQuery,
} from '../schemas/customHtmlTemplate/requests';
import { DavinciAuthorizeHeaders, DavinciAuthorizeResponseHeaders } from '../schemas/authorize';
import { Schema } from '@effect/schema';
import { SuccessResponseRedirect } from '../schemas/returnSuccessResponseRedirect';

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
