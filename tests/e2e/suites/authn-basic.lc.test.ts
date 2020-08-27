/*
 * @forgerock/javascript-sdk
 *
 * authn-basic.lc.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { setupAndGo } from '../utilities/setup-and-go';

describe('Test Basic login flow', () => {
  ['chromium', 'webkit', 'firefox'].forEach((browserType) => {
    it(`should login successfully and then log out with ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(browserType, 'authn-basic/');

      const messageArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });

      await page.waitForSelector('.Test_Complete');

      // Test assertions
      expect(messageArray.includes('Basic login successful')).toBe(true);
      expect(messageArray.includes('Logout successful')).toBe(true);
      expect(messageArray.includes('Starting authentication with service')).toBe(true);
      expect(messageArray.includes('Continuing authentication with service')).toBe(true);

      await browser.close();
      done();
    });
  });
});
