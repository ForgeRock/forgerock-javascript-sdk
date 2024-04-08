/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import type { ServerConfig, StepOptions } from '../config';
import Config from '../config';
import { ActionTypes } from '../config/enums';
import { REQUESTED_WITH, X_REQUESTED_PLATFORM } from '../shared/constants';
import type { StringDict } from '../shared/interfaces';
import { withTimeout } from '../util/timeout';
import { getEndpointPath, resolve, stringify } from '../util/url';
import type { Step } from './interfaces';
import middlewareWrapper from '../util/middleware';

/**
 * Provides direct access to the OpenAM authentication tree API.
 */
abstract class Auth {
  /**
   * Gets the next step in the authentication tree.
   *
   * @param {Step} previousStep The previous step, including any required input.
   * @param {StepOptions} options Configuration default overrides.
   * @return {Step} The next step in the authentication tree.
   */
  public static async next(previousStep?: Step, options?: StepOptions): Promise<Step> {
    const { middleware, platformHeader, realmPath, serverConfig, tree, type } = Config.get(options);
    const query = options ? options.query : {};
    const url = this.constructUrl(serverConfig, realmPath, tree, query);
    const runMiddleware = middlewareWrapper(
      {
        url: new URL(url),
        init: this.configureRequest(previousStep),
      },
      {
        type: previousStep ? ActionTypes.Authenticate : ActionTypes.StartAuthenticate,
        payload: {
          tree,
          type: type ? type : 'service',
        },
      },
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
    const res = await withTimeout(fetch(req.url.toString(), req.init), serverConfig.timeout);
    const json = await this.getResponseJson<Step>(res);
    return json;
  }

  private static constructUrl(
    serverConfig: ServerConfig,
    realmPath?: string,
    tree?: string,
    query?: StringDict<string>,
  ): string {
    const treeParams = tree ? { authIndexType: 'service', authIndexValue: tree } : undefined;
    const params: StringDict<string | undefined> = { ...query, ...treeParams };
    const queryString = Object.keys(params).length > 0 ? `?${stringify(params)}` : '';
    const path = getEndpointPath('authenticate', realmPath, serverConfig.paths);
    const url = resolve(serverConfig.baseUrl, `${path}${queryString}`);
    return url;
  }

  private static configureRequest(step?: Step): RequestInit {
    const init: RequestInit = {
      body: step ? JSON.stringify(step) : undefined,
      credentials: 'include',
      headers: new Headers({
        Accept: 'application/json',
        'Accept-API-Version': 'protocol=1.0,resource=2.1',
        'Content-Type': 'application/json',
        'X-Requested-With': REQUESTED_WITH,
      }),
      method: 'POST',
    };

    return init;
  }

  private static async getResponseJson<T>(res: Response): Promise<T> {
    const contentType = res.headers.get('content-type');
    const isJson = contentType && contentType.indexOf('application/json') > -1;
    const json = isJson ? await res.json() : {};
    json.status = res.status;
    json.ok = res.ok;
    return json;
  }
}

export default Auth;
