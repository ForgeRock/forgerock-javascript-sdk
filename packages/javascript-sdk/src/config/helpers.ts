/*
 * @forgerock/javascript-sdk
 *
 * helpers.ts
 *
 * Copyright (c) 2024 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import middlewareWrapper from '../util/middleware';
import { withTimeout } from '../util/timeout';
import { ActionTypes } from './enums';
import type { AsyncConfigOptions, ServerConfig, WellKnownResponse } from './interfaces';

/**
 * @function convertWellKnown - Convert the response from welknown into SDK config
 * @param {WellKnownResponse} data - response from wellknown endpoint
 * @returns {ServerConfig}
 */
export function convertWellKnown(data: WellKnownResponse, options?: ServerConfig): ServerConfig {
  if (!data.authorization_endpoint) {
    throw new Error('Wellknown endpoint did not return `authorization_endpoint`');
  }

  const fullUrl = new URL(data.authorization_endpoint);
  const baseUrl = fullUrl.origin;

  let authenticateUrl: string | undefined;
  let sessionsUrl: string | undefined;

  if (options?.paths) {
    // Prioritize user provided URLs for authenticate and session as they are NOT provided in wellknown response
    authenticateUrl = options?.paths?.authenticate;
    sessionsUrl = options?.paths?.sessions;
  } else if (data.issuer.includes('/am/')) {
    // If no authentiate and session URL provided, detect AM and use standard `/authenticate`
    authenticateUrl = `${data.issuer.replace('oauth2', 'json')}/authenticate`;
    // Use standard AM `/sessions`
    sessionsUrl = `${data.issuer.replace('oauth2', 'json')}/sessions`;
  } else if (data.issuer.includes('/as/')) {
    // URLs for PingOne's authenticate and sessions, once supported
  }

  const paths = {
    ...(authenticateUrl ? { authenticate: new URL(authenticateUrl).pathname } : {}),
    authorize: new URL(data.authorization_endpoint).pathname,
    accessToken: new URL(data.token_endpoint).pathname,
    endSession: new URL(data.end_session_endpoint).pathname,
    userInfo: new URL(data.userinfo_endpoint).pathname,
    revoke: new URL(data.revocation_endpoint).pathname,
    ...(sessionsUrl ? { sessions: new URL(sessionsUrl).pathname } : {}),
  };

  return {
    baseUrl,
    paths,
  };
}

/**
 * @function fetchWellKnown - Fetch the wellknown endpoint for OAuth/OIDC URLs
 */
export async function fetchWellKnown(options: AsyncConfigOptions): Promise<WellKnownResponse> {
  if (!options.serverConfig.wellknown) {
    throw new Error('wellknown URL is missing in options');
  }

  const runMiddleware = middlewareWrapper(
    {
      url: new URL(options.serverConfig?.wellknown),
      init: { method: 'GET' },
    },
    {
      type: ActionTypes.WellKnown,
      payload: {},
    },
  );
  const req = runMiddleware(options.middleware);
  const res = await withTimeout(fetch(req.url.toString(), req.init), options.serverConfig.timeout);

  const json = await res.json();
  return json;
}
