/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { DEFAULT_TIMEOUT } from './constants';
import { ConfigOptions, ServerConfig, ValidConfigOptions } from './interfaces';

/**
 * Utility for merging configuration defaults with one-off options.
 *
 * Example:
 *
 * ```js
 * // Establish configuration defaults
 * Config.set({
 *   clientId: 'myApp',
 *   serverConfig: { baseUrl: 'https://openam-domain.com/am' },
 *   tree: 'UsernamePassword'
 * });
 *
 * // Specify overrides as needed
 * const configOverrides = { tree: 'PasswordlessWebAuthn' };
 * const step = await FRAuth.next(undefined, configOverrides);
 */
abstract class Config {
  private static options: ConfigOptions;

  /**
   * Sets the default options.
   *
   * @param options The options to use as defaults
   */
  public static set(options: ConfigOptions): void {
    if (!this.isValid(options)) {
      throw new Error('Configuration is invalid');
    }
    if (options.serverConfig) {
      this.validateServerConfig(options.serverConfig);
    }
    this.options = { ...options };
  }

  /**
   * Merges the provided options with the default options.  Ensures a server configuration exists.
   *
   * @param options The options to merge with defaults
   */
  public static get(options?: ConfigOptions): ValidConfigOptions {
    if (!this.options && !options) {
      throw new Error('Configuration has not been set');
    }

    const merged = { ...this.options, ...options };
    if (!merged.serverConfig || !merged.serverConfig.baseUrl) {
      throw new Error('Server configuration has not been set');
    }

    return merged as ValidConfigOptions;
  }

  private static isValid(options: ConfigOptions): boolean {
    return !!(options && options.serverConfig);
  }

  private static validateServerConfig(serverConfig: ServerConfig): void {
    if (!serverConfig.timeout) {
      serverConfig.timeout = DEFAULT_TIMEOUT;
    }

    const url = serverConfig.baseUrl;
    if (url && url.charAt(url.length - 1) !== '/') {
      serverConfig.baseUrl = url + '/';
    }
  }
}

export default Config;
export { DEFAULT_TIMEOUT, ConfigOptions, ServerConfig, ValidConfigOptions };
