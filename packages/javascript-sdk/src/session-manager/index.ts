/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import type { ConfigOptions } from '../config/index';
import Config from '../config/index';
import { REQUESTED_WITH, X_REQUESTED_PLATFORM } from '../shared/constants';
import { isOkOr4xx } from '../util/http';
import { withTimeout } from '../util/timeout';
import { ActionTypes } from '../config/enums';
import middlewareWrapper from '../util/middleware';
import { getEndpointPath, resolve } from '../util/url';

/**
 * Provides access to the session management API.
 */
abstract class SessionManager {
  /**
   * Ends the current session.
   */
  public static async logout(options?: ConfigOptions): Promise<Response> {
    const { middleware, platformHeader, realmPath, serverConfig } = Config.get(options);
    const init: RequestInit = {
      credentials: 'include',
      headers: new Headers({
        'Accept-API-Version': 'protocol=1.0,resource=2.0',
        'X-Requested-With': REQUESTED_WITH,
      }),
      method: 'POST',
    };

    const path = `${getEndpointPath('sessions', realmPath, serverConfig.paths)}?_action=logout`;
    const url = resolve(serverConfig.baseUrl, path);

    const runMiddleware = middlewareWrapper(
      { url: new URL(url), init },
      { type: ActionTypes.Logout },
    );
    const req = runMiddleware(middleware);

    /**
     * Run after as to now allow mutation by user
     * Since the init headers can be an array, object or Headers class,
     * we need to handle all types.
     */
    if (platformHeader) {
      if (req.init.headers instanceof Headers) {
        req.init.headers.set('X-Requested-Platform', X_REQUESTED_PLATFORM);
      } else if (Array.isArray(req.init.headers)) {
        req.init.headers.push(['X-Requested-Platform', X_REQUESTED_PLATFORM]);
      } else if (req.init.headers) {
        req.init.headers['X-Requested-Platform'] = X_REQUESTED_PLATFORM;
      } else {
        req.init.headers = {
          'X-Requested-Platform': X_REQUESTED_PLATFORM,
        };
      }
    }

    const response = await withTimeout(fetch(req.url.toString(), req.init), serverConfig.timeout);
    if (!isOkOr4xx(response)) {
      throw new Error(`Failed to log out; received ${response.status}`);
    }
    return response;
  }
}

export default SessionManager;
