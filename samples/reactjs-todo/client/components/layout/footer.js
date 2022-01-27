/*
 * forgerock-sample-web-react
 *
 * footer.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext } from 'react';

import { AppContext } from '../../global-state';

/**
 * @function Footer - Footer React component
 * @returns {Object} - React component object
 */
export default function Footer() {
  const [state] = useContext(AppContext);

  return (
    <div className="cstm_container container-fluid">
      <small
        className={`border-top d-block mt-5 py-5 ${state.theme.textClass} ${state.theme.borderHighContrastClass}`}
      >
        The React name and logomark are properties of <a href="https://reactjs.org">Facebook</a>,
        and their use herein is for learning and illustrative purposes only.
      </small>
    </div>
  );
}
