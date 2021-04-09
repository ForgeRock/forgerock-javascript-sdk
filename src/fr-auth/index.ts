/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import Auth from '../auth/index';
import { CallbackType } from '../auth/enums';
import { StepOptions } from '../auth/interfaces';
import RedirectCallback from '../fr-auth/callbacks/redirect-callback';
import FRLoginFailure from './fr-login-failure';
import FRLoginSuccess from './fr-login-success';
import FRStep from './fr-step';

/**
 * Provides access to the OpenAM authentication tree API.
 */
abstract class FRAuth {
  public static readonly previousStepKey = 'FRAuth_PreviousStep';

  /**
   * Requests the next step in the authentication tree.
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
   *
   * @param previousStep The previous step with its callback values populated
   * @param options Configuration overrides
   * @return The next step in the authentication tree
   */
  public static async next(
    previousStep?: FRStep,
    options?: StepOptions,
  ): Promise<FRStep | FRLoginSuccess | FRLoginFailure> {
    const nextPayload = await Auth.next(previousStep ? previousStep.payload : undefined, options);

    if (nextPayload.authId) {
      // If there's an authId, tree has not been completed
      const callbackFactory = options ? options.callbackFactory : undefined;
      return new FRStep(nextPayload, callbackFactory);
    }

    if (!nextPayload.authId && nextPayload.ok) {
      // If there's no authId, and the response is OK, tree is complete
      return new FRLoginSuccess(nextPayload);
    }

    // If there's no authId, and the response is not OK, tree has failure
    return new FRLoginFailure(nextPayload);
  }

  /**
   * Redirects to the URL identified in the RedirectCallback and saves the full
   * step information to localStorage for retrieval when user returns from login.
   *
   * Example:
   * ```js
   * forgerock.FRAuth.redirect(step);
   * ```
   */
  public static redirect(step: FRStep): void {
    const cb = step.getCallbackOfType(CallbackType.RedirectCallback) as RedirectCallback;
    const redirectUrl = cb.getRedirectUrl();

    window.localStorage.setItem(this.previousStepKey, JSON.stringify(step));
    window.location.assign(redirectUrl);
  }

  /**
   * Resumes a tree after returning from an external client or provider.
   * Requires the full URL of the current window. It will parse URL for
   * key-value pairs as well as, if required, retrieves previous step.
   *
   * Example;
   * ```js
   * forgerock.FRAuth.resume(window.location.href)
   * ```
   */
  public static async resume(
    url: string,
    options?: StepOptions,
  ): Promise<FRStep | FRLoginSuccess | FRLoginFailure> {
    const parsedUrl = new URL(url);
    const code = parsedUrl.searchParams.get('code');
    const form_post_entry = parsedUrl.searchParams.get('form_post_entry');
    const nonce = parsedUrl.searchParams.get('nonce');
    const scope = parsedUrl.searchParams.get('scope');
    const state = parsedUrl.searchParams.get('state');
    const suspendedId = parsedUrl.searchParams.get('suspendedId');

    let previousStep;

    function requiresPreviousStep() {
      return (code && state) || form_post_entry;
    }

    /**
     * If we are returning back from a provider, the previous redirect step data is required.
     * Retrieve the previous step from localStorage, and then delete it to remove stale data.
     * If suspendedId is present, no previous step data is needed, so skip below conditional.
     */
    if (requiresPreviousStep()) {
      const redirectStepString = window.localStorage.getItem(this.previousStepKey);

      if (!redirectStepString) {
        throw new Error('Error: could not retrieve original redirect information.');
      }

      try {
        previousStep = JSON.parse(redirectStepString);
      } catch (err) {
        throw new Error('Error: could not parse redirect params or step information');
      }

      window.localStorage.removeItem(this.previousStepKey);
    }

    /**
     * Construct options object from the options parameter and key-value pairs from URL.
     * Ensure query parameters from current URL are the last properties spread in the object.
     */
    const nextOptions = {
      ...options,
      query: {
        // Conditionally spread properties into object. Don't spread props with undefined/null.
        ...(options && options.query),
        ...(code && { code }),
        ...(form_post_entry && { form_post_entry }),
        ...(nonce && { nonce }),
        ...(scope && { scope }),
        ...(state && { state }),
        ...(suspendedId && { suspendedId }),
      },
    };

    return await this.next(previousStep, nextOptions);
  }

  /**
   * Requests the first step in the authentication tree.
   * This is essentially an alias to calling FRAuth.next without a previous step.
   *
   * @param options Configuration overrides
   * @return The next step in the authentication tree
   */
  public static async start(
    options?: StepOptions,
  ): Promise<FRStep | FRLoginSuccess | FRLoginFailure> {
    return await FRAuth.next(undefined, options);
  }
}

export default FRAuth;
