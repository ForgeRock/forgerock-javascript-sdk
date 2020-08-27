/*
 * @forgerock/javascript-sdk
 *
 * interfaces.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { ConfigOptions } from '../config/interfaces';
import FRStep from '../fr-auth/fr-step';

export interface Advices {
  AuthenticateToServiceConditionAdvice?: string[];
  TransactionConditionAdvice?: string[];
}

export declare type HandleStep = (step: FRStep) => Promise<FRStep>;

/**
 * Options to use when making an HTTP call.
 */
export interface HttpClientRequestOptions {
  bypassAuthentication?: boolean;
  authorization?: {
    config?: ConfigOptions;
    handleStep: HandleStep;
    idToken?: string;
    txnID?: string;
  };
  init: RequestInit;
  requiresNewToken?: RequiresNewTokenFn;
  timeout: number;
  url: string;
}

/**
 * A function that determines whether a new token is required based on a HTTP response.
 */
export type RequiresNewTokenFn = (res: Response) => boolean;

export interface AuthorizationJSON {
  resource: string;
  actions: { [key: string]: string };
  attributes: { [key: string]: string };
  advices: Advices | null;
  ttl: number;
}
