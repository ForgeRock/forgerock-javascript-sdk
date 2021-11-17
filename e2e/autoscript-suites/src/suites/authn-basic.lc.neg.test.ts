/*
 * @forgerock/javascript-sdk
 *
 * authn-basic.lc.neg.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import { test, expect } from '@playwright/test';
import { setupAndGo } from '../utilities/setup-and-go';

test.describe('Test bad login flow', () => {
  test(`Login UNsuccessfully`, async ({ page, browserName }) => {
    const { messageArray } = await setupAndGo(page, browserName, 'authn-basic/', {
      pw: 'wrong_password_123!',
    });

    // Test assertions
    expect(messageArray.includes('Error: Auth_Error')).toBe(true);
  });
});
