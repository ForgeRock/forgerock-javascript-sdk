/**
 *
 * Copyright (c) 2023 - 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

import {
  checkForMissingSlash,
  getEndpointPath,
  getRequestHeaders,
  getRequestBodyBlob,
  resolveUrl,
} from '../network/index.js';
import { InterceptorConfig } from '../types/worker.types.js';

/** ****************************************************************
 * @function generateUrlsToIntercept - Generate the URLs for interception
 * @param {InterceptorConfig} config - The interceptor config object
 * @returns {string[]} - An array of URLs to intercept
 */
export function generateUrlsToIntercept(config: InterceptorConfig) {
  const forgerockBaseUrl = checkForMissingSlash(config.forgerock.serverConfig.baseUrl);
  const realmPath = config.forgerock?.realmPath || 'root';
  const urls = [
    ...config.interceptor.urls,
    `${resolveUrl(forgerockBaseUrl, getEndpointPath('accessToken', realmPath))}`,
    `${resolveUrl(forgerockBaseUrl, getEndpointPath('endSession', realmPath))}?`,
    `${resolveUrl(forgerockBaseUrl, getEndpointPath('revoke', realmPath))}`,
    `${resolveUrl(forgerockBaseUrl, getEndpointPath('userInfo', realmPath))}`,
  ];
  return urls;
}

/** ****************************************************************
 * @function generateOptions - Generate the options for a fetch request
 * Unit testing this can't currently be done without adding `Request` to Jest's globals.
 * It may not be worth the effort to do so, as this function is very simple.
 * Plus, getRequestBodyBlob is already tested in shared/network/src/utilities.test.ts, and
 * getRequestHeaders is already tested in shared/network/src/utilities.test.ts.
 * @param {Request} request - The request object
 * @returns {RequestInit} - The options object for the request
 */
export async function generateOptions(request: Request) {
  return {
    method: request.method,
    headers: getRequestHeaders(request),
    body: await getRequestBodyBlob(request),
    mode: request.mode,
    credentials: request.credentials,
    cache: request.cache,
    redirect: request.redirect,
    referrer: request.referrer,
    integrity: request.integrity,
  };
}
