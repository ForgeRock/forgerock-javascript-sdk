import Config from '../config';
import Dispatcher from '../event';
import FRAuth from '../fr-auth';
import { StepType } from '../fr-auth/enums';
import FRStep from '../fr-auth/fr-step';
import TokenManager from '../token-manager';
import { withTimeout } from '../util/timeout';
import {
  buildTxnAuthOptions,
  examineForIGTxnAuth,
  examineForRESTTxnAuth,
  isAuthStep,
  newTokenRequired,
  normalizeIGJSON,
  normalizeRESTJSON,
} from './util';
import {
  HandleStep,
  HttpClientRequestOptions,
  RequiresNewTokenFn,
  TxnAuthJSON,
} from './interfaces';

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

        if (await isAuthStep(initialStep)) {
          try {
            // Resolves with return of `void` upon successful completion
            await this.stepIterator(initialStep, options.txnAuth.handleStep);
            // Retry original resource request
            res = await this._request(options, false);
          } catch (err) {
            throw new Error(err);
          }
        } else {
          throw new Error('Error: Initial response from auth server not a "step".');
        }
      }
    }

    return res;
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
    const headers = new Headers(init.headers);

    if (!options.bypassAuthentication) {
      const tokens = await TokenManager.getTokens({ forceRenew });
      headers.set('authorization', `Bearer ${tokens.accessToken}`);
    }
    init.headers = headers;
    return await withTimeout(fetch(url, init), timeout);
  }
}

export default HttpClient;
export { HttpClientRequestOptions, RequiresNewTokenFn };
