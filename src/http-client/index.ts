import Config from '../config';
import Dispatcher from '../event';
import TokenManager from '../token-manager';
import { withTimeout } from '../util/timeout';
import {
  buildTxnAuthReqOptions,
  examineForIGTxnAuth,
  examineForRESTTxnAuth,
  normalizeIGJSON,
  normalizeRESTJSON,
} from './util';
import { HttpClientRequestOptions, RequiresNewTokenFn, TxnAuthJSON } from './interfaces';

/**
 * HTTP client that includes bearer token injection and refresh.
 */
abstract class HttpClient extends Dispatcher {
  /**
   * Makes a request using the specified options.
   *
   * @param options The options to use when making the request
   */
  public static async request(options: HttpClientRequestOptions): Promise<Response> {
    let res = await this._request(options, false);
    let txnAuthJSON: TxnAuthJSON | undefined;

    if (this.newTokenRequired(res, options.requiresNewToken)) {
      res = await this._request(options, true);
    }

    if (options.txnAuth && options.txnAuth.init) {
      if (res.redirected && (await examineForIGTxnAuth(res))) {
        txnAuthJSON = await normalizeIGJSON(res);
      } else if (await examineForRESTTxnAuth(res)) {
        txnAuthJSON = await normalizeRESTJSON(res);
      }

      if (txnAuthJSON && txnAuthJSON.advices) {
        const { serverConfig } = Config.get(options.txnAuth.options);
        const txnAuthOptions = buildTxnAuthReqOptions(
          txnAuthJSON,
          serverConfig.baseUrl,
          options.timeout,
        );
        res = await this._request(txnAuthOptions, false);
      }
    }

    return res;
  }

  private static async _request(
    options: HttpClientRequestOptions,
    forceRenew: boolean,
  ): Promise<Response> {
    const { url, init, timeout } = options;
    const headers = new Headers(init.headers);

    if (!options.bypassAuthentication) {
      const tokens = await TokenManager.getTokens({ forceRenew });
      headers.set('authorization', `Bearer ${tokens.accessToken}`);
    }
    init.headers = headers;
    return await withTimeout(fetch(url, init), timeout);
  }

  private static newTokenRequired(res: Response, requiresNewToken?: RequiresNewTokenFn): boolean {
    if (typeof requiresNewToken === 'function') {
      return requiresNewToken(res);
    }
    return res.status === 401;
  }
}

export default HttpClient;
export { HttpClientRequestOptions, RequiresNewTokenFn };
