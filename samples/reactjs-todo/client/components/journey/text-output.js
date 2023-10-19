/*
 * forgerock-sample-web-react
 *
 * textOutput.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import React from 'react';
/**
 * @function TextOutput- React component used for displaying text Outputcallback
 * @param {Object} props - React props object passed from parent
 * @returns {Object} - React component object
 */

/** 
 component added to render purposes, at this point this callback renders no element
*/

export default function TextOutput({ callback }) {
  const existingValue = callback.getMessage();
  return <p> {existingValue} </p>;
}
