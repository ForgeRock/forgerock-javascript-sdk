/*
 * @forgerock/javascript-sdk
 *
 * authn-basic.lc.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import { test, expect } from '@playwright/test';
import { setupAndGo } from '../utilities/setup-and-go';

test.describe('Test Basic login flow', () => {
  test(`should login successfully and then log out`, async ({ browserName, page }) => {
    const { messageArray } = await setupAndGo(page, browserName, 'authn-basic/');

    // Test assertions
    expect(messageArray.includes('Basic login successful')).toBe(true);
    expect(messageArray.includes('Logout successful')).toBe(true);
    expect(messageArray.includes('Starting authentication with service')).toBe(true);
    expect(messageArray.includes('Continuing authentication with service')).toBe(true);
  });
});
