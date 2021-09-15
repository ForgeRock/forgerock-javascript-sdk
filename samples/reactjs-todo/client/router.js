/*
 * forgerock-sample-web-react
 *
 * router.js
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';

import Footer from './components/layout/footer';
import Header from './components/layout/header';
import Home from './views/home';
import Login from './views/login';
import Logout from './views/logout';
import Register from './views/register';
import Todos from './views/todos';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * @function App - Application React view
 * @returns {Object} - React component object
 */
export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/todos">
          <Header />
          <Todos />
          <Footer />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/">
          <ScrollToTop />
          <Header />
          <Home />
          <Footer />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
