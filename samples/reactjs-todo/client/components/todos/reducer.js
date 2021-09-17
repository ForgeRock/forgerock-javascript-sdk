/*
 * forgerock-sample-web-react
 *
 * reducer.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/**
 * @function reducer - A simple reducer for managing the state of todos
 * @param {Object} state - The state of todos before applying the action
 * @param {Object} action - Action object
 * @param {string} action.type - Action type that describes what to do
 * @param {Object} action.payload - The new state to be applied
 * @returns {Array} - the new array of update todos
 */
export default function reducer(state, action) {
  switch (action.type) {
    case 'init-todos':
      return [...action.payload.todos];
    case 'add-todo':
      return [action.payload.todo, ...state];
    case 'delete-todo':
      return state.filter((todo) => todo._id !== action.payload._id);
    case 'complete-todo':
      return state.map((todo) => {
        if (todo._id === action.payload._id) {
          return {
            ...todo,
            completed: action.payload.completed,
          };
        } else {
          return todo;
        }
      });
    case 'edit-todo':
      return state.map((todo) => {
        if (todo._id === action.payload._id) {
          return {
            ...todo,
            title: action.payload.title,
          };
        } else {
          return todo;
        }
      });
    default:
      throw new Error('Form action type not recognized.');
  }
}
