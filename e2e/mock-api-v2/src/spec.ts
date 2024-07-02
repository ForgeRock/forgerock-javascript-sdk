import { pipe } from 'effect';
import { Schema } from '@effect/schema';
import { Api } from 'effect-http';

import { openidConfiguration } from './endpoints/openIdEndpoint';
import { davinciAuthorize } from './endpoints/davinciAuthorize';
import { customHtmlEndPoint } from './endpoints/customHtml';
import { pingOneToken } from './endpoints/token';
import { userInfo } from './endpoints/userinfo';

const apiSpec = pipe(
  Api.make({ title: 'MockApi' }),
  openidConfiguration,
  davinciAuthorize,
  customHtmlEndPoint,
  pingOneToken,
  userInfo,
  Api.addEndpoint(
    pipe(Api.get('HealthCheck', '/healthcheck').pipe(Api.setResponseBody(Schema.String))),
  ),
);

export { apiSpec };
