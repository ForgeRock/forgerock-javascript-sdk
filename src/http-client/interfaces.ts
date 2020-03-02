import { ConfigOptions } from '../config/interfaces';

/**
 * Options to use when making an HTTP call.
 */
export interface HttpClientRequestOptions {
  bypassAuthentication?: boolean;
  txnAuth?: {
    init: boolean;
    options?: ConfigOptions;
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

export interface TxnAuthJSON {
  resource: string;
  actions: { [key: string]: string };
  attributes: { [key: string]: string };
  advices: { TransactionConditionAdvice: string[] } | null;
  ttl: number;
}
