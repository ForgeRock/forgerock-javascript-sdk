import { resolve } from 'url';
import Config, { ConfigOptions, ServerConfig } from '../config';
import { getRealmUrlPath } from '../util/realm';
import { withTimeout } from '../util/timeout';
import { Step } from './interfaces';

/**
 * Provides direct access to the OpenAM authentication tree API.
 */
abstract class Auth {
  /**
   * Gets the next step in the authentication tree.
   *
   * @param {Step} previousStep The previous step, including any required input.
   * @param {ConfigOptions} options Configuration default overrides.
   * @return {Step} The next step in the authentication tree.
   */
  public static async next(previousStep?: Step, options?: ConfigOptions): Promise<Step> {
    const { realmPath, serverConfig, tree } = Config.get(options);
    const url = this.constructUrl(serverConfig, realmPath, tree);
    const init = this.configureRequest(previousStep);
    const res = await withTimeout(fetch(url, init), serverConfig.timeout);
    const json = await this.getResponseJson(res);
    return json;
  }

  private static constructUrl(serverConfig: ServerConfig, realmPath?: string, tree?: string) {
    const realmUrlPath = getRealmUrlPath(realmPath);
    const query = tree ? `?authIndexType=service&authIndexValue=${tree}` : '';
    const path = `json/${realmUrlPath}/authenticate${query}`;
    const url = resolve(serverConfig.baseUrl, path);
    return url;
  }

  private static configureRequest(step?: Step) {
    const init: RequestInit = {
      body: step ? JSON.stringify(step) : undefined,
      credentials: 'include',
      headers: {
        accept: 'application/json',
        'accept-api-version': 'protocol=1.0,resource=2.1',
        'content-type': 'application/json',
      },
      method: 'POST',
    };
    return init;
  }

  private static async getResponseJson(res: Response) {
    const contentType = res.headers.get('content-type');
    const isJson = contentType && contentType.indexOf('application/json') > -1;
    const json = isJson ? await res.json() : undefined;
    return json;
  }
}

export default Auth;
