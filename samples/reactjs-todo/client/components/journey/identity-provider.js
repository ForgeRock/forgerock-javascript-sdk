/*
 * forgerock-sample-web-react
 *
 * identity-provider.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */
import React, { useEffect } from 'react';
import { DEBUGGER } from '../../constants';
import GoogleIcon from '../icons/google-icon';
import AppleIcon from '../icons/apple-icon';
/**
 * @function IdentityProvider - IdentityProvider React component
 * @param {Object} props - React props object passed from parent
 * @param {Object} props.callback - The callback object from AM
 * @returns {Object} - React component object
 */
export default function IdentityProvider({ callback }) {
  useEffect(() => {
    function initialiseIdp() {
      const localAuthentication = callback
        .getProviders()
        .filter((provider) => provider.provider === 'localAuthentication');

      if (localAuthentication.length > 0) {
        callback.setProvider('localAuthentication');
      }
    }
    initialiseIdp();
  }, [callback]);

  const providersClass = {
    Google: 'identity-provider google-login',
    Apple: 'identity-provider apple-login',
    Facebook: 'identity-provider facebook-login',
  };
  const identityProviders = callback
    .getProviders()
    .filter((provider) => provider.provider !== 'localAuthentication');

  function onSetProvider(provider) {
    if (DEBUGGER) debugger;
    callback.setProvider(provider);
  }

  return identityProviders.map((provider, idx) => {
    const providerName = provider.uiConfig.buttonDisplayName ?? 'an identity provider';
    return (
      <div key={provider.uiConfig.buttonDisplayName ?? 'localAuthentication' + idx}>
        <button
          className={providersClass[provider.uiConfig.buttonDisplayName]}
          onClick={(e) => {
            e.stopPropagation();
            onSetProvider(provider.provider);
          }}
        >
          {providerName === 'Google' ? (
            <GoogleIcon size="24px" />
          ) : providerName === 'Apple' ? (
            <AppleIcon size="24px" />
          ) : null}{' '}
          Sign in with {providerName}
        </button>
      </div>
    );
  });
}
