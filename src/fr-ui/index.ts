/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { ConfigOptions } from '../config';

/**
 * Represents a UI implementation to be used with `FRUser.loginWithUI(ui)`.
 */
interface FRUI {
  clearState(): void;
  getSession(options?: ConfigOptions): Promise<string>;
}

export default FRUI;
