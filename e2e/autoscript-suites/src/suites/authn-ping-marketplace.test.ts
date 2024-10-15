/*
 * @forgerock/javascript-sdk
 *
 * authn-otp-reg.test.ts
 *
 * Copyright (c) 2024 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import { test, expect } from '@playwright/test';
import { setupAndGo } from '../utilities/setup-and-go';

test.describe('Login with marketplace nodes', () => {
  test(`Ping marketplace nodes`, async ({ page, browserName }) => {
    const { messageArray } = await setupAndGo(page, browserName, 'authn-protect-metadata/');

    // Test assertions
    expect(messageArray.includes('Submitting ping protect start')).toBe(true);

    expect(messageArray.includes('Submitting ping protect evaluation')).toBe(true);
    expect(messageArray.includes('Basic login with Protect successful')).toBe(true);
  });
});
