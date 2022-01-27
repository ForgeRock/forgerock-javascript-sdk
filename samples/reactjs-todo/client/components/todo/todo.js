/*
 * forgerock-sample-web-react
 *
 * todo.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../global-state';
import ActionIcon from '../icons/action-icon';
import TodoIcon from '../icons/todo-icon';

/**
 * @function Todo - Used for display a single todo and its details
 * @param {Object} props - The object representing React's props
 * @param {Object} props.setTodoActionId - Method from parent for passing the ID of todo
 * @param {Object} props.todo - The todo object passed from the parent component
 * @returns {Object} - React JSX view
 */
export default function Todo({ completeTodo, setSelectedDeleteTodo, setSelectedEditTodo, item }) {
  const [state] = useContext(AppContext);

  /**
   * The destructing of the hook's array results in index 0 having the state value,
   * and index 1 having the "setter" method to set new state values.
   */
  const [todo, setTodo] = useState(item);
  const todoClasses = `cstm_todo-label ${
    todo.completed ? 'cstm_todo-label_complete' : 'cstm_todo-label_incomplete'
  } ${'col d-flex align-items-center fs-5 w-100 p-3'}`;

  useEffect(() => {
    setTodo(item);
  }, [item]);

  return (
    <li
      className={`cstm_todo-item list-group-item list-group-item-action p-0 ${state.theme.textClass}`}
    >
      <div className="row">
        <div className="col">
          <input
            id={todo._id}
            className="cstm_form-check form-check-input visually-hidden"
            type="checkbox"
            defaultChecked={todo.completed}
            onChange={(e) => {
              completeTodo(todo._id, e.target.checked);
            }}
          />
          <label htmlFor={todo._id} className={todoClasses}>
            <TodoIcon classes="me-2 col-1" completed={todo.completed} size="36px" />
            {todo.title}
          </label>
        </div>

        <div className="dropdown col-2 text-end" aria-expanded="false">
          <button
            className="cstm_dropdown-actions btn h-100"
            data-bs-toggle="dropdown"
            id={`todo_action_${todo._id}`}
          >
            <ActionIcon />
          </button>
          <ul
            className={`dropdown-menu dropdown-menu-end shadow-sm ${state.theme.dropdownClass}`}
            aria-labelledby={`todo_action_${todo._id}`}
          >
            <li>
              <button
                className="dropdown-item"
                onClick={() => setSelectedEditTodo(todo)}
                data-bs-toggle="modal"
                data-bs-target="#editModal"
              >
                Edit
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => setSelectedDeleteTodo(todo)}
                data-bs-toggle="modal"
                data-bs-target="#deleteModal"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </li>
  );
}
