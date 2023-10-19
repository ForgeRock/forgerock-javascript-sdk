/*
 * forgerock-sample-web-react
 *
 * confirmation.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext } from 'react';

import { DEBUGGER } from '../../constants';
import { AppContext } from '../../global-state';

/**
 * @function Confirmation - React component used for displaying confirmation options
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.callback - The callback object from AM
 * @returns {Object} - React component object
 */
export default function Confirmation({ callback, inputName }) {
  const [state] = useContext(AppContext);

  /** *************************************************************************
   * SDK INTEGRATION POINT
   * Summary: SDK callback methods for getting values
   * --------------------------------------------------------------------------
   * Details: Each callback is wrapped by the SDK to provide helper methods
   * for accessing values from the callbacks received from AM
   ************************************************************************* */
  if (DEBUGGER) debugger;
  //Get values nedded by confirmation CB
  const options = callback?.getOptions();

  function setOptionValue(e) {
    if (DEBUGGER) debugger;
    callback.setOptionValue(e.target.value);
  }

  return (
    <div className="cstm_form-floating mb-3">
      <select
        onChange={setOptionValue}
        id={inputName}
        className={`cstm_form-select form-select bg-transparent ${state.theme.textClass} ${state.theme.borderClass}`}
      >
        {options.map(function (option) {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}
