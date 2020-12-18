/*
 * @forgerock/javascript-sdk
 *
 * helpers.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/**
 * @module
 * @ignore
 * These are private utility functions for HttpClient
 */
import { CustomPathConfig } from '../config/interfaces';
import {
  Advices,
  HttpClientRequestOptions,
  RequiresNewTokenFn,
  AuthorizationJSON,
} from './interfaces';
import { Tokens } from '../shared/interfaces';
import { getEndpointPath, resolve, stringify } from '../util/url';

export function addAuthzInfoToHeaders(
  init: RequestInit,
  advices: Advices,
  tokens?: Tokens,
): Headers {
  const headers = new Headers(init.headers);

  if (advices.AuthenticateToServiceConditionAdvice) {
    headers.set('x-tree', advices.AuthenticateToServiceConditionAdvice[0]);
  } else if (advices.TransactionConditionAdvice) {
    headers.set('x-txid', advices.TransactionConditionAdvice[0]);
  }

  if (tokens && tokens.idToken) {
    headers.set('x-idtoken', tokens.idToken);
  }
  return headers;
}

export function addAuthzInfoToURL(url: string, advices: Advices, tokens?: Tokens): string {
  const updatedURL = new URL(url);

  // Only modify URL for Transactional Authorization
  if (advices.TransactionConditionAdvice) {
    const txId = advices.TransactionConditionAdvice[0];
    // Add Txn ID to *original* request options as URL param
    updatedURL.searchParams.append('_txid', txId);
  }

  // If tokens are used, send idToken (OIDC)
  if (tokens && tokens.idToken) {
    updatedURL.searchParams.append('_idtoken', tokens.idToken);
  }

  // FYI: in certain circumstances, the URL may be returned unchanged
  return updatedURL.toString();
}

export function buildAuthzOptions(
  authzObj: AuthorizationJSON,
  baseURL: string,
  timeout: number,
  realmPath?: string,
  customPaths?: CustomPathConfig,
): HttpClientRequestOptions {
  const treeAuthAdvices = authzObj.advices && authzObj.advices.AuthenticateToServiceConditionAdvice;
  const txnAuthAdvices = authzObj.advices && authzObj.advices.TransactionConditionAdvice;
  let attributeValue = '';
  let attributeName = '';

  if (treeAuthAdvices) {
    attributeValue = treeAuthAdvices.reduce((prev: string, curr: string) => {
      const prevWithSpace = prev ? ` ${prev}` : prev;
      prev = `${curr}${prevWithSpace}`;
      return prev;
    }, '');
    attributeName = 'AuthenticateToServiceConditionAdvice';
  } else if (txnAuthAdvices) {
    attributeValue = txnAuthAdvices.reduce((prev: string, curr: string) => {
      const prevWithSpace = prev ? ` ${prev}` : prev;
      prev = `${curr}${prevWithSpace}`;
      return prev;
    }, '');
    attributeName = 'TransactionConditionAdvice';
  }

  const openTags = `<Advices><AttributeValuePair>`;
  const nameTag = `<Attribute name="${attributeName}"/>`;
  const valueTag = `<Value>${attributeValue}</Value>`;
  const endTags = `</AttributeValuePair></Advices>`;
  const fullXML = `${openTags}${nameTag}${valueTag}${endTags}`;

  const path = getEndpointPath('authenticate', realmPath, customPaths);
  const queryParams = {
    authIndexType: 'composite_advice',
    authIndexValue: fullXML,
  };

  const options = {
    init: {
      method: 'POST',
      credentials: 'include' as const,
      headers: {
        'Accept-API-Version': 'resource=2.0, protocol=1.0',
      },
    },
    timeout,
    url: resolve(baseURL, `${path}?${stringify(queryParams)}`),
  };
  return options;
}

export function examineForIGAuthz(res: Response): boolean {
  const type = res.headers.get('Content-Type') || '';
  return type.includes('html') && res.url.includes('composite_advice');
}

export async function examineForRESTAuthz(res: Response): Promise<boolean> {
  const clone = res.clone();
  const json = await clone.json();
  return !!json.advices;
}

function getXMLValueFromURL(urlString: string): string {
  const url = new URL(urlString);
  const value = url.searchParams.get('authIndexValue') || '';
  const parser = new DOMParser();
  const decodedValue = decodeURIComponent(value);
  const doc = parser.parseFromString(decodedValue, 'application/xml');
  const el = doc.querySelector('Value');
  return el ? el.innerHTML : '';
}

export function hasAuthzAdvice(json: AuthorizationJSON): boolean {
  if (json.advices && json.advices.AuthenticateToServiceConditionAdvice) {
    return (
      Array.isArray(json.advices.AuthenticateToServiceConditionAdvice) &&
      json.advices.AuthenticateToServiceConditionAdvice.length > 0
    );
  } else if (json.advices && json.advices.TransactionConditionAdvice) {
    return (
      Array.isArray(json.advices.TransactionConditionAdvice) &&
      json.advices.TransactionConditionAdvice.length > 0
    );
  } else {
    return false;
  }
}

export async function isAuthzStep(res: Response): Promise<boolean> {
  // TODO: add comment
  const clone = res.clone();
  const json = await clone.json();
  return !!json.callbacks;
}

export function newTokenRequired(res: Response, requiresNewToken?: RequiresNewTokenFn): boolean {
  if (typeof requiresNewToken === 'function') {
    return requiresNewToken(res);
  }
  return res.status === 401;
}

export function normalizeIGJSON(res: Response): AuthorizationJSON {
  const advices: Advices = {};
  if (res.url.includes('AuthenticateToServiceConditionAdvice')) {
    advices.AuthenticateToServiceConditionAdvice = [getXMLValueFromURL(res.url)];
  } else {
    advices.TransactionConditionAdvice = [getXMLValueFromURL(res.url)];
  }
  return {
    resource: '',
    actions: {},
    attributes: {},
    advices,
    ttl: 0,
  };
}

export async function normalizeRESTJSON(res: Response): Promise<AuthorizationJSON> {
  return await res.json();
}
