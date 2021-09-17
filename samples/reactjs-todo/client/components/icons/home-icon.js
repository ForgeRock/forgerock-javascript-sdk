/*
 * forgerock-sample-web-react
 *
 * home-icon.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

/**
 * @function HomeIcon - Displays the home icon representing the home page
 * @param {Object} props - React props object
 * @param {string} props.classes - A string of classnames to be set on component
 * @param {string} props.size - A string representing the intended size of the rendering
 * @returns {Object} - React JSX Object
 */
export default function HomeIcon({ classes = '', size = '24px' }) {
  return (
    <svg
      className={classes}
      height={size}
      width={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  );
}
