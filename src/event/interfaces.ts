/*
 * @forgerock/javascript-sdk
 *
 * interfaces.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/**
 * An event-handling function.
 */
type Listener = (e: FREvent) => void;

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
