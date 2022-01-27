/*
 * forgerock-sample-web-react
 *
 * state.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { FRUser } from '@forgerock/javascript-sdk';
import React, { useState } from 'react';

import { DEBUGGER } from './constants';

/**
 * @function useStateMgmt - The global state/store for managing user authentication and page
 * @param {Object} props - The object representing React's props
 * @param {Object} props.email - User's email
 * @param {Object} props.isAuthenticated - Boolean value of user's auth status
 * @param {Object} props.prefersDarkTheme - User theme setting
 * @param {Object} props.username - User's username
 * @returns {Array} - Global state values and state methods
 */
export function useGlobalStateMgmt({ email, isAuthenticated, prefersDarkTheme, username }) {
  /**
   * Create state properties for "global" state.
   * Using internal names that differ from external to prevent shadowing.
   * The destructing of the hook's array results in index 0 having the state value,
   * and index 1 having the "setter" method to set new state values.
   */
  const [authenticated, setAuthentication] = useState(isAuthenticated || false);
  const [mail, setEmail] = useState(email || '');
  const [name, setUser] = useState(username || '');

  let theme;

  /**
   * @function setAuthenticationWrapper - A wrapper for storing authentication in sessionStorage
   * @param {boolean} value - current user authentication
   * @returns {void}
   */
  async function setAuthenticationWrapper(value) {
    if (value === false) {
      /** *********************************************************************
       * SDK INTEGRATION POINT
       * Summary: Logout, end session and revoke tokens
       * ----------------------------------------------------------------------
       * Details: Since this method is a global method via the Context API,
       * any part of the application can log a user out. This is helpful when
       * APIs are called and we get a 401 response.
       ********************************************************************* */
      if (DEBUGGER) debugger;
      try {
        await FRUser.logout();
      } catch (err) {
        console.error(`Error: logout did not successfully complete; ${err}`);
      }
    }
    setAuthentication(value);
  }

  /**
   * @function setEmailWrapper - A wrapper for storing authentication in sessionStorage
   * @param {string} value - current user's email
   * @returns {void}
   */
  function setEmailWrapper(value) {
    window.sessionStorage.setItem('sdk_email', `${value}`);
    setEmail(value);
  }

  /**
   * @function setUserWrapper - A wrapper for storing authentication in sessionStorage
   * @param {string} value - current user's username
   * @returns {void}
   */
  function setUserWrapper(value) {
    window.sessionStorage.setItem('sdk_username', `${value}`);
    setUser(value);
  }

  if (prefersDarkTheme) {
    theme = {
      mode: 'dark',
      // CSS Classes
      bgClass: 'bg-dark',
      borderClass: 'border-dark',
      borderHighContrastClass: 'cstm_border_black',
      cardBgClass: 'cstm_card-dark',
      dropdownClass: 'dropdown-menu-dark',
      listGroupClass: 'cstm_list-group_dark',
      navbarClass: 'cstm_navbar-dark navbar-dark bg-dark text-white',
      textClass: 'text-white',
      textMutedClass: 'text-white-50',
    };
  } else {
    theme = {
      mode: 'light',
      // CSS Classes
      bgClass: '',
      borderClass: '',
      borderHighContrastClass: '',
      cardBgClass: '',
      dropdownClass: '',
      listGroupClass: '',
      navbarClass: 'navbar-light bg-white',
      textClass: '',
      textMutedClass: 'text-muted',
    };
  }

  /**
   * returns an array with state object as index zero and setters as index one
   */
  return [
    {
      isAuthenticated: authenticated,
      email: mail,
      theme,
      username: name,
    },
    {
      setAuthentication: setAuthenticationWrapper,
      setEmail: setEmailWrapper,
      setUser: setUserWrapper,
    },
  ];
}

/**
 * @constant AppContext - Creates React Context API
 * This provides the capability to set a global state in React
 * without having to pass the state as props through parent-child components.
 */
export const AppContext = React.createContext([{}, {}]);
