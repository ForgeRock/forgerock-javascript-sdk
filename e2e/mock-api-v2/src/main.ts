import { Effect } from 'effect';
import { RouterBuilder, Middlewares } from 'effect-http';
import { NodeRuntime } from '@effect/platform-node';
import { NodeServer } from 'effect-http-node';
import { apiSpec } from './spec';

import { authorizeHandler } from './handlers/authorize';
import { Fetch, fetchTest } from './services/fetch';
import { customHtmlHandler } from './handlers/customHtmlTemplate';
import { CookieService, cookieServiceTest } from './services/Cookie';
import { openidConfiguration } from './handlers/openidConfiguration';
import { tokenHandler } from './handlers/token';
import { userInfoHandler } from './handlers/userinfo';

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
  Effect.tap(Effect.logInfo(`Visit: https://localhost:9443/docs#/`)),
  Effect.provideService(Fetch, fetchTest),
  Effect.provideService(CookieService, cookieServiceTest),
  NodeServer.listen({ port: 9443 }),
  NodeRuntime.runMain,
);
