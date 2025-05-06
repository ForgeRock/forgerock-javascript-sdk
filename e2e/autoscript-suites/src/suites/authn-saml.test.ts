/*
 * @forgerock/javascript-sdk
 *
 * authn-social-login-am.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import { test, expect } from '@playwright/test';
import { setupAndGo } from '../utilities/setup-and-go';

test.describe('SAML Flow', () => {
  test(`Login with SAML`, async ({ page, browserName }) => {
    const { messageArray } = await setupAndGo(page, browserName, 'authn-saml/', {
      tree: 'SAMLTest',
    });
    // Test assertions
    expect(messageArray.includes('init step')).toBe(true);
    expect(messageArray.includes('redirecting...')).toBe(true);
    expect(messageArray.includes('resumed')).toBe(true);
    expect(messageArray.includes('SAML Login successful')).toBe(true);
  });
  test(`Error on SAML handled`, async ({ page, browserName }) => {
    const { messageArray } = await setupAndGo(page, browserName, 'authn-saml/', {
      tree: 'SAMLTestFailure',
    });

    // Test assertions
    expect(messageArray.includes('init step')).toBe(true);
    expect(messageArray.includes('redirecting...')).toBe(true);
    expect(messageArray.includes('resumed')).toBe(true);
    expect(messageArray.includes('errorSaml')).toBe(true);
    expect(messageArray.includes('401')).toBe(true);
  });
});
