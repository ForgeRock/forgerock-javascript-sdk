/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020-2024 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { DEFAULT_TIMEOUT, DEFAULT_OAUTH_THRESHOLD, PREFIX } from './constants';
import { convertWellKnown, fetchWellKnown } from './helpers';
import type {
  AsyncConfigOptions,
  ConfigOptions,
  ServerConfig,
  StepOptions,
  ValidConfigOptions,
} from './interfaces';

/**
 * Sets defaults for options that are required but have no supplied value
 * @param options The options to set defaults for
 * @returns options The options with defaults
 */
function setDefaults(options: ConfigOptions): ConfigOptions {
  return {
    ...options,
    oauthThreshold: options.oauthThreshold || DEFAULT_OAUTH_THRESHOLD,
    logLevel: options.logLevel || 'none',
    prefix: options.prefix || PREFIX,
  };
}

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
    this.options = { ...setDefaults(options) };
  }

  /**
   * @method setAsync - Asynchronously calls the WellKnown endpoint to collect the APIs for OAuth
   * @param {AsyncConfigOptions} options - config options with wellknown endpoint URL
   * @returns {Promise<void>} - Returns a success or failure message object
   */
  public static async setAsync(options: AsyncConfigOptions): Promise<void> {
    if (!options.serverConfig.wellknown) {
      throw new Error(
        'Missing well-known property. Use `Config.set` method if not using well-known endpoint.',
      );
    }
    if (options.serverConfig.baseUrl) {
      console.warn(
        'The baseUrl property passed in will be ignored, and replaced with well-known origin.',
      );
    }

    // Fetch wellknown endpoint for OAuth/OIDC API URLs
    const json = await fetchWellKnown(options);
    // Use wellknown object and convert to custom paths
    const serverConfig = convertWellKnown(json);

    // Remove wellknown property as it's no longer needed
    delete options.serverConfig.wellknown;
    // Assign to a new config object with the "sync" config type
    const newConfig = options as ConfigOptions;
    newConfig.serverConfig = serverConfig;

    // Set the config as usual
    this.set(newConfig);
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
export type { ConfigOptions, ServerConfig, ValidConfigOptions, StepOptions };
export { DEFAULT_TIMEOUT };
