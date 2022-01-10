/*
 * forgerock-sample-web-react
 *
 * edit.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext, useRef } from 'react';

import { AppContext } from '../../global-state';

/**
 * @function Edit - Used for a single todo for edit within a modal popup
 * @param {Object} props - The object representing React's props
 * @param {Object} props.selectedEditTodo - The todo object representing what is selected for edit
 * @param {Function} props.setSelectedEditTodo - The function to set the newly edited todo
 * @param {Function} props.editTodo - The function to add the edited todo back to the collection
 * @returns {Object} - React component object
 */
export default function Edit({ selectedEditTodo, setSelectedEditTodo, editTodo }) {
  const [state] = useContext(AppContext);
  const textInput = useRef(null);

  function updateTitle(e) {
    setSelectedEditTodo({ ...selectedEditTodo, title: e.target.value });
  }

  function submit(e, type) {
    e.preventDefault();

    editTodo(selectedEditTodo);

    // TODO: Improve modal handling
    if (type === 'form') {
      document.getElementById('closeEditModalBtn').click();
    }
  }

  return (
    <div
      className={`modal fade`}
      data-bs-backdrop="static"
      id="editModal"
      tabIndex="-1"
      aria-modal="true"
      role="dialog"
    >
      <div className={`modal-dialog`}>
        <div
          className={`modal-content  ${state.theme.cardBgClass} ${state.theme.textClass} ${state.theme.borderClass}`}
        >
          <div className={`modal-header ${state.theme.borderClass}`}>
            <h4 className={`modal-title ${state.theme.textClass}`}>Edit Todo</h4>
          </div>
          <form onSubmit={(e) => submit(e, 'form')} className="modal-body">
            <div className="cstm_todos-input cstm_form-floating form-floating flex-grow-1">
              <input
                id="editTodo"
                type="text"
                className={`cstm_form-control form-control bg-transparent ${state.theme.textClass} ${state.theme.borderClass}`}
                value={selectedEditTodo ? selectedEditTodo.title : ''}
                onChange={updateTitle}
                ref={textInput}
                required="required"
              />
              <label htmlFor="newTodo">Update todo text</label>
            </div>
          </form>
          <div className={`modal-footer ${state.theme.borderClass}`}>
            <button
              id="closeEditModalBtn"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#editModal"
              className="btn btn-secondary"
            >
              Close
            </button>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#editModal"
              className="btn btn-primary"
              onClick={(e) => submit(e, 'update-button')}
            >
              Update Todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
