/*
 * @forgerock/javascript-sdk
 *
 * validated-create-password-callback.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { CallbackType } from '../../auth/enums';
import { Callback } from '../../auth/interfaces';
import ValidatedCreatePasswordCallback from './validated-create-password-callback';

describe('ValidatedCreatePasswordCallback', () => {
  const payload: Callback = {
    type: CallbackType.ValidatedCreatePasswordCallback,
    output: [
      {
        name: 'echoOn',
        value: false,
      },
      {
        name: 'required',
        value: true,
      },
      {
        name: 'policies',
        value: {
          policyRequirements: ['a', 'b'],
          name: 'password',
          policies: [],
        },
      },
      {
        name: 'failedPolicies',
        value: ['c', 'd'],
      },
      {
        name: 'validateOnly',
        value: false,
      },
      {
        name: 'prompt',
        value: 'Password',
      },
    ],
    input: [
      {
        name: 'IDToken2',
        value: '',
      },
      {
        name: 'IDToken2validateOnly',
        value: false,
      },
    ],
    _id: 1,
  };

  it('reads/writes basic properties with "validate only"', () => {
    const cb = new ValidatedCreatePasswordCallback(payload);
    cb.setPassword('abcd123');
    cb.setValidateOnly(true);

    expect(cb.getType()).toBe('ValidatedCreatePasswordCallback');
    expect(cb.getPrompt()).toBe('Password');
    expect(cb.isRequired()).toBe(true);
    expect(cb.getPolicies().policyRequirements).toStrictEqual(['a', 'b']);
    expect(cb.getFailedPolicies()).toStrictEqual(['c', 'd']);
    expect(cb.payload.input[0].value).toBe('abcd123');
    expect(cb.payload.input[1].value).toBe(true);
  });

  it('writes validate only to `false` for submission', () => {
    const cb = new ValidatedCreatePasswordCallback(payload);
    cb.setValidateOnly(false);
    expect(cb.payload.input[1].value).toBe(false);
  });
});
