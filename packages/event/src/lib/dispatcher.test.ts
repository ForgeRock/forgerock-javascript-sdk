/*
 * @forgerock/javascript-sdk
 *
 * dispatcher.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { FREvent } from './interfaces';
import Dispatcher from '.';

describe('The event dispatcher', () => {
  const dispatcher = new Dispatcher();

  it('registers and deregisters listeners', () => {
    const type = 'test';
    const event: FREvent = { type };
    const listener = jest.fn();

    dispatcher.addEventListener(type, listener);
    dispatcher.dispatchEvent(event);
    expect(listener).toBeCalledTimes(1);

    dispatcher.removeEventListener(type, listener);
    dispatcher.dispatchEvent(event);
    expect(listener).toBeCalledTimes(1);
  });

  it('only calls listeners for the correct type', () => {
    const event: FREvent = { type: 'foo' };
    const listener = jest.fn();

    dispatcher.addEventListener('bar', listener);
    dispatcher.dispatchEvent(event);
    expect(listener).toBeCalledTimes(0);
  });

  it('clears all listeners', () => {
    const event1: FREvent = { type: 'foo' };
    const event2: FREvent = { type: 'bar' };
    const listener = jest.fn();

    dispatcher.addEventListener('foo', listener);
    dispatcher.addEventListener('bar', listener);

    dispatcher.dispatchEvent(event1);
    expect(listener).toBeCalledTimes(1);
    dispatcher.dispatchEvent(event2);
    expect(listener).toBeCalledTimes(2);

    dispatcher.clearEventListeners();
    dispatcher.dispatchEvent(event1);
    dispatcher.dispatchEvent(event2);
    expect(listener).toBeCalledTimes(2);
  });

  it('allows multiple instances', () => {
    const dispatcher2 = new Dispatcher();
    const eventType = 'foo';
    const event: FREvent = { type: eventType };
    const listener = jest.fn();
    dispatcher.addEventListener(eventType, listener);
    dispatcher2.addEventListener(eventType, listener);

    dispatcher.dispatchEvent(event);
    expect(listener).toBeCalledTimes(1);

    dispatcher2.dispatchEvent(event);
    expect(listener).toBeCalledTimes(2);

    dispatcher.clearEventListeners();
    dispatcher.dispatchEvent(event);
    expect(listener).toBeCalledTimes(2);

    dispatcher2.dispatchEvent(event);
    expect(listener).toBeCalledTimes(3);

    dispatcher2.clearEventListeners();
    dispatcher2.dispatchEvent(event);
    expect(listener).toBeCalledTimes(3);
  });
});
