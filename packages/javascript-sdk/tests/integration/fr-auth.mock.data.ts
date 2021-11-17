/*
 * @forgerock/javascript-sdk
 *
 * fr-auth.mock.data.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { CallbackType } from '../../src/auth/enums';
import { Step } from '../../src/auth/interfaces';

export const jsonResponse: Step = {
  authId: 'unused',
  callbacks: [
    {
      type: CallbackType.NameCallback,
      output: [{ name: 'prompt', value: 'User Name' }],
      input: [{ name: 'IDToken1', value: '' }],
      _id: 0,
    },
    {
      type: CallbackType.PasswordCallback,
      output: [{ name: 'prompt', value: 'Password' }],
      input: [{ name: 'IDToken2', value: '' }],
      _id: 1,
    },
  ],
  stage: 'UsernamePassword',
};

export const rawResponse = {
  body: {},
  bodyUsed: true,
  headers: {
    get(): string {
      return 'application/json';
    },
  },
  json(): Step {
    return jsonResponse;
  },
  ok: true,
  redirected: false,
  status: 200,
  statusText: '',
  type: 'cors',
  url:
    // eslint-disable-next-line max-len
    'https://openam-devjustin2.forgeblocks.com/am/json/realms/root/authenticate?authIndexType=service&authIndexValue=UsernamePassword',
};

export const loginSubmission = {
  payload: {
    authId: 'unused',
    callbacks: [
      {
        type: 'NameCallback',
        output: [{ name: 'prompt', value: 'User Name' }],
        input: [{ name: 'IDToken1', value: 'jsmith' }],
        _id: 0,
      },
      {
        type: 'PasswordCallback',
        output: [{ name: 'prompt', value: 'Password' }],
        input: [{ name: 'IDToken2', value: 'Password1!' }],
        _id: 1,
      },
    ],
    stage: 'UsernamePassword',
  },
  callbacks: [
    {
      payload: {
        type: 'NameCallback',
        output: [{ name: 'prompt', value: 'User Name' }],
        input: [{ name: 'IDToken1', value: 'jsmith' }],
        _id: 0,
      },
    },
    {
      payload: {
        type: 'PasswordCallback',
        output: [{ name: 'prompt', value: 'Password' }],
        input: [{ name: 'IDToken2', value: 'Password1!' }],
        _id: 1,
      },
    },
  ],
};
