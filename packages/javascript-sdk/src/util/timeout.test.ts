/*
 * @forgerock/javascript-sdk
 *
 * timeout.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { withTimeout } from './timeout';

describe('withTimeout function', () => {
  it('should return the promise passed', async () => {
    const promise = new Promise((res) => res('ok'));
    const result = await withTimeout(promise, 500);
    expect(result).toBe('ok');
  });
  it('should return the promise passed if it rejects', async () => {
    const promise = new Promise((_, rej) => rej('rejected'));
    expect(withTimeout(promise, 500)).rejects.toBe('rejected');
  });
  it('should return the window timeout', async () => {
    const promise = new Promise(() => 'ok');
    await withTimeout(promise, 1).catch((res) => expect(res).toEqual(new Error('Timeout')));
  });
});
