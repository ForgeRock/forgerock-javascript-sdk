/**
 *
 * Copyright (c) 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import { Effect } from 'effect';
import { RouterBuilder } from 'effect-http';
import { apiSpec } from '../spec.js';
import { Tokens } from '../services/tokens.service.js';

const tokenHandler = RouterBuilder.handler(apiSpec, 'PingOneToken', () =>
  Effect.gen(function* () {
    const { getTokens } = yield* Tokens;
    const tokens = yield* getTokens(null);

    return tokens;
  }),
);

export { tokenHandler };
