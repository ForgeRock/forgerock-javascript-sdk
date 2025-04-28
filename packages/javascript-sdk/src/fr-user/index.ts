/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import type { ConfigOptions } from '../config';
import type { FRStepHandler } from '../fr-auth/fr-step';
import type FRStep from '../fr-auth/fr-step';
import { FRLogger } from '../util/logger';
import OAuth2Client from '../oauth2-client';
import SessionManager from '../session-manager';
import TokenManager from '../token-manager';
import type { LogoutOptions } from '../oauth2-client/interfaces';
import Config from '../config';
import TokenStorage from '../token-storage';
import { getEndpointPath } from '../util/url';

/**
 * High-level API for logging a user in/out and getting profile information.
 */
abstract class FRUser {
  /**
   * Logs the user in with the specified step handler, acquires OAuth tokens, and retrieves
   * user profile.  **Currently not implemented.**
   *
   * @typeparam T The type of user object expected
   * @param handler The function to invoke when handling authentication steps
   * @param options Configuration overrides
   */
  public static async login<T>(
    handler: FRStepHandler,
    options?: ConfigOptions,
  ): Promise<FRStep | T> {
    FRLogger.info(handler, options); // Avoid lint errors
    throw new Error('FRUser.login() not implemented');
  }

  /**
   * Ends the user's session and revokes OAuth tokens.
   *
   * @param options Configuration overrides
   */
  public static async logout(options?: LogoutOptions): Promise<void> {
    // Shallow copy options to delete redirect prop
    const configOptions = { ...options };
    delete configOptions.redirect;
    const { realmPath, serverConfig } = Config.get(configOptions);

    if (getEndpointPath('sessions', realmPath, serverConfig.paths)) {
      // Just log any exceptions that are thrown, but don't abandon the flow
      try {
        // Both invalidates the session on the server AND removes browser cookie
        await SessionManager.logout(configOptions);
      } catch (error) {
        FRLogger.warn('Session logout was not successful');
      }
    }

    if (options?.redirect === false) {
      try {
        // Invalidates session on the server tied to the ID Token
        await OAuth2Client.endSession({ ...options });
      } catch (error) {
        FRLogger.warn('OAuth endSession was not successful');
      }
    }

    try {
      await OAuth2Client.revokeToken(configOptions);
    } catch (error) {
      FRLogger.warn('OAuth revokeToken was not successful');
    }

    // Grab tokens and keep in closure
    const storedTokens = await TokenStorage.get();
    const { idToken = '' } = storedTokens || {};

    // Remove tokens locally
    await TokenManager.deleteTokens();

    if (options?.redirect !== false) {
      try {
        // Pass in the original `options` as it's needed for redirect control
        await OAuth2Client.endSession({ ...options, idToken });
      } catch (error) {
        FRLogger.warn('OAuth endSession was not successful');
      }
    }
  }
}

export default FRUser;
