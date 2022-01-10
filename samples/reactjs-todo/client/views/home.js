/*
 * forgerock-sample-web-react
 *
 * home.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../global-state';
import VerifiedIcon from '../components/icons/verified-icon';

/**
 * @function Home - React view for Home
 * @returns {Object} - React component object
 */
export default function Home() {
  /**
   * Collects the global state for detecting user auth for rendering
   * appropriate navigational items.
   * The destructing of the hook's array results in index 0 having the state value,
   * and index 1 having the "setter" method to set new state values.
   */
  const [state] = useContext(AppContext);

  const createAccountText = !state.isAuthenticated ? (
    <Fragment>
      <h2 className={`fs-4 fw-normal pt-3 pb-1 ${state.theme.textClass}`}>Getting started</h2>
      <p>
        To use this app, <Link to="/register">create an account now</Link>! Already have an account?{' '}
        <Link to="/login">Sign in</Link> to get things done!
      </p>
    </Fragment>
  ) : null;

  const LoginAlert = state.isAuthenticated ? (
    <p className="alert alert-success d-flex align-items-center mt-5" role="alert">
      <VerifiedIcon classes="cstm_verified-alert-icon" size="36px" />
      <span className="ps-2">
        Welcome back, {state.username}!{' '}
        <Link className="cstm_verified-alert-link" to="/todos">
          Manage your todos here
        </Link>
        .
      </span>
    </p>
  ) : null;

  return (
    <div className={`cstm_container container-fluid ${state.theme.textClass}`}>
      {LoginAlert}
      <h1 className={`cstm_head-text text-center ${state.theme.textClass}`}>
        Protect with ForgeRock; Develop with React.js
      </h1>

      <p className={`cstm_subhead-text fs-3 mb-4 fw-bold ${state.theme.textMutedClass}`}>
        Learn how to develop ForgeRock protected, web apps with the{' '}
        <a className={`${state.theme.textMutedClass}`} href="https://reactjs.org/">
          React.js
        </a>{' '}
        library and our{' '}
        <a
          className={`${state.theme.textMutedClass}`}
          href="https://github.com/ForgeRock/forgerock-javascript-sdk"
        >
          JavaScript SDK
        </a>
        .
      </p>
      <h2 className={`fs-4 fw-normal pt-3 pb-1 ${state.theme.textClass}`}>About this project</h2>
      <p>
        The purpose of this sample web app is to demonstrate how the ForgeRock JavaScript SDK is
        implemented within a fully-functional application using a popular framework. The source code
        for{' '}
        <a href="https://github.com/ForgeRock/forgerock-javascript-sdk/tree/master/samples/reactjs-todos">
          this project can be found on Github
        </a>{' '}
        and run locally for experimentation. For more on our SDKs,{' '}
        <a href="https://sdks.forgerock.com/">you can find our official SDK documentation here.</a>
      </p>
      {createAccountText}
    </div>
  );
}
