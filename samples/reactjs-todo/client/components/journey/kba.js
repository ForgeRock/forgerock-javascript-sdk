/*
 * forgerock-sample-web-react
 *
 * kba.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { Fragment, useContext } from 'react';

import { DEBUGGER } from '../../constants';
import { AppContext } from '../../global-state';
import LockIcon from '../icons/lock-icon';

/**
 * @function Kba - React component used for displaying KBA security question
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.callback - The callback object from AM
 * @returns {Object} - React component object
 */
export default function Kba({ callback, inputName }) {
  const [state] = useContext(AppContext);

  /** *************************************************************************
   * SDK INTEGRATION POINT
   * Summary: SDK callback methods for getting values
   * --------------------------------------------------------------------------
   * Details: Each callback is wrapped by the SDK to provide helper methods
   * for accessing values from the callbacks received from AM
   ************************************************************************* */
  if (DEBUGGER) debugger;
  const prompt = callback.getPrompt();
  const questions = callback.getPredefinedQuestions();
  const inputNameQuestion = inputName;
  const inputNameAnswer = callback.payload.input[1].name;

  function setAnswer(e) {
    /** ***********************************************************************
     * SDK INTEGRATION POINT
     * Summary: SDK callback methods for setting values
     * ------------------------------------------------------------------------
     * Details: Each callback is wrapped by the SDK to provide helper methods
     * for writing values to the callbacks received from AM
     *********************************************************************** */
    if (DEBUGGER) debugger;
    callback.setAnswer(e.target.value);
  }

  function setQuestion(e) {
    /** ***********************************************************************
     * SDK INTEGRATION POINT
     * Summary: SDK callback methods for setting values
     * ------------------------------------------------------------------------
     * Details: Each callback is wrapped by the SDK to provide helper methods
     * for writing values to the callbacks received from AM
     *********************************************************************** */
    if (DEBUGGER) debugger;
    callback.setQuestion(e.target.value);
  }

  return (
    <Fragment>
      <hr className={`cstm_hr d-flex mt-5 ${state.theme.textClass}`} />
      <div className={`cstm_hr-lock_${state.theme.mode} d-flex justify-content-center`}>
        <LockIcon />
      </div>
      <h2 className={`fs-6 mt-5 fw-normal ${state.theme.textClass}`}>
        Provide security question(s) & answer(s) below
      </h2>
      <div className="cstm_form-floating form-floating mb-3">
        <select
          className={`cstm_form-select form-select bg-transparent ${state.theme.textClass} ${state.theme.borderClass}`}
          id={inputNameQuestion}
          name={inputNameQuestion}
          onChange={setQuestion}
          required={true}
        >
          <option value="">No selection</option>
          {questions.map((question, idx) => {
            return (
              <option key={idx} value={idx}>
                {question}
              </option>
            );
          })}
        </select>
        <label htmlFor={inputNameQuestion}>{prompt}</label>
      </div>
      <div
        className={`cstm_form-floating form-floating pb-5 mb-5 border-bottom pb-3 ${
          state.theme.mode === 'dark' ? 'border-white' : 'border-secondary'
        }`}
      >
        <input
          className={`cstm_form-control form-control bg-transparent ${state.theme.textClass} ${state.theme.borderClass}`}
          id={inputNameAnswer}
          name={inputNameAnswer}
          onChange={setAnswer}
          placeholder="Security Answer"
          required={true}
          type="text"
        />
        <label htmlFor={inputNameAnswer}>Security Answer</label>
      </div>
    </Fragment>
  );
}
