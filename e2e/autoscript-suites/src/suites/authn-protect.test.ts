/*
 * @forgerock/javascript-sdk
 *
 * authn-basic.lc.test.ts
 *
 * Copyright (c) 2024 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import { test, expect } from '@playwright/test';
import { setupAndGo } from '../utilities/setup-and-go';

test.describe('Test basic login flow with Ping Protect', () => {
  test(`should send Protect data and login successfully`, async ({ browserName, page }) => {
    const { messageArray } = await setupAndGo(page, browserName, 'authn-protect');
    const configJson = messageArray.find((message) => message.includes('envId'));

    let configObj;
    try {
      configObj = JSON.parse(configJson);
    } catch (err) {
      console.log('Error parsing configJson');
      configObj = {};
    }

    // Test assertions
    expect(configObj.envId.length).toBeGreaterThan(5);
    expect(configObj.consoleLogEnabled).toBe(true);
    expect(configObj.deviceAttributesToIgnore).toStrictEqual(['userAgent']);
    expect(configObj.customHost).toBe('https://example.com');
    expect(configObj.lazyMetadata).toBe(false);
    expect(configObj.behavioralDataCollection).toBe(true);
    expect(configObj.deviceKeyRsyncIntervals).toBe(14);
    expect(configObj.enableTrust).toBe(false);
    expect(configObj.disableTags).toBe(false);
    expect(configObj.disableHub).toBe(false);

    expect(messageArray.includes('[SignalsSDK] Starting Signals SDK...')).toBe(true);
    expect(messageArray.includes('[SignalsSDK] calculated device attributes.')).toBe(true);
    expect(messageArray.includes('getPauseBehavioralData: true')).toBe(true);
    expect(messageArray.includes('Basic login with Protect successful')).toBe(true);
    expect(messageArray.includes('Test script complete')).toBe(true);
  });
});
