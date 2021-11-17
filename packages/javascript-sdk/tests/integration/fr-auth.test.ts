/*
 * @forgerock/javascript-sdk
 *
 * fr-auth.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import Config from '../../src/config';
import FRAuth from '../../src/fr-auth';
import { rawResponse } from './fr-auth.mock.data';

jest.mock('../../src/config');

describe('Test FRAuth.next functionality', () => {
  it('should be able to make initial next step', async () => {
    global.fetch = jest.fn().mockImplementation(() => rawResponse);
    Config.get.mockImplementation(() => ({
      realmPath: '',
      serverConfig: {
        baseUrl: 'https://domain.com',
      },
      tree: 'FakeTree',
    }));

    const step = await FRAuth.next();
    const stage = step.getStage();
    step.getCallbackOfType('NameCallback').setName('jsmith');
    step.getCallbackOfType('PasswordCallback').setPassword('Password1!');

    expect(stage).toBe('UsernamePassword');
    expect(step.payload.callbacks[0].input[0].name).toBe('IDToken1');
    expect(step.payload.callbacks[0].input[0].value).toBe('jsmith');
    expect(step.payload.callbacks[1].input[0].name).toBe('IDToken2');
    expect(step.payload.callbacks[1].input[0].value).toBe('Password1!');
  });
});
