/**
 *
 * Copyright (c) 2023 - 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import { tokenExpiryWithinThreshold } from './token.utils.js';
import { vi } from 'vitest';

const oauthThreshold = 120000;
const aboutToExpire = 60000;
const notAboutToExpire = 180000;
const tokenExpiryNotSet = undefined;

describe('Test Token Manager utils', () => {
  // We want to avoid race conditions between expected and actual date values
  beforeAll(() => {
    // Override date functions to return a static date temporarily
    vi.useFakeTimers();
    vi.setSystemTime(new Date('25 Mar 2022 16:50:00 GMT').getTime());
  });

  it('Should return true if tokens expire within configured threshold', () => {
    const expiresSoon = tokenExpiryWithinThreshold(oauthThreshold, Date.now() + aboutToExpire);
    expect(expiresSoon).toBe(true);
  });

  it('Should return false if tokens expire outside configured threshold', () => {
    const expiresSoon = tokenExpiryWithinThreshold(oauthThreshold, Date.now() + notAboutToExpire);
    expect(expiresSoon).toBe(false);
  });

  it('Should return false if token expiry is not set', () => {
    const expiresSoon = tokenExpiryWithinThreshold(
      tokenExpiryNotSet,
      Date.now() + notAboutToExpire,
    );
    expect(expiresSoon).toBe(false);
  });

  afterAll(() => {
    // Reset timers
    vi.useRealTimers();
  });
});
