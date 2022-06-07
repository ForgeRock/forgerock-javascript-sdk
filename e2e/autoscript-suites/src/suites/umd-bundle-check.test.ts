/*
 * @forgerock/javascript-sdk
 *
 * register-basic.lc.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { test, expect } from '@playwright/test';
import { setupAndGo } from '../utilities/setup-and-go';

test.describe('Test basic registration flow', () => {
  test.skip(`should load the umd bundle`, async ({ page, browserName }) => {
    const { messageArray } = await setupAndGo(page, browserName, 'umd-bundle-check/');
    // Test assertions
    expect(messageArray.includes('Config was loaded')).toBe(true);
  });
});
