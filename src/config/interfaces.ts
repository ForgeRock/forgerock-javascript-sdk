/*
 * @forgerock/javascript-sdk
 *
 * interfaces.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { ActionTypes } from './enums';
import { FRCallbackFactory } from '../fr-auth/callbacks/factory';
import { Tokens } from '../shared/interfaces';

interface Action {
  type: ActionTypes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
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
  support?: 'modern' | 'legacy' | undefined;
  tokenStore?: TokenStoreObject | 'indexedDB' | 'sessionStorage' | 'localStorage';
  tree?: string;
  type?: string;
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

type RequestMiddleware = (req: RequestObj, action: Action, next: () => RequestObj) => RequestObj;

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
  timeout: number;
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
}

export {
  Action,
  ConfigOptions,
  ConfigurablePaths,
  CustomPathConfig,
  RequestMiddleware,
  RequestObj,
  ServerConfig,
  TokenStoreObject,
  ValidConfigOptions,
};
