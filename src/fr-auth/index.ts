import { ConfigOptions } from 'config';
import Auth from '../auth/index';
import FRLoginFailure from './fr-login-failure';
import FRLoginSuccess from './fr-login-success';
import FRStep from './fr-step';

/**
 * Provides access to the OpenAM authentication tree API.
 *
 * Call `FRAuth.next()` recursively.  At each step, check for session token or error, otherwise
 * populate the step's callbacks and call `next()` again.
 *
 * Example:
 *
 * ```js
 * async function nextStep(previousStep) {
 *   const thisStep = await FRAuth.next(previousStep);
 *
 *   switch (thisStep.type) {
 *     case StepType.LoginSuccess:
 *       const token = thisStep.getSessionToken();
 *       break;
 *     case StepType.LoginFailure:
 *       const detail = thisStep.getDetail();
 *       break;
 *     case StepType.Step:
 *       // Populate `thisStep` callbacks here, and then continue
 *       thisStep.setInputValue('foo');
 *       nextStep(thisStep);
 *       break;
 *   }
 * }
 * ```
 */
abstract class FRAuth {
  /**
   * Requests the next step in the authentication tree.
   *
   * @param previousStep The previous step with its callback values populated
   * @param options Configuration overrides
   * @return The next step in the authentication tree
   */
  public static async next(
    previousStep?: FRStep,
    options?: ConfigOptions,
  ): Promise<FRStep | FRLoginSuccess | FRLoginFailure> {
    const nextPayload = await Auth.next(previousStep ? previousStep.payload : undefined, options);

    if (nextPayload.tokenId) {
      return new FRLoginSuccess(nextPayload);
    }

    if (nextPayload.authId) {
      const callbackFactory = options ? options.callbackFactory : undefined;
      return new FRStep(nextPayload, callbackFactory);
    }

    return new FRLoginFailure(nextPayload);
  }
}

export default FRAuth;
