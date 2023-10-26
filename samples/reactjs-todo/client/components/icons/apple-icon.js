/*
 * forgerock-sample-web-react
 *
 * apple-icon.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

/**
 * @function AppleIcon - React component for the user icon representing the apple icon
 * @param {Object} props - React props object
 * @param {string} props.classes - A string of classnames to be set on component
 * @param {string} props.size - A string representing the intended size of the rendering
 * @returns {Object} - React JSX Object
 */
export default function AppleIcon({ classes = '', size = '24px' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      height={size}
      width={size}
      viewBox="0 0 256 256"
    >
      <g fill="#070000" strokeMiterlimit="10" style={{ mixBlendMode: 'normal' }}>
        <path d="M0 256V0h256v256z"></path>
      </g>
      <path
        fill="#fff"
        strokeMiterlimit="10"
        d="M32.5 44c-1.778 0-3.001-.577-4.08-1.086C27.38 42.424 26.481 42 25 42c-1.481 0-2.38.424-3.42.914C20.501 43.423 19.278 44 17.5 44 13.174 44 6 34.071 6 23.5 6 16.49 10.832 11 17 11c2.027 0 3.259.581 4.346 1.093C22.378 12.58 23.27 13 25 13s2.622-.42 3.654-.907C29.741 11.581 30.973 11 33 11c2.664 0 5.033.982 7.042 2.921a1.5 1.5 0 01-.288 2.376C37.438 17.644 36 20.499 36 23.75c0 3.661 2.004 6.809 4.986 7.831.391.134.709.423.879.799.171.375.18.805.023 1.188C39.461 39.515 35.424 44 32.5 44zm-7-34a1.499 1.499 0 01-1.494-1.637c.012-.123.303-3.045 2.593-5.382C28.753.781 30.85.127 31.081.059a1.5 1.5 0 011.904 1.652c-.034.241-.389 2.436-2.232 4.899-1.973 2.636-4.791 3.322-4.91 3.35-.114.027-.229.04-.343.04z"
        transform="scale(5.33333)"
      ></path>
    </svg>
  );
}
