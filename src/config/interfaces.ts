import { FRCallbackFactory } from '../fr-auth/callbacks/factory';

/**
 * Configuration settings for connecting to a server.
 */
interface ServerConfig {
  baseUrl: string;
  timeout: number;
}

/**
 * Configuration options.
 */
interface ConfigOptions {
  callbackFactory?: FRCallbackFactory;
  clientId?: string;
  realmPath?: string;
  redirectUri?: string;
  scope?: string;
  serverConfig?: ServerConfig;
  tree?: string;
}

/**
 * Configuration options with a server configuration specified.
 */
interface ValidConfigOptions extends ConfigOptions {
  serverConfig: ServerConfig;
}

export { ConfigOptions, ServerConfig, ValidConfigOptions };
