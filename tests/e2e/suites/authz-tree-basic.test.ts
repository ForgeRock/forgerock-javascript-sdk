/*
 * @forgerock/javascript-sdk
 *
 * authz-tree-basic.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { setupAndGo } from '../utilities/setup-and-go';
import browsers from '../utilities/browsers';

describe('Test Transaction Authorization flow', () => {
  browsers.forEach((browserType) => {
    it(`Trigger Txn Auth appropriately with ${browserType}`, async (done) => {
      try {
        const { browser, messageArray } = await setupAndGo(browserType, 'authz-txn-basic/');

        // Test assertions
        expect(messageArray.includes('IG resource requires additional authorization')).toBe(true);
        expect(messageArray.includes('Rest resource requires additional authorization')).toBe(true);
        expect(messageArray.includes('Request to IG resource successfully responded')).toBe(true);
        expect(messageArray.includes('Request to REST resource successfully responded')).toBe(true);
        expect(messageArray.includes('Starting authentication with composite advice')).toBe(true);
        expect(messageArray.includes('Continuing authentication with composite advice')).toBe(true);

        await browser.close();
        done();
      } catch (error) {
        done(error);
      }
    });
  });
});
