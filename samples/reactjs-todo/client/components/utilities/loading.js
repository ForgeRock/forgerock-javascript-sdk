/*
 * forgerock-sample-web-react
 *
 * loading.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext } from 'react';

import { AppContext } from '../../global-state';

/**
 * @function Loading - Used to display a loading message
 * @param {Object} props - The object representing React's props
 * @param {string} props.message - The message string object passed from the parent component
 * @returns {Object} - React component object
 */
export default function Loading({ classes, message }) {
  const [state] = useContext(AppContext);

  return (
    <div className="container">
      <p className={classes}>
        <span className="d-flex justify-content-center my-2">
          <span className="cstm_loading-spinner spinner-border text-primary" role="status"></span>
        </span>
        <span className={`d-flex justify-content-center p-3 fs-5 ${state.theme.textClass}`}>
          {message}
        </span>
      </p>
    </div>
  );
}
