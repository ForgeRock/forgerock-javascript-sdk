/**
 *
 * Copyright (c) 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import { it, expect } from '@effect/vitest';
import { Tokens, mockTokens } from '../tokens.service.js';
import { Effect, Exit, Layer } from 'effect';
import { mockRequest } from '../request.service.js';
import { tokenResponseBody } from '../../responses/token/token.js';

it.effect('should return tokens', () =>
  Effect.gen(function* () {
    const { getTokens } = yield* Tokens;
    const result = yield* getTokens({ cookie: 'the cookie' });

    expect(result).toEqual(tokenResponseBody);
  }).pipe(Effect.provide(Layer.provideMerge(mockTokens, mockRequest))),
);

it.effect('should return error', () =>
  Effect.gen(function* () {
    const { getTokens } = yield* Tokens;
    const result = yield* getTokens({ cookie: 'the cookie' }).pipe(Effect.flip, Effect.exit);

    expect(result).toEqual(Exit.fail('failed'));
  }).pipe(Effect.provide(Layer.provideMerge(mockTokens, mockRequest))),
);
