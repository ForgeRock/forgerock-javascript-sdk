import { CallbackContainer, FREvent, Listener } from './interfaces';
/**
 * Event dispatcher for subscribing and publishing categorized events.
 */
declare class Dispatcher {
    private callbacks;
    /**
     * Subscribes to an event type.
     *
     * @param type The event type
     * @param listener The function to subscribe to events of this type
     */
    addEventListener(type: string, listener: Listener): void;
    /**
     * Unsubscribes from an event type.
     *
     * @param type The event type
     * @param listener The function to unsubscribe from events of this type
     */
    removeEventListener(type: string, listener: Listener): void;
    /**
     * Unsubscribes all listener functions to a single event type or all event types.
     *
     * @param type The event type, or all event types if not specified
     */
    clearEventListeners(type?: string): void;
    /**
     * Publishes an event.
     *
     * @param event The event object to publish
     */
    dispatchEvent<T extends FREvent>(event: T): void;
}
export default Dispatcher;
export { CallbackContainer, FREvent, Listener };
