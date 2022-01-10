/*
 * forgerock-sample-web-react
 *
 * text.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext } from 'react';

import { DEBUGGER } from '../../constants';
import { AppContext } from '../../global-state';

/**
 * @function Text- React component used for displaying text callback
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.callback - The callback object from AM
 * @returns {Object} - React component object
 */
export default function Text({ callback, inputName }) {
  const [state] = useContext(AppContext);

  /** *************************************************************************
   * SDK INTEGRATION POINT
   * Summary: SDK callback methods for getting values
   * --------------------------------------------------------------------------
   * Details: Each callback is wrapped by the SDK to provide helper methods
   * for accessing values from the callbacks received from AM
   ************************************************************************* */
  if (DEBUGGER) debugger;
  const existingValue = callback.getInputValue();
  const failedPolicies = callback.getFailedPolicies && callback.getFailedPolicies();
  const policies = callback.getPolicies && callback.getPolicies();
  const textInputLabel = callback.getPrompt();
  const stringAttributeName = callback.getName && callback.getName();

  let isRequired;
  let Validation = null;
  let validationClass = '';

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
    callback.setInputValue(event.target.value);
  }

  if (failedPolicies?.length) {
    const validationFailure = failedPolicies.reduce((prev, curr) => {
      let failureObj;
      try {
        failureObj = JSON.parse(curr);
      } catch (err) {
        console.log(`Parsing failure for ${textInputLabel}`);
      }
      switch (failureObj.policyRequirement) {
        case 'VALID_USERNAME':
          prev = `${prev}Please choose a different username. `;
          break;
        case 'VALID_EMAIL_ADDRESS_FORMAT':
          prev = `${prev}Please use a valid email address. `;
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
    <div className={`cstm_form-floating form-floating mb-3`}>
      <input
        className={`cstm_form-control form-control ${validationClass} bg-transparent ${state.theme.textClass} ${state.theme.borderClass}`}
        defaultValue={existingValue}
        id={inputName}
        name={inputName}
        onChange={setValue}
        placeholder={textInputLabel}
        required={isRequired ? 'required' : ''}
        type={stringAttributeName == 'mail' ? 'email' : 'text'}
      />
      <label htmlFor={inputName}>{textInputLabel}</label>
      {Validation}
    </div>
  );
}
