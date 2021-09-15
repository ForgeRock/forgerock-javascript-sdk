/*
 * forgerock-sample-web-react
 *
 * new-user-icon.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

/**
 * @function NewUserIcon - React component that displays the new user (user with +) icon representing registration
 * @param {Object} props - React props object
 * @param {string} props.classes - A string of classnames to be set on component
 * @param {string} props.size - A string representing the intended size of the rendering
 * @returns {Object} - React JSX Object
 */
export default function NewUserIcon({ classes = '', size = '24px' }) {
  return (
    <svg
      className={classes}
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
}
