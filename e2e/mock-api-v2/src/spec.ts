import { pipe } from 'effect';
import { Schema } from '@effect/schema';
import { Api } from 'effect-http';

import { openidConfiguration } from './endpoints/open-id-configuration.endpoint.js';
import { davinciAuthorize } from './endpoints/davinci-authorize.endpoint.js';
import { customHtmlEndPoint } from './endpoints/custom-html.endpoint.js';
import { pingOneToken } from './endpoints/token.endpoint.js';
import { userInfo } from './endpoints/userinfo.endpoint.js';

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
