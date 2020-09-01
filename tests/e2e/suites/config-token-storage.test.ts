/*
 * @forgerock/javascript-sdk
 *
 * config-token-storage.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { setupAndGo } from '../utilities/setup-and-go';

describe('Test oauth login flow with localStorage', () => {
  ['chromium', 'webkit', 'firefox'].forEach((browserType) => {
    it(`Login successfully with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(browserType, 'config-token-storage/', {
        tokenStore: 'sessionStorage',
      });

      const messageArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });

      await page.waitForSelector('.Test_Complete');

      // Test assertions
      expect(messageArray.includes('OAuth login successful')).toBe(true);
      expect(messageArray.includes('Access token is baz.')).toBe(true);
      expect(messageArray.includes('Logout successful')).toBe(true);

      await browser.close();
      done();
    });

    it(`Login successfully with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(browserType, 'config-token-storage/', {
        tokenStore: 'indexedDB',
      });

      const messageArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });

      await page.waitForSelector('.Test_Complete');

      // Test assertions
      expect(messageArray.includes('OAuth login successful')).toBe(true);
      expect(messageArray.includes('Access token is baz.')).toBe(true);
      expect(messageArray.includes('Logout successful')).toBe(true);

      await browser.close();
      done();
    });

    it(`Login successfully with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(browserType, 'config-token-storage/', {
        tokenStore: 'customStore',
      });

      const messageArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });

      await page.waitForSelector('.Test_Complete');

      // Test assertions
      expect(messageArray.includes('OAuth login successful')).toBe(true);
      expect(messageArray.includes('Custom token setter used.')).toBe(true);
      expect(messageArray.includes('Custom token getter used.')).toBe(true);
      expect(messageArray.includes('Custom token remover used.')).toBe(true);
      expect(messageArray.includes('Access token is baz.')).toBe(true);
      expect(messageArray.includes('Logout successful')).toBe(true);

      await browser.close();
      done();
    });
  });
});
