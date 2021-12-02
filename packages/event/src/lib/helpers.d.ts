import { CallbackContainer, Listener } from './interfaces';
/** @hidden */
declare function add(container: CallbackContainer, type: string, listener: Listener): void;
/** @hidden */
declare function remove(container: CallbackContainer, type: string, listener: Listener): void;
/** @hidden */
declare function clear(container: CallbackContainer, type?: string): void;
export { add, clear, remove };
