/*
 * forgerock-sample-web-react
 *
 * form.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import React from 'react';

import Loading from '../utilities/loading';

/**
 * @function Form - React component for managing the user authentication journey
 * @returns {Object} - React component object
 */
export default function Form() {
  return <Loading message="Checking your session ..." />;
}
