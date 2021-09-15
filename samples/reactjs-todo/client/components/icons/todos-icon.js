/*
 * forgerock-sample-web-react
 *
 * todos-icon.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

/**
 * @function TodosIcon - React component that displays the multiple checks icon representing the todos page
 * @param {Object} props - React props object
 * @param {string} props.classes - A string of classnames to be set on component
 * @param {string} props.size - A string representing the intended size of the rendering
 * @returns {Object} - React JSX Object
 */
export default function TodosIcon({ classes = '', size = '24px' }) {
  return (
    <svg
      className={classes}
      height={size}
      width={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
    </svg>
  );
}
