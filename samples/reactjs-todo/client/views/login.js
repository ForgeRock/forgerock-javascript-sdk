/*
 * forgerock-sample-web-react
 *
 * login.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import BackHome from '../components/utilities/back-home';
import Card from '../components/layout/card';
import { AppContext } from '../global-state';
import KeyIcon from '../components/icons/key-icon';
import Form from '../components/journey/form';

/**
 * @function Login - React view for Login
 * @returns {Object} - React component object
 */
export default function Login() {
  const [state] = useContext(AppContext);

  return (
    <div className="cstm_container_v-centered container-fluid d-flex align-items-center">
      <div className="w-100">
        <BackHome />
        <Card>
          <div className="cstm_form-icon  align-self-center mb-3">
            <KeyIcon size="72px" />
          </div>
          <Form
            action={{ type: 'login' }}
            bottomMessage={
              <p className={`text-center text-secondary p-3 ${state.theme.textClass}`}>
                Don’t have an account? <Link to="/register">Sign up here!</Link>
              </p>
            }
          />
        </Card>
      </div>
    </div>
  );
}
