/*
 * @forgerock/javascript-sdk
 *
 * authz-token.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { test, expect } from '@playwright/test';
import { setupAndGo } from '../utilities/setup-and-go';

test.describe('Test OAuth token management', () => {
  test(`should proactively refresh tokens if they expire within the threshold`, async ({
    page,
    browserName,
  }) => {
    // Default threshold
    const defaultThresholdResult = await setupAndGo(page, browserName, 'authz-token/', {
      realmPath: 'tokens-expiring-soon',
    });
    expect(
      defaultThresholdResult.messageArray.includes(
        'OAuth tokens expiring soon; proactively refreshed',
      ),
    ).toBe(true);
    expect(
      defaultThresholdResult.messageArray.includes(
        'OAuth tokens expiring soon; proactively refreshed by HttpClient call',
      ),
    ).toBe(true);

    // Specified threshold
    const specifiedThresholdResult = await setupAndGo(page, browserName, 'authz-token/', {
      realmPath: 'tokens-expiring-soon',
      oauthThreshold: '25000',
    });
    expect(
      specifiedThresholdResult.messageArray.includes(
        'OAuth tokens expiring soon; proactively refreshed',
      ),
    ).toBe(true);
    expect(
      specifiedThresholdResult.messageArray.includes(
        'OAuth tokens expiring soon; proactively refreshed by HttpClient call',
      ),
    ).toBe(true);

    // Expired
    const expiredResult = await setupAndGo(page, browserName, 'authz-token/', {
      realmPath: 'tokens-expired',
    });
    expect(
      expiredResult.messageArray.includes('OAuth tokens expiring soon; proactively refreshed'),
    ).toBe(true);
    expect(
      expiredResult.messageArray.includes(
        'OAuth tokens expiring soon; proactively refreshed by HttpClient call',
      ),
    ).toBe(true);
  });

  test(`should not proactively refresh tokens if they expire outside the threshold`, async ({
    page,
    browserName,
  }) => {
    // Default threshold
    const defaultThresholdResult = await setupAndGo(page, browserName, 'authz-token/', {});
    expect(
      defaultThresholdResult.messageArray.includes('OAuth tokens not expiring soon; not refreshed'),
    ).toBe(true);
    expect(
      defaultThresholdResult.messageArray.includes(
        'OAuth tokens not expiring soon; not refreshed by HttpClient call',
      ),
    ).toBe(true);

    // Specified threshold
    const specifiedThresholdResult = await setupAndGo(page, browserName, 'authz-token/', {
      realmPath: 'tokens-expiring-soon',
      oauthThreshold: '10000',
    });
    expect(
      specifiedThresholdResult.messageArray.includes(
        'OAuth tokens not expiring soon; not refreshed',
      ),
    ).toBe(true);
    expect(
      specifiedThresholdResult.messageArray.includes(
        'OAuth tokens not expiring soon; not refreshed by HttpClient call',
      ),
    ).toBe(true);
  });
});
