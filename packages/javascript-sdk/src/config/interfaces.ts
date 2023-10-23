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
import type { Tokens } from '../shared/interfaces';

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
  prefix?: string;
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

export type {
  Action,
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
};
