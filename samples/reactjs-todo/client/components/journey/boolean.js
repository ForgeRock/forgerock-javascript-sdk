/*
 * forgerock-sample-web-react
 *
 * boolean.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

import { DEBUGGER } from '../../constants';

/**
 * @function Boolean - React component used for displaying checkboxes
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.callback - The callback object from AM
 * @returns {Object} - React component object
 */
export default function Boolean({ callback, inputName }) {
  /** *************************************************************************
   * SDK INTEGRATION POINT
   * Summary: SDK callback methods for getting values
   * --------------------------------------------------------------------------
   * Details: Each callback is wrapped by the SDK to provide helper methods
   * for accessing values from the callbacks received from AM
   ************************************************************************* */
  if (DEBUGGER) debugger;
  const prompt = callback.getPrompt();
  const value = callback.getInputValue();

  function setValue(e) {
    /** ***********************************************************************
     * SDK INTEGRATION POINT
     * Summary: SDK callback methods for setting values
     * ------------------------------------------------------------------------
     * Details: Each callback is wrapped by the SDK to provide helper methods
     * for writing values to the callbacks received from AM
     *********************************************************************** */
    if (DEBUGGER) debugger;
    callback.setInputValue(e.target.checked);
  }
  return (
    <div className="form-check mb-3">
      <input
        className="form-check-input"
        defaultChecked={value}
        id={inputName}
        onChange={setValue}
        type="checkbox"
      />
      <label htmlFor={inputName} className="form-check-label">
        {prompt}
      </label>
    </div>
  );
}
