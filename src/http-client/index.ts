import Config from '../config';
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
  buildTxnAuthOptions,
  examineForIGTxnAuth,
  examineForRESTTxnAuth,
  hasTransactionAdvice,
  isAuthStep,
  newTokenRequired,
  normalizeIGJSON,
  normalizeRESTJSON,
} from './util';

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

    if (newTokenRequired(res, options.requiresNewToken)) {
      res = await this._request(options, true);
    }

    if (options.txnAuth && options.txnAuth.handleStep) {
      if (res.redirected && examineForIGTxnAuth(res)) {
        txnAuthJSON = normalizeIGJSON(res);
      } else if (await examineForRESTTxnAuth(res)) {
        txnAuthJSON = await normalizeRESTJSON(res);
      }

      if (txnAuthJSON && txnAuthJSON.advices) {
        const { serverConfig } = Config.get(options.txnAuth.config);
        const txnAuthOptions = buildTxnAuthOptions(
          txnAuthJSON,
          serverConfig.baseUrl,
          options.timeout,
        );
        const initialStep = await this._request(txnAuthOptions, false);

        if (!(await isAuthStep(initialStep))) {
          throw new Error('Error: Initial response from auth server not a "step".');
        }
        if (!hasTransactionAdvice(txnAuthJSON)) {
          throw new Error(`Error: TransactionConditionAdvice is empty.`);
        }
        try {
          // Walk through auth tree
          await this.stepIterator(initialStep, options.txnAuth.handleStep);
          // Add Txn ID to *original* request options
          options.txnAuth.txnID = txnAuthJSON.advices.TransactionConditionAdvice[0];
          // Retry original resource request
          res = await this._request(options, false);
        } catch (err) {
          throw new Error(err);
        }
      }
    }

    return res;
  }

  private static async setAuthHeaders(
    headers: Headers,
    options: HttpClientRequestOptions,
    forceRenew: boolean,
  ): Promise<Headers> {
    const txnAuthRequest = options.txnAuth && options.txnAuth.handleStep;
    let tokens = await TokenStorage.get();

    /**
     * Condition to see if Auth is session based or OAuth token based
     */
    if (tokens.accessToken) {
      // Access tokens are an OAuth artifact
      tokens = await TokenManager.getTokens({ forceRenew });
      headers.set('Authorization', `Bearer ${tokens.accessToken}`);

      if (txnAuthRequest) {
        headers.set('X-Id-Token', tokens.idToken || '');
        headers.set('X-Txn-Id', (options.txnAuth && options.txnAuth.txnID) || '');
      }
    } else {
      // If no access tokens, OAuth is not being used.
      if (txnAuthRequest) {
        headers.set('X-Txn-Id', (options.txnAuth && options.txnAuth.txnID) || '');
      }
    }
    return headers;
  }

  private static async stepIterator(res: Response, handleStep: HandleStep): Promise<void> {
    const jsonRes = await res.json();
    const initialStep = new FRStep(jsonRes);

    return new Promise(async (resolve, reject) => {
      async function handleNext(step: FRStep): Promise<void> {
        const input = await handleStep(step);
        const output = await FRAuth.next(input);

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
    let headers = new Headers(init.headers);

    if (!options.bypassAuthentication) {
      headers = await this.setAuthHeaders(headers, options, forceRenew);
    }
    init.headers = headers;
    return await withTimeout(fetch(url, init), timeout);
  }
}

export default HttpClient;
export { HttpClientRequestOptions, RequiresNewTokenFn };
