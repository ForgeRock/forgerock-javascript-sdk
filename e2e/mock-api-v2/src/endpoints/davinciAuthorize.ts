import { pipe } from 'effect';
import { Api } from 'effect-http';
import {
  AuthorizePath,
  DavinciAuthorizeHeaders,
  DavinciAuthorizeQuery,
  DavinciAuthorizeResponseHeaders,
} from '../schemas/authorize';
import { PingOneCustomHtmlResponseBody } from '../schemas/customHtmlTemplate/responses';
import { SuccessResponseRedirect } from '../schemas/returnSuccessResponseRedirect';
import { Schema } from '@effect/schema';

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
