/*
 * @forgerock/javascript-sdk
 *
 * fr-auth-callback.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import FRCallback from '.';
import { CallbackType } from '../../auth/enums';
import { Callback } from '../../auth/interfaces';

describe('FRCallback', () => {
  it('reads/writes basic properties', () => {
    const payload: Callback = {
      _id: 0,
      input: [
        {
          name: 'userName',
          value: '',
        },
      ],
      output: [
        {
          name: 'prompt',
          value: 'Username:',
        },
      ],
      type: CallbackType.NameCallback,
    };
    const cb = new FRCallback(payload);
    cb.setInputValue('superman');

    expect(cb.getType()).toBe('NameCallback');
    expect(cb.getOutputValue('prompt')).toBe('Username:');
    expect(cb.getInputValue()).toBe('superman');
  });
});
