import Config, { ServerConfig } from '../config';
import { REQUESTED_WITH } from '../shared/constants';
import { StringDict } from '../shared/interfaces';
import { withTimeout } from '../util/timeout';
import { getEndpointPath, resolve, stringify } from '../util/url';
import { Step, StepOptions } from './interfaces';

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
    const { realmPath, serverConfig, tree } = Config.get(options);
    const query = options ? options.query : {};
    const url = this.constructUrl(serverConfig, realmPath, tree, query);
    const init = this.configureRequest(previousStep);
    const res = await withTimeout(fetch(url, init), serverConfig.timeout);
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
      headers: {
        accept: 'application/json',
        'accept-api-version': 'protocol=1.0,resource=2.1',
        'content-type': 'application/json',
        'x-requested-with': REQUESTED_WITH,
      },
      method: 'POST',
    };
    return init;
  }

  private static async getResponseJson<T>(res: Response): Promise<T> {
    const contentType = res.headers.get('content-type');
    const isJson = contentType && contentType.indexOf('application/json') > -1;
    const json = isJson ? await res.json() : undefined;
    return json;
  }
}

export default Auth;
