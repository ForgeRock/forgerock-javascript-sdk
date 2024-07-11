import { Effect } from 'effect';
import { RouterBuilder, Middlewares } from 'effect-http';
import { NodeRuntime } from '@effect/platform-node';
import { NodeServer } from 'effect-http-node';
import { apiSpec } from './spec';

import { authorizeHandler } from './handlers/authorize';
//import { Fetch, fetchTest } from './services/fetch';
import { customHtmlHandler } from './handlers/customHtmlTemplate';
import { CookieService, cookieServiceTest } from './services/Cookie';
import { openidConfiguration } from './handlers/openidConfiguration';
import { tokenHandler } from './handlers/token';
import { userInfoHandler } from './handlers/userinfo';
import { UserInfo, userInfoMock } from './services/userinfo';
import { Tokens, mockTokens } from './services/tokens';
import { Request, mockRequest } from './services/request';
import { CustomHtmlTemplate, mockCustomHtmlTemplate } from './services/customHtmlTemplate';
import { Authorize, authorizeMock } from './services/authorize';

const app = RouterBuilder.make(apiSpec).pipe(
  RouterBuilder.handle('HealthCheck', () => Effect.succeed('Healthy!')),
  RouterBuilder.handle(authorizeHandler),
  RouterBuilder.handle(customHtmlHandler),
  RouterBuilder.handle(openidConfiguration),
  RouterBuilder.handle(tokenHandler),
  RouterBuilder.handle(userInfoHandler),
  RouterBuilder.build,
  Middlewares.errorLog,
);

app.pipe(
  Effect.provideService(UserInfo, userInfoMock),
  Effect.provideService(Authorize, authorizeMock),
  Effect.provideService(Tokens, mockTokens),
  Effect.provideService(Request, mockRequest),
  Effect.provideService(CustomHtmlTemplate, mockCustomHtmlTemplate),
  Effect.provideService(CookieService, cookieServiceTest),
  NodeServer.listen({ port: 9443 }),
  NodeRuntime.runMain,
);
