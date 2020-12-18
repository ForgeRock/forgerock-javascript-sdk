/*
 * @forgerock/javascript-sdk
 *
 * interfaces.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Tokens } from '../shared/interfaces';

/** @hidden */
interface TokenDbEventTarget extends EventTarget {
  result?: Tokens;
}

/** @hidden */
interface TokenDbEvent extends Event {
  target: TokenDbEventTarget | null;
}

export { TokenDbEvent, TokenDbEventTarget };
