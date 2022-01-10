/*
 * @forgerock/javascript-sdk
 *
 * authn-email-suspend.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { test, expect } from '@playwright/test';
import { setupAndGo } from '../utilities/setup-and-go';

test.describe('Test basic registration flow', () => {
  test(`should register user successfully and then log out`, async ({ page, browserName }) => {
    const { messageArray } = await setupAndGo(page, browserName, 'authn-email-suspend/');

    // Test assertions
    expect(
      messageArray.includes(
        // eslint-disable-next-line max-len
        'An email has been sent to the address you entered. Click the link in that email to proceed.',
      ),
    ).toBe(true);
  });
});
