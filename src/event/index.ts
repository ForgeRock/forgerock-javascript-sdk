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
  public addEventListener(type: string, listener: Listener) {
    add(this.callbacks, type, listener);
  }

  /**
   * Unsubscribes from an event type.
   *
   * @param type The event type
   * @param listener The function to unsubscribe from events of this type
   */
  public removeEventListener(type: string, listener: Listener) {
    remove(this.callbacks, type, listener);
  }

  /**
   * Unsubscribes all listener functions to a single event type or all event types.
   *
   * @param type The event type, or all event types if not specified
   */
  public clearEventListeners(type?: string) {
    clear(this.callbacks, type);
  }

  /**
   * Publishes an event.
   *
   * @param event The event object to publish
   */
  public dispatchEvent<T extends FREvent>(event: T) {
    if (!this.callbacks[event.type]) {
      return;
    }
    for (const listener of this.callbacks[event.type]) {
      listener(event);
    }
  }
}

/** @hidden */
function add(container: CallbackContainer, type: string, listener: Listener) {
  container[type] = container[type] || [];
  if (container[type].indexOf(listener) < 0) {
    container[type].push(listener);
  }
}

/** @hidden */
function remove(container: CallbackContainer, type: string, listener: Listener) {
  if (!container[type]) {
    return;
  }
  const index = container[type].indexOf(listener);
  if (index >= 0) {
    container[type].splice(index, 1);
  }
}

/** @hidden */
function clear(container: CallbackContainer, type?: string) {
  Object.keys(container).forEach((k: string) => {
    if (!type || k === type) {
      delete container[k];
    }
  });
}

export default Dispatcher;
export { CallbackContainer, FREvent, Listener };
