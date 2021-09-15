/*
 * forgerock-sample-web-react
 *
 * forgerock-icon.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

/**
 * @function ForgeRockIcon - React component that displays the ForgeRock brand icon
 * @param {Object} props - React props object
 * @param {string} props.classes - A string of classnames to be set on component
 * @param {string} props.size - A string representing the intended size of the rendering
 * @returns {Object} - React JSX Object
 */
export default function ForgeRockIcon({ classes = '', size = '24px' }) {
  return (
    <svg classes={classes} height={size} version="1.1" viewBox="0 0 64 64">
      <g transform="matrix(0.18538366,0,0,0.18538366,-64.077863,86.24418)">
        <polygon
          transform="translate(0,-465.21997)"
          points="603.99,87.77 571.17,29.85 469.15,209.14 502.22,267.59 "
        />
        <polygon
          transform="translate(0,-465.21997)"
          points="673.05,209.61 621.45,118.47 519.7,298.1 546.04,345.23 596.04,345.23 672.95,209.78 "
        />
        <polygon
          transform="translate(0,-465.21997)"
          points="554.19,0 455.85,32.41 363.87,194.61 443.62,194.55 "
        />
        <polygon
          transform="translate(0,-465.21997)"
          points="431.64,345.23 511.42,345.23 443.1,224.89 363.48,224.78 "
        />
      </g>
    </svg>
  );
}
