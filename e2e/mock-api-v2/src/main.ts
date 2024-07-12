import { Effect, Layer } from 'effect';
import { RouterBuilder, Middlewares } from 'effect-http';
import { NodeRuntime } from '@effect/platform-node';
import { NodeServer } from 'effect-http-node';
import { apiSpec } from './spec';

import { authorizeHandler } from './handlers/authorize.handler';
import { customHtmlHandler } from './handlers/custom-html-template.handler';
import { openidConfiguration } from './handlers/open-id-configuration.handler';
import { tokenHandler } from './handlers/token.handler';
import { userInfoHandler } from './handlers/userinfo.handler';

import { authorizeMock } from './services/authorize.service';
import { CookieService, cookieServiceTest } from './services/cookie.service';
import { mockCustomHtmlTemplate } from './services/custom-html-template.service';
import { mockRequest } from './services/request.service';
import { mockTokens } from './services/tokens.service';
import { UserInfo, userInfoMock } from './services/userinfo.service';

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

const Layers = Layer.mergeAll(mockTokens, authorizeMock, mockCustomHtmlTemplate).pipe(
  Layer.provide(mockRequest),
);

app.pipe(
  Effect.provide(Layers),
  Effect.provide(mockRequest),
  Effect.provideService(UserInfo, userInfoMock),
  Effect.provideService(CookieService, cookieServiceTest),
  NodeServer.listen({ port: 9443 }),
  NodeRuntime.runMain,
);
