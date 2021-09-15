/*
 * forgerock-sample-web-react
 *
 * terms-conditions.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

import { DEBUGGER } from '../../constants';

/**
 * @function TermsConditions - React component used for displaying terms and conditions
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.callback - The callback object from AM
 * @returns {Object} - React component object
 */
export default function TermsConditions({ callback, inputName }) {
  /** *************************************************************************
   * SDK INTEGRATION POINT
   * Summary: SDK callback methods for getting values
   * --------------------------------------------------------------------------
   * Details: Each callback is wrapped by the SDK to provide helper methods
   * for accessing values from the callbacks received from AM
   ************************************************************************* */
  if (DEBUGGER) debugger;
  const terms = callback.getTerms();
  const termsStart = terms.substring(0, 35) + ' ...';

  function setValue(e) {
    /** ***********************************************************************
     * SDK INTEGRATION POINT
     * Summary: SDK callback methods for setting values
     * ------------------------------------------------------------------------
     * Details: Each callback is wrapped by the SDK to provide helper methods
     * for writing values to the callbacks received from AM
     *********************************************************************** */
    if (DEBUGGER) debugger;
    callback.setAccepted(e.target.checked);
  }

  return (
    <div className="form-check mb-4">
      <input
        className="form-check-input"
        defaultChecked={false}
        id={inputName}
        onChange={setValue}
        type="checkbox"
      />
      <label htmlFor={inputName} className="form-check-label">
        Please accept our below Terms and Conditions
        <details>
          <summary className="fw-bold ps-1">{termsStart}</summary>
          {terms}
        </details>
      </label>
    </div>
  );
}
