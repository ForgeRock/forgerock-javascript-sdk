/*
 * @forgerock/javascript-sdk
 *
 * authz-txn-basic-json.test.ts
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { test, expect } from '@playwright/test';
import { setupAndGo } from '../utilities/setup-and-go';

test.describe('Test Transaction Authorization flow using JSON response', () => {
  test(`Trigger Txn Auth appropriately`, async ({ page, browserName }) => {
    const { messageArray } = await setupAndGo(page, browserName, 'authz-txn-basic-json/');

    // Test assertions
    expect(
      messageArray.includes('IG resource requires additional authorization'),
      'add. auth required',
    ).toBe(true);
    expect(
      messageArray.includes('Request to IG resource successfully responded'),
      'successful response',
    ).toBe(true);
    expect(
      messageArray.includes('Starting authentication with composite advice'),
      'start auth with advice',
    ).toBe(true);
    expect(
      messageArray.includes('Continuing authentication with composite advice'),
      'continue with advice',
    ).toBe(true);
  });
});
