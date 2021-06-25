/*
 * @forgerock/javascript-sdk
 *
 * authn-central-login.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { setupAndGo } from '../utilities/setup-and-go';
import browsers from '../utilities/browsers';

describe('Test OAuth login flow', () => {
  browsers.forEach((browserType) => {
    // eslint-disable-next-line
    it(`should use invisible iframe to request auth code, then token exchange with ${browserType}`, async (done) => {
      try {
        const { browser, messageArray, networkArray } = await setupAndGo(
          browserType,
          'authn-central-login/',
        );

        // Test assertions
        // Test log messages
        expect(messageArray.includes('OAuth authorization successful')).toBe(true);
        expect(messageArray.includes('Test script complete')).toBe(true);
        // Test network requests
        // Authorize endpoint should use iframe, which is type "document"
        expect(networkArray.includes('/am/oauth2/realms/root/authorize, document')).toBe(true);
        expect(networkArray.includes('/am/oauth2/realms/root/access_token, fetch')).toBe(true);

        await browser.close();
        done();
      } catch (error) {
        done(error);
      }
    });

    // eslint-disable-next-line
    it(`should use fetch to request auth code, then token exchange with ${browserType}`, async (done) => {
      try {
        const { browser, messageArray, networkArray } = await setupAndGo(
          browserType,
          'authn-central-login/?support=modern',
        );

        // Test assertions
        // Test log messages
        expect(messageArray.includes('OAuth authorization successful')).toBe(true);
        expect(messageArray.includes('Test script complete')).toBe(true);
        // Test network requests
        expect(networkArray.includes('/am/oauth2/realms/root/authorize, fetch')).toBe(true);
        expect(networkArray.includes('/am/oauth2/realms/root/access_token, fetch')).toBe(true);

        await browser.close();
        done();
      } catch (error) {
        done(error);
      }
    });

    // eslint-disable-next-line
    it(`should full redirect for login to request auth code, then token exchange with ${browserType}`, async (done) => {
      try {
        const { browser, messageArray, networkArray } = await setupAndGo(
          browserType,
          'authn-central-login/?support=modern&preAuthenticated=false',
        );

        // Test assertions
        // Test log messages
        expect(messageArray.includes('OAuth authorization successful')).toBe(true);
        expect(messageArray.includes('Test script complete')).toBe(true);
        // Test network requests
        expect(networkArray.includes('/am/oauth2/realms/root/authorize, fetch')).toBe(true);
        expect(networkArray.includes('/am/oauth2/realms/root/access_token, fetch')).toBe(true);

        await browser.close();
        done();
      } catch (error) {
        done(error);
      }
    });

    // eslint-disable-next-line
    it(`should successfully take code & state params for token exchange with ${browserType}`, async (done) => {
      try {
        const { browser, messageArray, networkArray } = await setupAndGo(
          browserType,
          'authn-central-login/?state=abc&code=xyz',
        );

        // Test assertions
        // Test log messages
        expect(messageArray.includes('OAuth authorization successful')).toBe(true);
        expect(messageArray.includes('Test script complete')).toBe(true);
        // Test network requests
        // Authorize endpoint should NOT be called using document or fetch
        expect(networkArray.includes('/am/oauth2/realms/root/authorize, document')).toBe(false);
        expect(networkArray.includes('/am/oauth2/realms/root/authorize, fetch')).toBe(false);
        expect(networkArray.includes('/am/oauth2/realms/root/access_token, fetch')).toBe(true);

        await browser.close();
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
