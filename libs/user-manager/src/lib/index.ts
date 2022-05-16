/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { ConfigOptions } from '@forgerock/libs/shared-types';
import { OAuth2Client } from '@forgerock/libs/oauth-2-client';

/**
 * Provides access to the current user's profile.
 */
abstract class UserManager {
  /**
   * Gets the current user's profile.
   */
  public static getCurrentUser(options?: ConfigOptions): Promise<unknown> {
    return OAuth2Client.getUserInfo(options);
  }
}

export { UserManager };
