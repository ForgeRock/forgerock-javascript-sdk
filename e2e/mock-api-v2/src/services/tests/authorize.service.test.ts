/**
 *
 * Copyright (c) 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import { it, expect } from '@effect/vitest';
import { Effect, Layer } from 'effect';
import { Authorize, authorizeMock } from '../authorize.service.js';
import { mockRequest } from '../request.service.js';
import { PingProtectNode } from '../../responses/custom-html-template/ping-protect-node.js';

const queryParams = {
  response_mode: 'pi.flow',
  client_id: '724ec718-c41c-4d51-98b0-84a583f450f9',
  redirect_uri: 'http%3A%2F%2Flocalhost%3A8443%2Fcallback',
  response_type: 'code',
  scope: 'openid%20profile%20email',
  state: 'MTg1MjI5MTEzMTIzMjQwMjU5OTcxMjAxMjI4NDIxNDA0MzE4MTA4MjQ1',
  code_challenge: 'E8YevbSo7Y8jLE43QN3v8e8aVeD-ek-LjG6AcFLP5rg',
  code_challenge_method: 'S256',
  code: 'test ',
  acr_values: 'UsernamePassword',
};
const headers = {
  cookie: undefined,
};

it.effect('should handle authorize service', () =>
  Effect.gen(function* () {
    const { handleAuthorize } = yield* Authorize;
    const result = yield* handleAuthorize(headers, queryParams);

    expect(result).toEqual({
      status: 200 as const,
      body: PingProtectNode,
    });
  }).pipe(Effect.provide(Layer.provideMerge(authorizeMock, mockRequest))),
);
