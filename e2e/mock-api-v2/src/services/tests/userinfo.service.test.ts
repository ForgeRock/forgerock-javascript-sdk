/**
 *
 * Copyright (c) 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import { expect, it } from '@effect/vitest';
import { UserInfo, userInfoMock } from '../userinfo.service.js';
import { userInfoResponse } from '../../responses/userinfo/userinfo.js';
import { Effect } from 'effect';

it.effect('should get userinfo', () =>
  Effect.gen(function* () {
    const { getUserInfo } = yield* UserInfo;

    const result = yield* getUserInfo('mytoken', {});

    expect(result).toEqual(userInfoResponse);
  }).pipe(Effect.provideService(UserInfo, userInfoMock)),
);
