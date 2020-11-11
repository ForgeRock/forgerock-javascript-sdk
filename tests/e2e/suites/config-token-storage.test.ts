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
import browsers from '../utilities/browsers';

describe('Test oauth login flow with localStorage', () => {
  browsers.forEach((browserType) => {
    it(`Login successfully with ${browserType}`, async (done) => {
      try {
        const { browser, messageArray } = await setupAndGo(browserType, 'config-token-storage/', {
          tokenStore: 'sessionStorage',
        });

        // Test assertions
        expect(messageArray.includes('Access token is correct')).toBe(true);
        expect(messageArray.includes('Logout successful')).toBe(true);

        await browser.close();
        done();
      } catch (error) {
        done(error);
      }
    });

    it(`Login successfully with ${browserType}`, async (done) => {
      try {
        const { browser, messageArray } = await setupAndGo(browserType, 'config-token-storage/', {
          tokenStore: 'indexedDB',
        });

        // Test assertions
        expect(messageArray.includes('Access token is correct')).toBe(true);
        expect(messageArray.includes('Logout successful')).toBe(true);

        await browser.close();
        done();
      } catch (error) {
        done(error);
      }
    });

    it(`Login successfully with ${browserType}`, async (done) => {
      try {
        const { browser, messageArray } = await setupAndGo(browserType, 'config-token-storage/', {
          tokenStore: 'customStore',
        });

        // Test assertions
        expect(messageArray.includes('Custom token setter used.')).toBe(true);
        expect(messageArray.includes('Custom token getter used.')).toBe(true);
        expect(messageArray.includes('Custom token remover used.')).toBe(true);
        expect(messageArray.includes('Access token is correct')).toBe(true);
        expect(messageArray.includes('Logout successful')).toBe(true);

        await browser.close();
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
