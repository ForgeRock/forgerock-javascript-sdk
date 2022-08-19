/*
 * forgerock-sample-web-react
 *
 * route.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { UserManager } from '@forgerock/javascript-sdk';

import Loading from '../components/utilities/loading';
import { AppContext } from '../global-state';

/**
 * @function useAuthValidation - Custom hook for validating user authentication
 * @param {boolean} auth - client state on whether user is authenticated
 * @param {function} setAuth - global state method for setting user authentication status
 * @returns {Array}
 */
function useAuthValidation(auth, setAuth) {
  /**
   * React state "hook"
   *
   * This has three possible states: 'unknown', 'valid' and 'invalid'.
   */
  const [isValid, setValid] = useState('unknown');

  useEffect(() => {
    async function validateAccessToken() {
      /**
       * First, check to see if the user has recently been authenticated
       */
      if (auth) {
        /**
         * If we they have been authenticated, validate that assumption
         */
        try {
          await UserManager.getCurrentUser();
          setValid('valid');
        } catch (err) {
          console.info(`Info: route validation; ${err}`);

          setAuth(false);
          setValid('invalid');
        }
      } else {
        /**
         * If we have no record of their authenticated, no need to call the server
         */
        setValid('invalid');
      }
    }

    validateAccessToken();
    // Only `auth` is mutable, all others, even `setAuth` are "stable"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return [
    {
      isValid,
    },
  ];
}

/**
 * @function ProtectedRoute - This function extends the ReactRouter component to
 * protect routes from unauthenticated access.
 * Inspired by: https://ui.dev/react-router-v5-protected-routes-authentication/
 * @param {Object} props - React props
 * @param {Object} props.children - React components passed as children
 * @param string[] path - React-Router path prop
 * @returns {Object} - Wrapped React Router component
 */
export function ProtectedRoute({ children }) {
  // Get "global" state from Context API
  const [{ isAuthenticated }, { setAuthentication }] = useContext(AppContext);
  // Custom hook for validating user's access token
  const [{ isValid }] = useAuthValidation(isAuthenticated, setAuthentication);

  switch (isValid) {
    case 'valid':
      // Access token has been confirmed to be valid
      return children;
    case 'invalid':
      // Access token has been confirmed to be invalid
      return <Navigate to="/login" />;
    default:
      // State is 'unknown', so we are waiting on token validation
      return <Loading classes="pt-5" message="Verifying access ... " />;
  }
}
