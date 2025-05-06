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
import { UserInfo } from '../services/userinfo.service.js';

const userInfoHandler = RouterBuilder.handler(apiSpec, 'UserInfo', (request, security) =>
  Effect.gen(function* () {
    const { getUserInfo } = yield* UserInfo;

    const response = yield* getUserInfo(security, {});

    return response;
  }),
);

export { userInfoHandler };
