/*
 * @forgerock/javascript-sdk
 *
 * config-token-storage.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { test, expect } from '@playwright/test';
import { setupAndGo } from '../utilities/setup-and-go';

test.describe('Test oauth login flow with localStorage', () => {
  test(`Login successful`, async ({ page, browserName }) => {
    const { messageArray } = await setupAndGo(page, browserName, 'config-token-storage/', {
      tokenStore: 'sessionStorage',
    });

    // Test assertions
    expect(messageArray.includes('Access token is correct')).toBe(true);
    expect(messageArray.includes('Logout successful')).toBe(true);
  });

  test(`Login successfull `, async ({ page, browserName }) => {
    const { messageArray } = await setupAndGo(page, browserName, 'config-token-storage/', {
      tokenStore: 'indexedDB',
    });

    // Test assertions
    expect(messageArray.includes('Access token is correct')).toBe(true);
    expect(messageArray.includes('Logout successful')).toBe(true);
  });

  test(`Login successfully`, async ({ page, browserName }) => {
    const { messageArray } = await setupAndGo(page, browserName, 'config-token-storage/', {
      tokenStore: 'customStore',
    });

    // Test assertions
    expect(messageArray.includes('Custom token setter used.')).toBe(true);
    expect(messageArray.includes('Custom token getter used.')).toBe(true);
    expect(messageArray.includes('Custom token remover used.')).toBe(true);
    expect(messageArray.includes('Access token is correct')).toBe(true);
    expect(messageArray.includes('Logout successful')).toBe(true);
  });
});
