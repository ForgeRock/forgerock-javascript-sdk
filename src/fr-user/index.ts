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
import FRStep, { FRStepHandler } from '../fr-auth/fr-step';
import FRUI from '../fr-ui';
import OAuth2Client from '../oauth2-client';
import SessionManager from '../session-manager';
import TokenManager from '../token-manager';
import UserManager from '../user-manager';

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
    console.info(handler, options); // Avoid lint errors
    throw new Error('FRUser.login() not implemented');
  }

  /**
   * Logs the user in with the specified UI, acquires OAuth tokens, and retrieves user profile.
   *
   * @typeparam T The type of user object expected
   * @param ui The UI instance to use to acquire a session
   * @param options Configuration overrides
   */
  public static async loginWithUI<T>(ui: FRUI, options?: ConfigOptions): Promise<T> {
    try {
      await ui.getSession(options);
      await TokenManager.getTokens({ forceRenew: true });
      const currentUser = await UserManager.getCurrentUser();
      return currentUser as T;
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  /**
   * Ends the user's session and revokes OAuth tokens.
   *
   * @param options Configuration overrides
   */
  public static async logout(options?: ConfigOptions): Promise<void> {
    // Just log any exceptions that are thrown, but don't abandon the flow
    try {
      // Both invalidates the session on the server AND removes browser cookie
      await SessionManager.logout();
    } catch (error) {
      console.warn('Session logout was not successful');
    }
    try {
      // Invalidates session on the server tied to the ID Token
      // Needed for Express environment as session logout is unavailable
      await OAuth2Client.endSession(options);
    } catch (error) {
      console.warn('OAuth endSession was not successful');
    }
    try {
      await OAuth2Client.revokeToken(options);
    } catch (error) {
      console.warn('OAuth revokeToken was not successful');
    }
    await TokenManager.deleteTokens();
  }
}

export default FRUser;
