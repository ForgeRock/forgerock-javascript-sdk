import { RouterBuilder, Middlewares, ExampleServer } from 'effect-http';
import { NodeRuntime } from '@effect/platform-node';
import { NodeServer } from 'effect-http-node';
import { apiSpec } from './spec';

const app = ExampleServer.make(apiSpec).pipe(RouterBuilder.build, Middlewares.errorLog);

app.pipe(NodeServer.listen({ port: 9443 }), NodeRuntime.runMain);
