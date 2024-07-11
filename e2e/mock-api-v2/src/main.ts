import { Effect, Layer } from 'effect';
import { RouterBuilder, Middlewares } from 'effect-http';
import { NodeRuntime } from '@effect/platform-node';
import { NodeServer } from 'effect-http-node';
import { apiSpec } from './spec';

import { authorizeHandler } from './handlers/authorize';
import { customHtmlHandler } from './handlers/customHtmlTemplate';
import { CookieService, cookieServiceTest } from './services/Cookie';
import { openidConfiguration } from './handlers/openidConfiguration';
import { tokenHandler } from './handlers/token';
import { userInfoHandler } from './handlers/userinfo';
import { UserInfo, userInfoMock } from './services/userinfo';
import { mockTokens } from './services/tokens';
import { mockRequest } from './services/request';
import { mockCustomHtmlTemplate } from './services/customHtmlTemplate';
import { authorizeMock } from './services/authorize';

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
