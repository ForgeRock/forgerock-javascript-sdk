import Config from '../config';
import { ActionTypes } from '../config/enums';
import Dispatcher from '../event';
import FRAuth from '../fr-auth';
import { StepType } from '../fr-auth/enums';
import FRStep from '../fr-auth/fr-step';
import {
  HandleStep,
  HttpClientRequestOptions,
  RequiresNewTokenFn,
  TxnAuthJSON,
} from './interfaces';
import TokenManager from '../token-manager';
import TokenStorage from '../token-storage';
import { withTimeout } from '../util/timeout';
import {
  addTxnIDAndTokenToHeaders,
  addTxnIDAndTokenToURL,
  buildTxnAuthOptions,
  examineForIGTxnAuth,
  examineForRESTTxnAuth,
  hasTransactionAdvice,
  isAuthStep,
  newTokenRequired,
  normalizeIGJSON,
  normalizeRESTJSON,
} from './util';
import middlewareWrapper from '../util/middleware';

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
    let hasIG = false;

    if (newTokenRequired(res, options.requiresNewToken)) {
      res = await this._request(options, true);
    }

    if (options.txnAuth && options.txnAuth.handleStep) {
      if (res.redirected && examineForIGTxnAuth(res)) {
        hasIG = true;
        txnAuthJSON = normalizeIGJSON(res);
      } else if (await examineForRESTTxnAuth(res)) {
        txnAuthJSON = await normalizeRESTJSON(res);
      }

      if (txnAuthJSON && txnAuthJSON.advices) {
        const { realmPath, serverConfig } = Config.get(options.txnAuth.config);
        const txnAuthOptions = buildTxnAuthOptions(
          txnAuthJSON,
          serverConfig.baseUrl,
          options.timeout,
          realmPath,
          serverConfig.paths,
        );

        const url = new URL(txnAuthOptions.url);
        const type = url.searchParams.get('authIndexType') as string;
        const tree = url.searchParams.get('authIndexValue') as string;
        const { url: authUrl, init: authInit } = middlewareWrapper(
          {
            url: new URL(txnAuthOptions.url),
            init: txnAuthOptions.init,
          },
          ActionTypes.StartAuthenticate,
          { type, tree },
        );
        txnAuthOptions.url = authUrl.toString();
        txnAuthOptions.init = authInit;
        const initialStep = await this._request(txnAuthOptions, false);

        if (!(await isAuthStep(initialStep))) {
          throw new Error('Error: Initial response from auth server not a "step".');
        }
        if (!hasTransactionAdvice(txnAuthJSON)) {
          throw new Error(`Error: TransactionConditionAdvice is empty.`);
        }

        try {
          // Walk through auth tree
          await this.stepIterator(initialStep, options.txnAuth.handleStep, type, tree);
          // See if OAuth tokens are being used
          const tokens = await TokenStorage.get();
          if (hasIG) {
            // Update URL with txn ID for IG
            options.url = addTxnIDAndTokenToURL(options.url, txnAuthJSON.advices, tokens);
          } else {
            // Update URL with txn ID for REST API
            options.init.headers = addTxnIDAndTokenToHeaders(
              options.init,
              txnAuthJSON.advices,
              tokens,
            );
          }
          // Retry original resource request
          res = await this._request(options, false);
        } catch (err) {
          throw new Error(err);
        }
      }
    }

    return res;
  }

  private static async setAuthHeaders(headers: Headers, forceRenew: boolean): Promise<Headers> {
    let tokens = await TokenStorage.get();

    /**
     * Condition to see if Auth is session based or OAuth token based
     */
    if (tokens && tokens.accessToken) {
      // Access tokens are an OAuth artifact
      tokens = await TokenManager.getTokens({ forceRenew });
      headers.set('Authorization', `Bearer ${tokens.accessToken}`);
    }
    return headers;
  }

  private static async stepIterator(
    res: Response,
    handleStep: HandleStep,
    type: string,
    tree: string,
  ): Promise<void> {
    const jsonRes = await res.json();
    const initialStep = new FRStep(jsonRes);

    return new Promise(async (resolve, reject) => {
      async function handleNext(step: FRStep): Promise<void> {
        const input = await handleStep(step);
        const output = await FRAuth.next(input, { type, tree });

        if (output.type === StepType.LoginSuccess) {
          resolve();
        } else if (output.type === StepType.LoginFailure) {
          reject('Transaction authorization failure.');
        } else {
          handleNext(output);
        }
      }

      handleNext(initialStep);
    });
  }

  private static async _request(
    options: HttpClientRequestOptions,
    forceRenew: boolean,
  ): Promise<Response> {
    const { url, init, timeout } = options;
    let headers = new Headers(init.headers || {});

    if (!options.bypassAuthentication) {
      headers = await this.setAuthHeaders(headers, forceRenew);
    }
    init.headers = headers;

    let response;
    try {
      response = await withTimeout(fetch(url, init), timeout);
    } catch (err) {
      /**
       * If the above fetch fails due to the following conditions:
       *
       * 1. Preflight
       * 2. Authorization header
       * 3. Redirection
       *
       * The request will need to be refetched as a "simple request".
       * For more information, see:
       * https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Preflighted_requests_and_redirects
       */

      response = await withTimeout(fetch(url, { method: 'GET' }), timeout);
    }
    return response as Response;
  }
}

export default HttpClient;
export { HttpClientRequestOptions, RequiresNewTokenFn };
