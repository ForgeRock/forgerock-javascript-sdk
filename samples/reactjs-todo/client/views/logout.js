/*
 * forgerock-sample-web-react
 *
 * login.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import { FRUser } from '@forgerock/javascript-sdk';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppContext } from '../global-state';
import Loading from '../components/utilities/loading';

/**
 * @function Logout - React view for Logout
 * @returns {Object} - React component object
 */
export default function Logout() {
  const [_, { setAuthentication, setEmail, setUser }] = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function logout() {
      try {
        await FRUser.logout();

        setAuthentication(false);
        setEmail('');
        setUser('');

        navigate('/');
      } catch (err) {
        console.error(`Error: logout; ${err}`);
      }
    }
    logout();
  }, []);

  return <Loading classes="pt-5" message="You're being logged out ..." />;
}
