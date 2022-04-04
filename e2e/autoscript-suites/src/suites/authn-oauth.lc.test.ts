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

  test(`should proactively refresh tokens if they expire within the threshold`, async ({
    page,
    browserName,
  }) => {
    // Default threshold
    const defaultThresholdResult = await setupAndGo(page, browserName, 'authn-oauth/', {
      realmPath: 'tokens-expiring-soon',
    });
    expect(
      defaultThresholdResult.messageArray.includes(
        'OAuth tokens expiring soon; proactively refreshed',
      ),
    ).toBe(true);

    // Specified threshold
    const specifiedThresholdResult = await setupAndGo(page, browserName, 'authn-oauth/', {
      realmPath: 'tokens-expiring-soon',
      oauthThreshold: '25000',
    });
    expect(
      specifiedThresholdResult.messageArray.includes(
        'OAuth tokens expiring soon; proactively refreshed',
      ),
    ).toBe(true);

    // Expired
    const expiredResult = await setupAndGo(page, browserName, 'authn-oauth/', {
      realmPath: 'tokens-expired',
    });
    expect(
      expiredResult.messageArray.includes('OAuth tokens expiring soon; proactively refreshed'),
    ).toBe(true);
  });

  test(`should not proactively refresh tokens if they expire outside the threshold`, async ({
    page,
    browserName,
  }) => {
    // Default threshold
    const defaultThresholdResult = await setupAndGo(page, browserName, 'authn-oauth/', {});
    expect(
      defaultThresholdResult.messageArray.includes('OAuth tokens not expiring soon; not refreshed'),
    ).toBe(true);

    // Specified threshold
    const specifiedThresholdResult = await setupAndGo(page, browserName, 'authn-oauth/', {
      realmPath: 'tokens-expiring-soon',
      oauthThreshold: '10000',
    });
    expect(
      specifiedThresholdResult.messageArray.includes(
        'OAuth tokens not expiring soon; not refreshed',
      ),
    ).toBe(true);
  });
});
