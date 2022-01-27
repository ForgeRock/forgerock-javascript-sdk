/*
 * forgerock-sample-web-react
 *
 * alert.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React from 'react';

import AlertIcon from '../icons/alert-icon';
import VerifiedIcon from '../icons/verified-icon';

/**
 * @function Alert - React component used for displaying form errors
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.message - error message
 * @returns {Object} - React component object
 */
export default function Alert({ message, type }) {
  if (type === 'error') {
    return (
      <p className="alert alert-danger d-flex align-items-center mt-1" role="alert">
        <AlertIcon classes="cstm_alert-icon col-1" />
        <span className="ps-2">{message}</span>
      </p>
    );
  } else if (type === 'success') {
    return (
      <p className="alert alert-success d-flex align-items-center mt-5" role="alert">
        <VerifiedIcon classes="cstm_verified-alert-icon" size="36px" />
        <span className="ps-2">{message}</span>
      </p>
    );
  } else {
    return (
      <p className="alert d-flex align-items-center mt-5" role="alert">
        <span className="ps-2">{message}</span>
      </p>
    );
  }
}
