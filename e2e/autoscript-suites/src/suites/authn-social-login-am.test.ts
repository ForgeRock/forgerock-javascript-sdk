/*
 * @forgerock/javascript-sdk
 *
 * authn-social-login-am.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { test, expect } from '@playwright/test';
import { setupAndGo } from '../utilities/setup-and-go';

test.describe('Test Social Login flow with AM nodes', () => {
  test(`Login with identity provide `, async ({ page, browserName }) => {
    const { messageArray } = await setupAndGo(page, browserName, 'authn-social-login-am/', {
      clientId: 'IDMSocialLogin',
    });

    console.log(messageArray);
    // Test assertions
    expect(messageArray.includes('Set provider on SelectIdPCallback')).toBe(true);
    expect(messageArray.includes('Redirect to ID Provider')).toBe(true);
    expect(messageArray.includes('Returning from provider')).toBe(true);
    expect(messageArray.includes('Social Login successful')).toBe(true);
  });
});
