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

import { AppContext } from '../../global-state';

/**
 * @function Text- React component used for displaying text callback
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.callback - The callback object from AM
 * @returns {Object} - React component object
 */
export default function Text({ callback, inputName }) {
  const [state] = useContext(AppContext);
  const existingValue = callback.getInputValue();

  const textInputLabel = callback.getPrompt();
  function setValue(event) {
    callback.setInputValue(event.target.value);
  }

  return (
    <div className={`cstm_form-floating form-floating mb-3`}>
      <input
        className={`cstm_form-control form-control bg-transparent ${state.theme.textClass} ${state.theme.borderClass}`}
        defaultValue={existingValue}
        id={inputName}
        name={inputName}
        onChange={setValue}
        placeholder={textInputLabel}
      />
      <label htmlFor={inputName}>{textInputLabel}</label>
    </div>
  );
}
