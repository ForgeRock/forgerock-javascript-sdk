import { Config, Effect, Layer, pipe } from 'effect';
import { RouterBuilder, Middlewares } from 'effect-http';
import { NodeRuntime } from '@effect/platform-node';
import { NodeServer } from 'effect-http-node';
import { apiSpec } from './spec.js';

import { authorizeHandler } from './handlers/authorize.handler.js';
import { customHtmlHandler } from './handlers/custom-html-template.handler.js';
import { openidConfiguration } from './handlers/open-id-configuration.handler.js';
import { tokenHandler } from './handlers/token.handler.js';
import { userInfoHandler } from './handlers/userinfo.handler.js';

import { authorizeMock } from './services/authorize.service.js';
import { CookieService, cookieServiceTest } from './services/cookie.service.js';
import { mockCustomHtmlTemplate } from './services/custom-html-template.service.js';
import { mockRequest } from './services/request.service.js';
import { mockTokens } from './services/tokens.service.js';
import { UserInfo, userInfoMock } from './services/userinfo.service.js';

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

const PORT = Config.integer('PORT').pipe(Config.withDefault(9444));

const program = app.pipe(
  Effect.provide(Layers),
  Effect.provide(mockRequest),
  Effect.provideService(UserInfo, userInfoMock),
  Effect.provideService(CookieService, cookieServiceTest),
);

pipe(
  Effect.flatMap(PORT, (port) => program.pipe(NodeServer.listen({ port }))),
  NodeRuntime.runMain,
);
