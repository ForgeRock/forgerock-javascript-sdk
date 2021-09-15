/*
 * forgerock-sample-web-react
 *
 * fetch.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { useEffect } from 'react';

import apiRequest from '../../utilities/request';

/**
 * @function useTodoFetch - A custom React hook for fetching todos from API
 * @param {Function} dispatch - The function to pass in an action with data to result in new state
 * @param {Function} setFetched - A function for setting the state of hasFetched
 * @param {string} todosLength - The todo collection
 * @returns {undefined} - this doesn't directly return anything, but calls dispatch to set data
 */
export default function useTodoFetch(dispatch, setFetched) {
  /**
   * Since we are making an API call, which is a side-effect,
   * we will wrap this in a useEffect, which will re-render the
   * view once the API request returns.
   */
  useEffect(() => {
    async function getTodos() {
      // Request the todos from our resource API
      const fetchedTodos = await apiRequest('todos', 'GET');

      if (fetchedTodos.error) {
        return;
      }
      setFetched(true);
      dispatch({ type: 'init-todos', payload: { todos: fetchedTodos } });
    }

    getTodos();

    // There are no dependencies needed as all methods/functions are "stable"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
