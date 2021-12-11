/*
 * @forgerock/javascript-sdk
 *
 * authn-device-profile.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import { test, expect } from '@playwright/test';
import { setupAndGo } from '../utilities/setup-and-go';

test.describe('Test bad login flow', () => {
  test.use({ permissions: ['geolocation'] });
  test(`Login with device profile callback`, async ({ page, browserName }) => {
    const { messageArray } = await setupAndGo(page, browserName, 'authn-device-profile/');

    // Test assertions
    expect(messageArray.includes('Collecting profile ...')).toBe(true);
    expect(messageArray.includes('Profile collected.')).toBe(true);
    expect(messageArray.includes('Login with profile successful.')).toBe(true);
  });
});
