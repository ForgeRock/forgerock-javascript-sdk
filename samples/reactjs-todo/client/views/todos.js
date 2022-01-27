/*
 * forgerock-sample-web-react
 *
 * todos.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext, Fragment, useReducer, useState } from 'react';

import { AppContext } from '../global-state';
import CreateTodo from '../components/todos/create';
import DeleteModal from '../components/todos/delete';
import EditModal from '../components/todos/edit';
import useTodoFetch from '../components/todos/fetch';
import reducer from '../components/todos/reducer';
import Todo from '../components/todos/todo';
import apiRequest from '../utilities/request';

/**
 * @function Todos - React view for retrieving & displaying todo collection
 * @returns {Object} - React component object
 */
export default function Todos() {
  /**
   * Use local, component state for todos. Though, this could be moved to
   * the global state if that's preferred over doing API calls in React views.
   * The destructing of the hook's array results in index 0 having the state value,
   * and index 1 having the "setter" method to set new state values.
   */
  const [state] = useContext(AppContext);
  const [hasFetched, setFetched] = useState(false);
  const [todos, dispatch] = useReducer(reducer, []);
  const [selectedDeleteTodo, setSelectedDeleteTodo] = useState(null);
  const [selectedEditTodo, setSelectedEditTodo] = useState(null);

  useTodoFetch(dispatch, setFetched);

  function addTodo(newTodo) {
    dispatch({ type: 'add-todo', payload: { todo: newTodo } });
  }

  async function completeTodo(_id, completed) {
    dispatch({ type: 'complete-todo', payload: { _id, completed } });
    await apiRequest(`todos/${_id}`, 'POST', { completed });
    return;
  }

  async function deleteTodo() {
    dispatch({ type: 'delete-todo', payload: { _id: selectedDeleteTodo._id } });
    await apiRequest(`todos/${selectedDeleteTodo._id}`, 'DELETE');
    return;
  }

  async function editTodo({ _id, title }) {
    dispatch({ type: 'edit-todo', payload: { _id, title } });
    await apiRequest(`todos/${_id}`, 'POST', { title });
    return;
  }

  /**
   * Dynamic React component for rendering either the loading component
   * or the Todos collection component.
   */
  const Todos = hasFetched ? (
    <ul className={`list-group list-group-flush mb-1 ${state.theme.listGroupClass}`}>
      {/**
       * We we've fetched the todos, iterate over them for display.
       * If no todos were returned, show the "no todos" message.
       */}
      {todos.length ? (
        todos.map((item) => {
          return (
            <Todo
              completeTodo={completeTodo}
              item={item}
              key={item._id}
              setSelectedDeleteTodo={setSelectedDeleteTodo}
              setSelectedEditTodo={setSelectedEditTodo}
            />
          );
        })
      ) : (
        <li className="cstm_todo-item list-group-item list-group-item-action p-0">
          <div className="row">
            <p className="col d-flex align-items-center fs-5 text-muted w-100 ms-3 p-3">
              No todos yet. Create one above!
            </p>
          </div>
        </li>
      )}
    </ul>
  ) : (
    <p
      className={`d-flex justify-content-center align-items-center border-top px-3 ${state.theme.borderClass}`}
    >
      <span className="spinner-border text-primary my-2" role="status"></span>
      <span className="p-3 fs-5">Collecting your todos ...</span>
    </p>
  );

  return (
    <Fragment>
      <div className={`cstm_container container-fluid`}>
        <h1 className={`mt-5 ${state.theme.textClass}`}>Your Todos</h1>
        <p className="fs-6 text-muted">Create and manage your todos.</p>
        <div className={`card shadow-sm mb-5 ${state.theme.cardBgClass}`}>
          <CreateTodo addTodo={addTodo} />
          {Todos}
        </div>
      </div>
      <EditModal
        editTodo={editTodo}
        selectedEditTodo={selectedEditTodo}
        setSelectedEditTodo={setSelectedEditTodo}
      />
      <DeleteModal deleteTodo={deleteTodo} setSelectedDeleteTodo={setSelectedDeleteTodo} />
    </Fragment>
  );
}
