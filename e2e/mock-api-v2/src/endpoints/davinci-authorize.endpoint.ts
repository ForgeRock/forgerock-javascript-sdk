import { Schema } from '@effect/schema';
import { pipe } from 'effect';
import { Api } from 'effect-http';

import {
  AuthorizePath,
  DavinciAuthorizeHeaders,
  DavinciAuthorizeQuery,
  DavinciAuthorizeResponseHeaders,
} from '../schemas/authorize.schema';
import { PingOneCustomHtmlResponseBody } from '../schemas/custom-html-template/custom-html-template-response.schema';
import { SuccessResponseRedirect } from '../schemas/return-success-response-redirect.schema';

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
