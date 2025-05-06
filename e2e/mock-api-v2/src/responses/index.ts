/**
 *
 * Copyright (c) 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import { Array } from 'effect';
import { UsernamePassword } from './username-password.js';
import { PingProtectNode } from './custom-html-template/ping-protect-node.js';
import { InvalidUsernamePassword } from './invalid-username-password.js';

type ResponseMapKeys = keyof typeof responseMap;
const responseMap = {
  UsernamePassword: Array.make(PingProtectNode, UsernamePassword),
} as const;

type ErrorMapKeys = keyof typeof errorMap;

const errorMap = {
  InvalidUsernamePassword,
} as const;

export { ResponseMapKeys, responseMap, errorMap, ErrorMapKeys };
