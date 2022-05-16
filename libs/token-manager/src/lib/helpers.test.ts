/*
 * @forgerock/javascript-sdk
 *
 * helpers.test.ts
 *
 * Copyright (c) 2022 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { tokensWillExpireWithinThreshold } from './helpers';
import {
  oauthThreshold,
  tokenExpiryWithinThreshold,
  tokenExpiryOutsideThreshold,
  tokenExpiryNotSet,
} from './token-manager.mock.data';

describe('Test Token Manager utils', () => {
  // We want to avoid race conditions between expected and actual date values
  beforeAll(() => {
    // Override date functions to return a static date temporarily
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('25 Mar 2022 16:50:00 GMT').getTime());
  });

  it('Should return true if tokens expire within configured threshold', () => {
    const expiresSoon = tokensWillExpireWithinThreshold(
      oauthThreshold,
      Date.now() + tokenExpiryWithinThreshold,
    );
    expect(expiresSoon).toBe(true);
  });

  it('Should return false if tokens expire outside configured threshold', () => {
    const expiresSoon = tokensWillExpireWithinThreshold(
      oauthThreshold,
      Date.now() + tokenExpiryOutsideThreshold,
    );
    expect(expiresSoon).toBe(false);
  });

  it('Should return false if token expiry is not set', () => {
    const expiresSoon = tokensWillExpireWithinThreshold(
      oauthThreshold,
      Date.now() + tokenExpiryNotSet,
    );
    expect(expiresSoon).toBe(false);
  });

  afterAll(() => {
    // Reset timers
    jest.useRealTimers();
  });
});
