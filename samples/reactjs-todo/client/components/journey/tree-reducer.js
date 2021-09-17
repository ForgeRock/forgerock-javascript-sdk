/*
 * forgerock-sample-web-react
 *
 * reducer.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { JOURNEY_LOGIN, JOURNEY_REGISTER } from '../../constants';

/**
 * @function reducer - A simple "reducer" function for a tree's metadata based on the action type
 * @param {Object} _ - Normally the current state, but it's not being used
 * @param {Object} action - Action object
 * @param {string} action.type - Action type that describes what to do
 * @returns {Object} - the tree's metadata
 */
export default function reducer(_, action) {
  switch (action.type) {
    case 'login':
      return {
        buttonText: 'Sign In',
        titleText: 'Sign In',
        tree: JOURNEY_LOGIN,
      };
    case 'register':
      return {
        buttonText: 'Register',
        titleText: 'Sign Up',
        tree: JOURNEY_REGISTER,
      };
    default:
      throw new Error('Form action type not recognized.');
  }
}
