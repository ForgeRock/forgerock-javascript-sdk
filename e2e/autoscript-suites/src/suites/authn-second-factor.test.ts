/*
 * @forgerock/javascript-sdk
 *
 * authn-second-factor.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import { test, expect } from '@playwright/test';
import { setupAndGo } from '../utilities/setup-and-go';

test.describe('Test Second Factor login flow', () => {
  test(`should login successfully with OTP and then log out with`, async ({
    page,
    browserName,
  }) => {
    const { messageArray } = await setupAndGo(page, browserName, 'authn-second-factor/');

    // Test assertions
    expect(messageArray.includes('Set given OTP to password callback')).toBe(true);
    expect(messageArray.includes('Logout successful')).toBe(true);
    expect(messageArray.includes('Second Factor login successful')).toBe(true);
  });
});
