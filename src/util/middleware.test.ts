/*
 * @forgerock/javascript-sdk
 *
 * middleware.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import middlewareWrapper from './middleware';
import middleware from './middleware.mock.data';
import { ActionTypes } from '../config/enums';

jest.mock('../config/index', () => ({
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get: () => ({ middleware }),
}));

describe('Middleware should be called with an action', () => {
  it('should run all middleware testing action for letter and "a"', () => {
    const newReq = middlewareWrapper(
      { url: new URL('https://www.example.com'), init: {} },
      'a' as ActionTypes,
    );
    expect(newReq.init).toStrictEqual({ headers: { 'x-letter': 'true', 'x-char': 'a' } });
    expect(newReq.url.toString()).toBe('https://www.example.com/?letter=true&char=a');
  });
  it('should run all middleware testing action for number and "1"', () => {
    const newReq = middlewareWrapper(
      { url: new URL('https://www.example.com'), init: {} },
      '1' as ActionTypes,
    );
    expect(newReq.init).toStrictEqual({ headers: { 'x-letter': 'false', 'x-char': '1' } });
    expect(newReq.url.toString()).toBe('https://www.example.com/?letter=false&char=1');
  });
  it('should run all middleware testing action for no match', () => {
    const newReq = middlewareWrapper(
      { url: new URL('https://www.example.com'), init: {} },
      'z' as ActionTypes,
    );
    expect(newReq.init).toStrictEqual({});
    expect(newReq.url.toString()).toBe('https://www.example.com/');
  });
  it('should run all middleware testing add action with payload', () => {
    const newReq = middlewareWrapper(
      { url: new URL('https://www.example.com'), init: { headers: { 'x-number': '3' } } },
      'ADD' as ActionTypes,
      'b',
    );
    expect(newReq.init).toStrictEqual({ headers: { 'x-number': '3', 'x-char': 'a,b' } });
  });
  it('should not allow middleware to reassign `req`', () => {
    const newReq = middlewareWrapper(
      { url: new URL('https://www.example.com'), init: {} },
      'REASSIGNMENT' as ActionTypes,
    );
    expect(newReq.init).toStrictEqual({});
    expect(newReq.url.toString()).toBe('https://www.example.com/');
  });
  it('should not allow middleware to mutate `action`', () => {
    try {
      middlewareWrapper(
        { url: new URL('https://www.example.com'), init: {} },
        'MUTATE-ACTION' as ActionTypes,
      );
    } catch (err) {
      expect(err.message).toBe(`Cannot assign to read only property 'type' of object '#<Object>'`);
    }
  });
});
