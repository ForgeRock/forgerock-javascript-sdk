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
import TextInputCallback from './text-input-callback';

describe('TextInputCallback', () => {
  const payload: Callback = {
    type: CallbackType.TextInputCallback,
    output: [
      {
        name: 'prompt',
        value: 'Provide a nickname for this account',
      },
    ],
    input: [
      {
        name: 'IDToken1',
        value: '',
      },
    ],
  };

  it('reads/writes basic properties', () => {
    const cb = new TextInputCallback(payload);

    expect(cb.getPrompt()).toBe('Provide a nickname for this account');

    cb.setInput('Test setting input');

    expect(cb.getInputValue()).toBe('Test setting input');
  });
});
