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
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import Footer from './components/layout/footer';
import Header from './components/layout/header';
import Home from './views/home';
import Login from './views/login';
import Logout from './views/logout';
import Register from './views/register';
import { ProtectedRoute } from './utilities/route';
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
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="todos"
          element={
            <ProtectedRoute>
              <Header />
              <Todos />
              <Footer />
            </ProtectedRoute>
          }
        />
        <Route path="logout" element={<Logout />} />
        <Route
          path="/"
          element={
            <>
              <ScrollToTop />
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
