/*
 * forgerock-sample-web-react
 *
 * delete.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext } from 'react';

import { AppContext } from '../../global-state';

/**
 * @function Delete - Used for display a modal that ensures intention for todo deletion
 * @param {Object} props - The object representing React's props
 * @param {Object} props.deleteTodo - The todo object that is requested to be deleted
 * @returns {Object} - React component object
 */
export default function Delete({ deleteTodo }) {
  const [state] = useContext(AppContext);

  return (
    <div
      className={`modal fade`}
      data-bs-backdrop="static"
      id="deleteModal"
      tabIndex="-1"
      aria-modal="true"
      role="dialog"
    >
      <div className={`modal-dialog`}>
        <div
          className={`modal-content  ${state.theme.cardBgClass} ${state.theme.textClass} ${state.theme.borderClass}`}
        >
          <div className="modal-body pt-4 px-4">
            <p>Are you sure you want to delete this todo?</p>
          </div>
          <div className={`modal-footer p-3 ${state.theme.borderClass}`}>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              className="btn btn-secondary"
            >
              Close
            </button>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              className="btn btn-danger"
              onClick={deleteTodo}
            >
              Delete Todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
