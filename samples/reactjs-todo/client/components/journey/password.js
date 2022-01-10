/*
 * forgerock-sample-web-react
 *
 * password.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext, useState } from 'react';

import { DEBUGGER } from '../../constants';
import { AppContext } from '../../global-state';
import EyeIcon from '../icons/eye-icon';

/**
 * @function Password - React component used for displaying password callback
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.callback - The callback object from AM
 * @param {string} props.errorMessage - Error message string
 * @returns {Object} - React component object
 */
export default function Password({ callback, errorMessage, inputName }) {
  const [state] = useContext(AppContext);

  /** *************************************************************************
   * SDK INTEGRATION POINT
   * Summary: SDK callback methods for getting values
   * --------------------------------------------------------------------------
   * Details: Each callback is wrapped by the SDK to provide helper methods
   * for accessing values from the callbacks received from AM
   ************************************************************************* */
  if (DEBUGGER) debugger;
  const failedPolicies = callback.getFailedPolicies && callback.getFailedPolicies();
  const passwordLabel = callback.getPrompt();
  const policies = callback.getPolicies && callback.getPolicies();
  const [isVisible, setVisibility] = useState(false);

  let Validation = null;

  let isRequired;
  let validationClass;

  /**
   * @function setValue - Sets the value on the callback on element blur (lose focus)
   * @param {Object} event
   */
  function setValue(event) {
    /** ***********************************************************************
     * SDK INTEGRATION POINT
     * Summary: SDK callback methods for setting values
     * ------------------------------------------------------------------------
     * Details: Each callback is wrapped by the SDK to provide helper methods
     * for writing values to the callbacks received from AM
     *********************************************************************** */
    if (DEBUGGER) debugger;
    callback.setPassword(event.target.value);
  }

  /**
   * @function toggleVisibility - toggles the password from masked to plaintext
   */
  function toggleVisibility() {
    setVisibility(!isVisible);
  }

  if (errorMessage) {
    validationClass = 'is-invalid';
    Validation = <div className="invalid-feedback">{errorMessage}</div>;
  }

  if (failedPolicies && failedPolicies.length) {
    const validationFailure = failedPolicies.reduce((prev, curr) => {
      let failureObj;
      try {
        failureObj = JSON.parse(curr);
      } catch (err) {
        console.log(`Parsing failure for ${passwordLabel}`);
      }

      switch (failureObj.policyRequirement) {
        case 'LENGTH_BASED':
          prev = `${prev}Ensure password contains more than ${failureObj.params['min-password-length']} characters. `;
          break;
        case 'CHARACTER_SET':
          prev = `${prev}Ensure password contains 1 of each: capital letter, number and special character. `;
          break;
        default:
          prev = `${prev}Please check this value for correctness.`;
      }
      return prev;
    }, '');
    validationClass = 'is-invalid';
    Validation = <div className="invalid-feedback">{validationFailure}</div>;
  }

  if (policies?.policyRequirements) {
    isRequired = policies.policyRequirements.includes('REQUIRED');
  } else if (callback.isRequired) {
    isRequired = callback.isRequired();
  }

  return (
    <div className="cstm_form-floating input-group form-floating mb-3">
      <input
        className={`cstm_input-password form-control ${
          validationClass ? validationClass : ''
        } border-end-0 bg-transparent ${state.theme.textClass} ${state.theme.borderClass}`}
        id={inputName}
        name={inputName}
        onChange={setValue}
        placeholder={passwordLabel}
        type={isVisible ? 'text' : 'password'}
        required={isRequired}
      />
      <label htmlFor={inputName}>{passwordLabel}</label>
      <button
        className={`cstm_input-icon border-start-0 input-group-text bg-transparent ${state.theme.textClass} ${state.theme.borderClass}`}
        onClick={toggleVisibility}
        type="button"
      >
        <EyeIcon visible={isVisible} />
      </button>
      {Validation}
    </div>
  );
}
