/*
 * forgerock-sample-web-react
 *
 * form.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { Fragment, useEffect, useContext, useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import Boolean from './boolean';
import { DEBUGGER } from '../../constants';
import Alert from './alert';
import Choice from './choice';
import Kba from './kba';
import Loading from '../utilities/loading';
import Password from './password';
import treeReducer from './tree-reducer';
import useJourneyHandler from './journey-state';
import { AppContext } from '../../global-state';
import TermsConditions from './terms-conditions';
import Text from './text';
import Unknown from './unknown';
import Button from './button';

/**
 * @function Form - React component for managing the user authentication journey
 * @param {Object} props - props object from React
 * @param {Object} props.action - Action object for a "reducer" pattern
 * @param {string} props.action.type - Action type string that represents the action
 * @param {Object} props.followUp - A function that should be run after successful authentication
 * @returns {Object} - React component object
 */
export default function Form({ action, bottomMessage, followUp, topMessage }) {
  /**
   * Compose the state used in this view.
   * First, we will use the global state methods found in the App Context.
   * Then, we will create local state to manage the login journey.
   *
   * The destructing of the hook's array results in index 0 having the state value,
   * and index 1 having the "setter" method to set new state values.
   */
  // Used for setting global authentication state
  const [state, methods] = useContext(AppContext);
  // Map action to form metadata: title, button text and tree
  const [form] = useReducer(treeReducer, treeReducer(null, action));
  // Used for redirection after success
  const history = useHistory();

  /**
   * Custom "hook" for handling form orchestration
   */
  const [
    { formFailureMessage, renderStep, submittingForm, user },
    { setSubmissionStep, setSubmittingForm },
  ] = useJourneyHandler({ action, form });

  /**
   * If the user successfully authenticates, let React complete
   * rendering, then complete setting the state and redirect to home.
   */
  useEffect(() => {
    async function finalizeAuthState() {
      /**
       * First, let's see if we get a user back from useJourneyHandler.
       * If we do, let's set the user data and redirect back to home.
       */
      if (user) {
        /**
         * Set user state/info on "global state"
         */
        methods.setUser(user.name);
        methods.setEmail(user.email);
        methods.setAuthentication(true);

        // Run follow-up function if present
        followUp && (await followUp());

        // Redirect back to the home page
        history.push('/');
      }
    }

    finalizeAuthState();

    // Only `user` is a needed dependency, all others are "stable"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /**
   * Iterate through callbacks received from AM and map the callback to the
   * appropriate callback component, pushing that component
   * the StepComponent's array.
   */
  function mapCallbacksToComponents(cb, idx) {
    const name = cb?.payload?.input?.[0].name;
    /** *********************************************************************
     * SDK INTEGRATION POINT
     * Summary:SDK callback method for getting the callback type
     * ----------------------------------------------------------------------
     * Details: This method is helpful in quickly identifying the callback
     * when iterating through an unknown list of AM callbacks
     ********************************************************************* */
    if (DEBUGGER) debugger;
    switch (cb.getType()) {
      case 'ChoiceCallback':
        return <Choice callback={cb} inputName={name} key={name} />;
      case 'NameCallback':
      case 'ValidatedCreateUsernameCallback':
      case 'StringAttributeInputCallback':
        return <Text callback={cb} inputName={name} key={name} />;
      case 'PasswordCallback':
      case 'ValidatedCreatePasswordCallback':
        return <Password callback={cb} inputName={name} key={name} />;
      case 'BooleanAttributeInputCallback':
        return <Boolean callback={cb} inputName={name} key={name} />;
      case 'TermsAndConditionsCallback':
        return <TermsConditions callback={cb} inputName={name} key={name} />;
      case 'KbaCreateCallback':
        return <Kba callback={cb} inputName={name} key={name} />;
      default:
        // If current callback is not supported, render a warning message
        return <Unknown callback={cb} key={`unknown-${idx}`} />;
    }
  }

  /**
   * Render conditions for presenting appropriate views to user.
   * First, we need to handle no "step", which means we are waiting for
   * the initial response from AM for authentication.
   *
   * Once we have a step, we then need to ensure we don't already have a
   * success or failure. If we have a step but don't have a success or
   * failure, we will likely have callbacks that we will need to present'
   * to the user in their render component form.
   */
  if (!renderStep) {
    /**
     * Since there is no step information we need to call AM to retrieve the
     * instructions for rendering the login form.
     */
    return <Loading message="Checking your session ..." />;
  } else if (renderStep.type === 'LoginSuccess') {
    /**
     * Since we have successfully authenticated, show a success message to
     * user while we complete the process and redirect to home page.
     */
    return <Loading message="Success! Redirecting ..." />;
  } else if (renderStep.type === 'Step') {
    /**
     * The step to render has callbacks, so we need to collect additional
     * data from user. Map callbacks to form inputs.
     */
    return (
      <Fragment>
        <h1 className={`text-center fs-2 mb-3 ${state.theme.textClass}`}>{form.titleText}</h1>
        {topMessage}
        <form
          className="cstm_form"
          onSubmit={(event) => {
            event.preventDefault();
            // Indicate form processing
            setSubmittingForm(true);
            // set currently rendered step as step to be submitted
            setSubmissionStep(renderStep);
          }}
        >
          {formFailureMessage ? <Alert message={formFailureMessage} type="error" /> : null}
          {
            /**
             * Map over the callbacks in renderStep and render the appropriate
             * component for each one.
             */
            renderStep.callbacks.map(mapCallbacksToComponents)
          }
          <Button buttonText={form.buttonText} submittingForm={submittingForm} />
        </form>
        {bottomMessage}
      </Fragment>
    );
  } else {
    /**
     * Just in case things blow up.
     */
    return <Alert message={renderStep.payload.message} type="error" />;
  }
}
