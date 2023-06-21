/*
 * @forgerock/javascript-sdk
 *
 * authn-oauth.lc.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { test, expect } from '@playwright/test';
import { setupAndGo } from '../utilities/setup-and-go';

test.describe('Test OAuth login flow', () => {
  test(`should login successfully and then log out with`, async ({ page, browserName }) => {
    const { messageArray, networkArray } = await setupAndGo(page, browserName, 'authn-oauth/');

    // Test assertions
    // Test log messages
    expect(messageArray.includes('OAuth login successful')).toBe(true);
    expect(messageArray.includes('Logout successful')).toBe(true);
    expect(messageArray.includes('Calling authorize endpoint')).toBe(true);
    expect(messageArray.includes('Calling access token exchange endpoint')).toBe(true);
    expect(messageArray.includes('Get user info from OAuth endpoint')).toBe(true);
    expect(messageArray.includes('New OAuth tokens retrieved')).toBe(true);

    // Test network requests
    // Make sure revoke request is made twice, one for force renew and one for logout
    const revokeRequests = networkArray.filter(
      (request) => request === '/am/oauth2/realms/root/token/revoke, fetch',
    );
    expect(revokeRequests.length).toBe(2);
  });
});
