import { FRCallbackFactory } from '../fr-auth/callbacks/factory';

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

type ConfigurablePaths =
  | 'authenticate'
  | 'authorize'
  | 'accessToken'
  | 'endSession'
  | 'userInfo'
  | 'revoke'
  | 'sessions';

/**
 * Optional configuration for custom paths for actions
 */
interface CustomPathConfig {
  authenticate?: string;
  authorize?: string;
  accessToken?: string;
  endSession?: string;
  userInfo?: string;
  revoke?: string;
  sessions?: string;
}

/**
 * Configuration settings for connecting to a server.
 */
interface ServerConfig {
  baseUrl: string;
  paths?: CustomPathConfig;
  timeout: number;
}

/**
 * Configuration options with a server configuration specified.
 */
interface ValidConfigOptions extends ConfigOptions {
  serverConfig: ServerConfig;
}

export { ConfigOptions, ConfigurablePaths, CustomPathConfig, ServerConfig, ValidConfigOptions };
