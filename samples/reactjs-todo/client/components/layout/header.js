/*
 * forgerock-sample-web-react
 *
 * header.js
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import AccountIcon from '../icons/account-icon';
import { AppContext } from '../../global-state';
import ForgeRockIcon from '../icons/forgerock-icon';
import HomeIcon from '../icons/home-icon';
import ReactIcon from '../icons/react-icon';
import TodosIcon from '../icons/todos-icon';

/**
 * @function Header - Header React view
 * @returns {Object} - React component object
 */
export default function Header() {
  /**
   * Collects the global state for detecting user auth for rendering
   * appropriate navigational items.
   * The destructing of the hook's array results in index 0 having the state value,
   * and index 1 having the "setter" method to set new state values.
   */
  const [state] = useContext(AppContext);
  const location = useLocation();

  let TodosItem;
  let LoginOrOutItem;

  /**
   * Render different navigational items depending on authenticated status
   */
  if (state.isAuthenticated) {
    TodosItem = [
      <li
        key="home"
        className={`cstm_nav-item ${
          location.pathname === '/' ? 'cstm_nav-item_active' : ''
        } nav-item mx-1`}
      >
        <Link className="cstm_nav-link nav-link d-flex align-items-center h-100 p-0 ps-1" to="/">
          <HomeIcon />
          <span className="px-2 fs-6">Home</span>
        </Link>
      </li>,
      <li
        key="todos"
        className={`cstm_nav-item ${
          location.pathname === '/todos' ? 'cstm_nav-item_active' : ''
        } nav-item`}
      >
        <Link
          className="cstm_nav-link nav-link d-flex align-items-center h-100 p-0 ps-2"
          to="/todos"
        >
          <TodosIcon />
          <span className="px-2 fs-6">Todos</span>
        </Link>
      </li>,
    ];
    LoginOrOutItem = (
      <div className="d-flex align-items-center">
        <div className="dropdown text-end">
          <button
            aria-expanded="false"
            className="btn h-auto p-0"
            data-bs-toggle="dropdown"
            id="account_dropdown"
          >
            <AccountIcon classes="cstm_profile-icon" size="48px" />
          </button>
          <ul
            className={`dropdown-menu dropdown-menu-end shadow-sm pb-0 ${state.theme.dropdownClass}`}
            aria-labelledby="account_dropdown"
          >
            <li>
              <div className={`dropdown-header border-bottom ${state.theme.borderClass}`}>
                <p
                  className={`fw-bold fs-6 mb-0 ${
                    state.theme.textClass ? state.theme.textClass : 'text-dark'
                  }`}
                >
                  {state.username}
                </p>
                <p className="mb-2">{state.email}</p>
              </div>
            </li>
            <li>
              <Link className="dropdown-item py-2" to="/logout">
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    TodosItem = null;
    LoginOrOutItem = (
      <div className="d-flex py-3">
        <Link
          className={`cstm_login-link py-2 px-3 mx-1 ${
            state.theme.mode === 'dark' ? 'cstm_login-link_dark' : ''
          }`}
          to="/login"
        >
          Sign In
        </Link>
        <Link className="btn btn-primary" to="/register">
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <nav
      className={`navbar navbar-expand ${state.theme.navbarClass} ${state.theme.borderHighContrastClass} py-0 border-bottom`}
    >
      <div className="cstm_container container-fluid d-flex align-items-stretch">
        <Link
          to="/"
          className={`cstm_navbar-brand ${
            state.isAuthenticated ? 'cstm_navbar-brand_auth' : ''
          } navbar-brand ${
            state.isAuthenticated ? 'd-none d-sm-none d-md-block' : ''
          } py-3 pe-4 me-4 ${state.theme.borderHighContrastClass}`}
        >
          <ForgeRockIcon size="31px" /> + <ReactIcon size="38px" />
        </Link>
        <div className="navbar-collapse d-flex align-items-stretch" id="navbarNav">
          <ul className="navbar-nav d-flex align-items-stretch me-auto">{TodosItem}</ul>
          {LoginOrOutItem}
        </div>
      </div>
    </nav>
  );
}
