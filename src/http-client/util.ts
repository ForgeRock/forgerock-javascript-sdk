/**
 * @module
 * @ignore
 * These are private utility functions for HttpClient
 */
import { CustomPathConfig } from '../config/interfaces';
import { HttpClientRequestOptions, RequiresNewTokenFn, TxnAuthJSON } from './interfaces';
import { getEndpointPath, resolve, stringify } from '../util/url';

export function buildTxnAuthOptions(
  txnAuthObj: TxnAuthJSON,
  baseURL: string,
  timeout: number,
  realmPath?: string,
  customPaths?: CustomPathConfig,
): HttpClientRequestOptions {
  const advices = txnAuthObj.advices ? txnAuthObj.advices.TransactionConditionAdvice : [];
  const transactionID = advices.reduce((prev: string, curr: string) => {
    const prevWithSpace = prev ? ` ${prev}` : prev;
    prev = `${curr}${prevWithSpace}`;
    return prev;
  }, '');

  const openTags = `<Advices><AttributeValuePair>`;
  const nameTag = `<Attribute name="TransactionConditionAdvice"/>`;
  const valueTag = `<Value>${transactionID}</Value>`;
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
      credentials: 'include' as 'include',
    },
    timeout,
    url: resolve(baseURL, `${path}?${stringify(queryParams)}`),
  };
  return options;
}

export function examineForIGTxnAuth(res: Response): boolean {
  const type = res.headers.get('Content-Type') || '';
  return type.includes('html') && res.url.includes('composite_advice');
}

export async function examineForRESTTxnAuth(res: Response): Promise<boolean> {
  const clone = res.clone();
  const json = await clone.json();
  return !!json.advices;
}

function getTxnIdFromURL(urlString: string): string {
  const url = new URL(urlString);
  const value = url.searchParams.get('authIndexValue') || '';
  const parser = new DOMParser();
  const decodedValue = decodeURIComponent(value);
  const doc = parser.parseFromString(decodedValue, 'application/xml');
  const el = doc.querySelector('Value');
  return el ? el.innerHTML : '';
}

export function hasTransactionAdvice(json: TxnAuthJSON): boolean {
  if (json.advices) {
    return (
      Array.isArray(json.advices.TransactionConditionAdvice) &&
      json.advices.TransactionConditionAdvice.length > 0
    );
  } else {
    return false;
  }
}

export async function isAuthStep(res: Response): Promise<boolean> {
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

export function normalizeIGJSON(res: Response): TxnAuthJSON {
  return {
    resource: '',
    actions: {},
    attributes: {},
    advices: {
      TransactionConditionAdvice: [getTxnIdFromURL(res.url)],
    },
    ttl: 0,
  };
}

export async function normalizeRESTJSON(res: Response): Promise<TxnAuthJSON> {
  return await res.json();
}
