/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import OAuth2Client from '../oauth2-client';

/**
 * Provides access to the current user's profile.
 */
abstract class UserManager {
  /**
   * Gets the current user's profile.
   */
  public static getCurrentUser(): Promise<unknown> {
    return OAuth2Client.getUserInfo();
  }
}

export default UserManager;
