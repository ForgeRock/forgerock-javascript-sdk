/*
 * @forgerock/javascript-sdk
 *
 * authn-otp-reg.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import { test, expect } from '@playwright/test';
import { setupAndGo } from '../utilities/setup-and-go';

test.describe('Test QR Code flows', () => {
  test(`Login and register OTP successfully`, async ({ page, browserName }) => {
    const { messageArray } = await setupAndGo(page, browserName, 'authn-otp-reg/');

    // Test assertions
    expect(
      messageArray.includes(
        'Scan the QR code image below with the ForgeRock Authenticator app to register your device with your login.',
      ),
    ).toBe(true);
    expect(messageArray.includes('otp')).toBe(true);
    expect(
      messageArray.includes(
        'otpauth://totp/ForgeRock:jlowery?secret=QITSTC234FRIU8DD987DW3VPICFY======&issuer=ForgeRock&period=30&digits=6&b=032b75',
      ),
    ).toBe(true);
    expect(messageArray.includes('Basic login with OTP registration step successful')).toBe(true);
  });
});
