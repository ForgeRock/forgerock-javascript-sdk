/*
 * @forgerock/javascript-sdk
 *
 * authn-platform.lc.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { test, expect } from '@playwright/test';
import { setupAndGo } from '../utilities/setup-and-go';

test.describe('Test Basic login flow', () => {
  test(`should login successfully and then log out with`, async ({ page, browserName }) => {
    const { messageArray } = await setupAndGo(page, browserName, 'authn-platform/');

    // Test assertions
    expect(messageArray.includes('Basic login with platform nodes successful')).toBe(true);
    expect(messageArray.includes('Logout successful')).toBe(true);
  });
});
