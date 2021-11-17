/*
 * @forgerock/javascript-sdk
 *
 * attribute-input-callback.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { CallbackType } from '../../auth/enums';
import { Callback } from '../../auth/interfaces';
import AttributeInputCallback from './attribute-input-callback';

describe('AttributeInputCallback', () => {
  const payload: Callback = {
    _id: 0,
    input: [
      {
        name: 'IDToken0',
        value: '',
      },
      {
        name: 'IDToken0validateOnly',
        value: false,
      },
    ],
    output: [
      {
        name: 'name',
        value: 'givenName',
      },
      {
        name: 'prompt',
        value: 'First Name:',
      },
      {
        name: 'required',
        value: true,
      },
      {
        name: 'policies',
        value: {
          policyRequirements: ['a', 'b'],
          name: 'givenName',
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
    ],
    type: CallbackType.StringAttributeInputCallback,
  };

  it('reads/writes basic properties with "validate only"', () => {
    const cb = new AttributeInputCallback<string>(payload);
    cb.setValue('Clark');
    cb.setValidateOnly(true);

    expect(cb.getType()).toBe('StringAttributeInputCallback');
    expect(cb.getName()).toBe('givenName');
    expect(cb.getPrompt()).toBe('First Name:');
    expect(cb.isRequired()).toBe(true);
    expect(cb.getPolicies().policyRequirements).toStrictEqual(['a', 'b']);
    expect(cb.getFailedPolicies()).toStrictEqual(['c', 'd']);
    expect(cb.getInputValue()).toBe('Clark');
    expect(cb.payload.input[1].value).toBe(true);
  });

  it('writes validate only to `false` for submission', () => {
    const cb = new AttributeInputCallback<string>(payload);
    cb.setValidateOnly(false);
    expect(cb.payload.input[1].value).toBe(false);
  });
});
