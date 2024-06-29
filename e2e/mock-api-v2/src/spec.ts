import { pipe } from 'effect';
import { Schema } from '@effect/schema';
import { Api, ApiResponse } from 'effect-http';

import {
  AuthorizePath,
  DavinciAuthorizeHeaders,
  DavinciAuthorizeResponseHeaders,
  DavinciAuthorizeQuery,
} from './schemas/authorize';
import {
  PingOneCustomHtmlRequestBody,
  PingOneRequestQuery,
} from './schemas/customHtmlTemplate/requests';

import {
  PingOnePathParams,
  PingOneCustomHtmlResponseBody,
  PingOneCustomHtmlResponseErrorBody,
} from './schemas/customHtmlTemplate/responses';

const apiSpec = pipe(
  Api.make({ title: 'MockApi' }),
  Api.addEndpoint(
    pipe(
      Api.post('DavinciAuthorize', '/:envid/as/authorize').pipe(
        Api.setRequestPath(AuthorizePath),
        Api.setRequestQuery(DavinciAuthorizeQuery),
        Api.setRequestHeaders(DavinciAuthorizeHeaders),
      ),

      Api.setResponseBody(PingOneCustomHtmlResponseBody),
      Api.setResponseHeaders(DavinciAuthorizeResponseHeaders),
      Api.setResponseStatus(200),
    ),
  ),
  Api.addEndpoint(
    pipe(Api.get('HealthCheck', '/healthcheck').pipe(Api.setResponseBody(Schema.String))),
  ),
  Api.addEndpoint(
    pipe(
      Api.post(
        'PingOneCustomHtml',
        '/:envid/davinci/connections/:connectionid/capabilities/customHTMLTemplate',
      ).pipe(
        Api.setRequestPath(PingOnePathParams),
        Api.setRequestQuery(PingOneRequestQuery),
        Api.setRequestBody(PingOneCustomHtmlRequestBody),

        Api.setRequestHeaders(DavinciAuthorizeHeaders),

        Api.setResponseBody(PingOneCustomHtmlResponseBody),
        Api.setResponseHeaders(DavinciAuthorizeResponseHeaders),

        Api.addResponse(ApiResponse.make(401, PingOneCustomHtmlResponseErrorBody)),
      ),
    ),
  ),
);

export { apiSpec };
