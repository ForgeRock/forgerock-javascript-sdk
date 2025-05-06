/**
 *
 * Copyright (c) 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import { RouterBuilder, Middlewares, ExampleServer } from 'effect-http';
import { NodeRuntime } from '@effect/platform-node';
import { NodeServer } from 'effect-http-node';
import { apiSpec } from './spec.js';

const app = ExampleServer.make(apiSpec).pipe(RouterBuilder.build, Middlewares.errorLog);

app.pipe(NodeServer.listen({ port: 9443 }), NodeRuntime.runMain);
