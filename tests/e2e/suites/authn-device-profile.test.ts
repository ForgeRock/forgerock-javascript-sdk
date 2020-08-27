/*
 * @forgerock/javascript-sdk
 *
 * authn-device-profile.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { setupAndGo } from '../utilities/setup-and-go';

describe('Test bad login flow', () => {
  ['chromium', 'webkit', 'firefox'].forEach((browserType) => {
    it(`Login with device profile callback ${browserType}`, async (done) => {
      const { browser, page } = await setupAndGo(browserType, 'authn-device-profile/', {
        allowGeo: true,
        tree: 'UsernamePasswordDevice',
      });

      const messageArray = [];

      page.on('console', (msg) => {
        messageArray.push(msg.text());
      });

      await page.waitForSelector('.Test_Complete');

      // Test assertions
      expect(messageArray.includes('Collecting profile ...')).toBe(true);
      expect(messageArray.includes('Profile collected.')).toBe(true);
      expect(messageArray.includes('Login with profile successful.')).toBe(true);

      await browser.close();
      done();
    });
  });
});
