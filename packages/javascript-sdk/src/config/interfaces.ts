/*
 * @forgerock/javascript-sdk
 *
 * interfaces.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import type { ActionTypes } from './enums';
import type { FRCallbackFactory } from '../fr-auth/callbacks/factory';
import type { StringDict, Tokens } from '../shared/interfaces';

type LogLevel = 'none' | 'info' | 'warn' | 'error' | 'debug';

interface Action {
  type: ActionTypes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

/**
 * Custom Logger for logger
 */
interface LoggerFunctions<
  W = (...msgs: unknown[]) => void,
  E = (...msgs: unknown[]) => void,
  L = (...msgs: unknown[]) => void,
  I = (...msgs: unknown[]) => void,
> {
  warn?: W;
  error?: E;
  log?: L;
  info?: I;
}
/**
 * Configuration options.
 */
interface ConfigOptions {
  callbackFactory?: FRCallbackFactory;
  clientId?: string;
  middleware?: RequestMiddleware[];
  realmPath?: string;
  redirectUri?: string;
  scope?: string;
  serverConfig?: ServerConfig;
  tokenStore?: TokenStoreObject | 'sessionStorage' | 'localStorage';
  tree?: string;
  type?: string;
  oauthThreshold?: number;
  logLevel?: LogLevel;
  logger?: LoggerFunctions;
  platformHeader?: boolean;
  prefix?: string;
}

/**
 * Async ConfigOptions for well-known endpoint usage
 */
interface AsyncConfigOptions extends Omit<ConfigOptions, 'serverConfig'> {
  serverConfig: AsyncServerConfig;
}

type ConfigurablePaths = keyof CustomPathConfig;
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

type RequestMiddleware = (req: RequestObj, action: Action, next: () => RequestObj) => void;

interface RequestObj {
  url: URL;
  init: RequestInit;
}

/**
 * Configuration settings for connecting to a server.
 */
interface ServerConfig {
  baseUrl: string;
  paths?: CustomPathConfig;
  timeout?: number;
}

/**
 * Configuration settings for async config with well-known
 */
interface AsyncServerConfig extends Omit<ServerConfig, 'baseUrl'> {
  wellknown?: string;
}

/**
 * API for implementing a custom token store
 */
interface TokenStoreObject {
  get: (clientId: string) => Promise<Tokens>;
  set: (clientId: string, token: Tokens) => Promise<void>;
  remove: (clientId: string) => Promise<void>;
}

/**
 * Configuration options with a server configuration specified.
 */
interface ValidConfigOptions extends ConfigOptions {
  serverConfig: ServerConfig;
  logLevel: LogLevel;
}

/**
 * Represents configuration overrides used when requesting the next
 * step in an authentication tree.
 */
interface StepOptions extends ConfigOptions {
  query?: StringDict<string>;
}

interface WellKnownResponse {
  issuer: string;
  authorization_endpoint: string;
  pushed_authorization_request_endpoint?: string;
  token_endpoint: string;
  userinfo_endpoint: string;
  end_session_endpoint: string;
  ping_end_idp_session_endpoint?: string;
  introspection_endpoint: string;
  revocation_endpoint: string;
  jwks_uri?: string;
  device_authorization_endpoint?: string;
  claims_parameter_supported?: boolean;
  request_parameter_supported?: boolean;
  request_uri_parameter_supported?: boolean;
  require_pushed_authorization_requests?: boolean;
  scopes_supported?: string[];
  response_types_supported?: string[];
  response_modes_supported?: string[];
  grant_types_supported?: string[];
  subject_types_supported?: string[];
  id_token_signing_alg_values_supported?: string[];
  userinfo_signing_alg_values_supported?: string[];
  request_object_signing_alg_values_supported?: string[];
  token_endpoint_auth_methods_supported?: string[];
  token_endpoint_auth_signing_alg_values_supported?: string[];
  claim_types_supported?: string[];
  claims_supported?: string[];
  code_challenge_methods_supported?: string[];
}

export type {
  Action,
  AsyncConfigOptions,
  AsyncServerConfig,
  ConfigOptions,
  ConfigurablePaths,
  CustomPathConfig,
  LogLevel,
  LoggerFunctions,
  RequestMiddleware,
  RequestObj,
  ServerConfig,
  TokenStoreObject,
  ValidConfigOptions,
  StepOptions,
  WellKnownResponse,
};
