/*
 * @forgerock/javascript-sdk
 *
 * fr-auth.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { vi, expect, describe, it, afterAll } from 'vitest';
import type PasswordCallback from '../../src/fr-auth/callbacks/password-callback';
import { CallbackType } from '../../src/auth/enums';
import Config from '../../src/config';
import FRAuth from '../../src/fr-auth';
import type NameCallback from '../../src/fr-auth/callbacks/name-callback';
import type FRStep from '../../src/fr-auth/fr-step';
import { rawResponse } from './fr-auth.mock.data';

vi.mock('../../src/config', () => {
  return {
    set: (conf) => conf,
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    get() {
      return {
        serverConfig: {
          baseUrl: 'https://openam.example.com/am/',
          timeout: 0,
        },
      };
    },
  };
});

afterAll(() => {
  vi.clearAllMocks();
  vi.resetModules();
});
describe('Test FRAuth.next functionality', () => {
  it('should be able to make initial next step', async () => {
    global.fetch = vi.fn().mockImplementation(() => rawResponse);
    console.log(JSON.stringify(Config.set));
    Config.set({
      serverConfig: {
        baseUrl: 'http://am.example.com',
        timeout: 3000,
      },
    });

    const step = await FRAuth.next();
    const stage = (step as FRStep).getStage();
    ((step as FRStep).getCallbackOfType(CallbackType.NameCallback) as NameCallback).setName(
      'jsmith',
    );
    (
      (step as FRStep).getCallbackOfType(CallbackType.PasswordCallback) as PasswordCallback
    ).setPassword('Password1!');

    expect(stage).toBe('UsernamePassword');
    expect(step.payload.callbacks[0].input[0].name).toBe('IDToken1');
    expect(step.payload.callbacks[0].input[0].value).toBe('jsmith');
    expect(step.payload.callbacks[1].input[0].name).toBe('IDToken2');
    expect(step.payload.callbacks[1].input[0].value).toBe('Password1!');
  });
});
