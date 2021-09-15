/*
 * forgerock-sample-web-react
 *
 * state.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { FRAuth, TokenManager, UserManager } from '@forgerock/javascript-sdk';
import { useEffect, useState } from 'react';

import { DEBUGGER } from '../../constants';
import { htmlDecode } from '../../utilities/decode';

/**
 *
 * @param {Object} props - React props object
 * @param {Object} props.action - Action object for a "reducer" pattern
 * @param {string} props.action.type - Action type string that represents the action
 * @param {Object} props.form - The form metadata object
 * @returns {Object} - React component object
 */
export default function useJourneyHandler({ action, form }) {
  /**
   * Compose the state used in this view.
   * First, we will use the global state methods found in the App Context.
   * Then, we will create local state to manage the login journey. The
   * underscore is an unused variable, since we don't need the current global state.
   *
   * The destructing of the hook's array results in index 0 having the state value,
   * and index 1 having the "setter" method to set new state values.
   */
  // Form level errors
  const [formFailureMessage, setFormFailureMessage] = useState(null);
  // Step to render
  const [renderStep, setRenderStep] = useState(null);
  // Step to submit
  const [submissionStep, setSubmissionStep] = useState(null);
  // Processing submission
  const [submittingForm, setSubmittingForm] = useState(false);
  // User state
  const [user, setUser] = useState(null);

  /**
   * Since we have API calls to AM, we need to handle these requests as side-effects.
   * This will allow the view to render, but update/re-render after the request completes.
   */
  useEffect(() => {
    /**
     * @function getOAuth - The function to call when we get a LoginSuccess
     * @returns {undefined}
     */
    async function getOAuth() {
      /** *********************************************************************
       * SDK INTEGRATION POINT
       * Summary: Get OAuth/OIDC tokens with Authorization Code Flow w/PKCE.
       * ----------------------------------------------------------------------
       * Details: Since we have successfully authenticated the user, we can now
       * get the OAuth2/OIDC tokens. We are passing the `forceRenew` option to
       * ensure we get fresh tokens, regardless of existing tokens.
       ************************************************************************* */
      if (DEBUGGER) debugger;
      try {
        await TokenManager.getTokens({ forceRenew: true });
      } catch (err) {
        console.info(`Error: get tokens; ${err}`);
      }

      /** *********************************************************************
       * SDK INTEGRATION POINT
       * Summary: Call the user info endpoint for some basic user data.
       * ----------------------------------------------------------------------
       * Details: This is an OAuth2 call that returns user information with a
       * valid access token. This is optional and only used for displaying
       * user info in the UI.
       ********************************************************************* */
      if (DEBUGGER) debugger;
      try {
        const user = await UserManager.getCurrentUser();
        setUser(user);
      } catch (err) {
        console.error(`Error: get current user; ${err}`);

        setUser({});
      }
    }

    /**
     * @function getStep - The function for calling AM with a previous step to get a new step
     * @param {Object} prev - This is the previous step that should contain the input for AM
     * @returns {undefined}
     */
    async function getStep(prev) {
      /**
       * Save previous step information just in case we have a total
       * form failure due to 400 response from ForgeRock.
       */
      const previousStage = prev?.getStage && prev.getStage();
      const previousCallbacks = prev?.callbacks;
      const previousPayload = prev?.payload;

      /** *********************************************************************
       * SDK INTEGRATION POINT
       * Summary: Call the SDK's next method to submit the current step.
       * ----------------------------------------------------------------------
       * Details: This calls the next method with the previous step, expecting
       * the next step to be returned, or a success or failure.
       ********************************************************************* */
      if (DEBUGGER) debugger;
      let nextStep;
      try {
        nextStep = await FRAuth.next(prev, { tree: form.tree });
      } catch (err) {
        console.error(`Error: failure in next step request; ${err}`);

        /**
         * Setup an object to display failure message
         */
        nextStep = {
          type: 'LoginFailure',
          payload: {
            message: 'Unknown request failure',
          },
        };
      }

      /**
       * Condition for handling start, error handling and completion
       * of login journey.
       */
      if (nextStep.type === 'LoginSuccess') {
        // User is authenticated, now call for OAuth tokens
        getOAuth();
      } else if (nextStep.type === 'LoginFailure') {
        /**
         * Handle basic form error
         */
        setFormFailureMessage(htmlDecode(nextStep.payload.message));

        /** *******************************************************************
         * SDK INTEGRATION POINT
         * Summary: Call next without previous step to get new authId.
         * --------------------------------------------------------------------
         * Details: Since this is within the failure block, let's call the next
         * function again but with no step (null) to get a fresh authId.
         ******************************************************************* */
        if (DEBUGGER) debugger;
        let newStep;
        try {
          newStep = await FRAuth.next(null, { tree: form.tree });
        } catch (err) {
          console.error(`Error: failure in new step request; ${err}`);

          /**
           * Setup an object to display failure message
           */
          newStep = {
            type: 'LoginFailure',
            payload: {
              message: 'Unknown request failure',
            },
          };
        }

        /** *******************************************************************
         * SDK INTEGRATION POINT
         * Summary: Repopulate callbacks/payload with previous data.
         * --------------------------------------------------------------------
         * Details: Now that we have a new authId (the identification of the
         * fresh step) let's populate this new step with old callback data if
         * the stage is the same. If not, the user will have to refill form. We
         * will display the error we collected from the previous submission,
         * restart the flow, and provide better UX with the previous form data,
         * so the user doesn't have to refill the form.
         ******************************************************************* */
        if (DEBUGGER) debugger;
        if (newStep.getStage() === previousStage) {
          newStep.callbacks = previousCallbacks;
          newStep.payload = {
            ...previousPayload,
            authId: newStep.payload.authId,
          };
        }

        setRenderStep(newStep);
        setSubmittingForm(false);
      } else {
        /**
         * If we got here, then the form submission was both successful
         * and requires additional step rendering.
         */
        setRenderStep(nextStep);
        setSubmittingForm(false);
      }
    }

    /**
     * Kickstart the authentication journey!
     * submissionStep will initially be `null`, and that's intended.
     */
    getStep(submissionStep);
  }, [action.type, form.tree, submissionStep]);

  return [
    {
      formFailureMessage,
      renderStep,
      submittingForm,
      user,
    },
    {
      setSubmissionStep,
      setSubmittingForm,
    },
  ];
}
