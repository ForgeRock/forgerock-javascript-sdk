/**
 * An event-handling function.
 */
declare type Listener = (e: FREvent) => void;
/**
 * A container for mapping listener functions to event types.
 */
interface CallbackContainer {
    [key: string]: Listener[];
}
interface FREvent {
    type: string;
}
export { CallbackContainer, FREvent, Listener };
