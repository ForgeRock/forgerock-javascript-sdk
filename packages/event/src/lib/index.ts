/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { add, clear, remove } from './helpers';
import { CallbackContainer, FREvent, Listener } from './interfaces';

/**
 * Event dispatcher for subscribing and publishing categorized events.
 */
class Dispatcher {
  private callbacks: CallbackContainer = {};

  /**
   * Subscribes to an event type.
   *
   * @param type The event type
   * @param listener The function to subscribe to events of this type
   */
  public addEventListener(type: string, listener: Listener): void {
    add(this.callbacks, type, listener);
  }

  /**
   * Unsubscribes from an event type.
   *
   * @param type The event type
   * @param listener The function to unsubscribe from events of this type
   */
  public removeEventListener(type: string, listener: Listener): void {
    remove(this.callbacks, type, listener);
  }

  /**
   * Unsubscribes all listener functions to a single event type or all event types.
   *
   * @param type The event type, or all event types if not specified
   */
  public clearEventListeners(type?: string): void {
    clear(this.callbacks, type);
  }

  /**
   * Publishes an event.
   *
   * @param event The event object to publish
   */
  public dispatchEvent<T extends FREvent>(event: T): void {
    if (!this.callbacks[event.type]) {
      return;
    }
    for (const listener of this.callbacks[event.type]) {
      listener(event);
    }
  }
}

export default Dispatcher;
export { CallbackContainer, FREvent, Listener };
