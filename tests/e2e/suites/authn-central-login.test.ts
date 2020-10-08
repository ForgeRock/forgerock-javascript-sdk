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

describe('Test OAuth login flow', () => {
  ['chromium', 'webkit', 'firefox'].forEach((browserType) => {
    // eslint-disable-next-line
    it(`should use invisible iframe to request auth code, then token exchange with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(browserType, 'authn-central-login/');

      const messageArray = [];
      const networkArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });
      page.on('request', (req) => {
        networkArray.push(`${new URL(req.url()).pathname}, ${req.resourceType()}`);
      });

      await page.waitForSelector('.Test_Complete');

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
    });

    // eslint-disable-next-line
    it(`should use fetch to request auth code, then token exchange with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(
        browserType,
        'authn-central-login/?support=modern',
      );

      const messageArray = [];
      const networkArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });
      page.on('request', (req) => {
        networkArray.push(`${new URL(req.url()).pathname}, ${req.resourceType()}`);
      });

      await page.waitForSelector('.Test_Complete');

      // Test assertions
      // Test log messages
      expect(messageArray.includes('OAuth authorization successful')).toBe(true);
      expect(messageArray.includes('Test script complete')).toBe(true);
      // Test network requests
      expect(networkArray.includes('/am/oauth2/realms/root/authorize, fetch')).toBe(true);
      expect(networkArray.includes('/am/oauth2/realms/root/access_token, fetch')).toBe(true);

      await browser.close();
      done();
    });

    // eslint-disable-next-line
    it(`should successfully take code & state params for token exchange with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(
        browserType,
        'authn-central-login/?state=abc&code=xyz',
      );

      const messageArray = [];
      const networkArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });
      page.on('request', (req) => {
        networkArray.push(`${new URL(req.url()).pathname}, ${req.resourceType()}`);
      });

      await page.waitForSelector('.Test_Complete');

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
    });
  });
});
