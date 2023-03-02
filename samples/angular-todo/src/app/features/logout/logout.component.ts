/*
 * angular-todo-prototype
 *
 * logout.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { configuration, user } from '@forgerock/login-widget/modal';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from 'samples/angular-todo/src/environments/environment';

/**
 * Used to log the user out whilst a spinner and message are displayed
 */
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router, public userService: UserService) {}

  /**
   * As soon as this component loads we want to log the user out
   */
  ngOnInit(): void {
    this.logout();
  }

  /**
   * Log the user out and redirect to the home page
   */
  async logout() {
    configuration.set({
      clientId: environment.WEB_OAUTH_CLIENT,
      redirectUri: environment.APP_URL,
      scope: 'openid profile email',
      serverConfig: {
        baseUrl: environment.AM_URL,
        timeout: 30000, // 90000 or less
      },
      realmPath: environment.REALM_PATH,
    });

    try {
      /** *********************************************************************
       * SDK INTEGRATION POINT
       * Summary: Logout, end session and revoke tokens
       * ----------------------------------------------------------------------
       * Details: Since this method is a global method via the Context API,
       * any part of the application can log a user out. This is helpful when
       * APIs are called and we get a 401 response, but here we respond to user
       * input clicking logout.
       ********************************************************************* */

      user.logout();
      this.userService.info = undefined;
      this.userService.isAuthenticated = false;
      setTimeout(() => this.redirectToHome(), 1000);
    } catch (err) {
      console.error(`Error: logout did not successfully complete; ${err}`);
    }
  }

  /**
   * Redirect the user to the home page
   */
  redirectToHome() {
    this.router.navigateByUrl('/home');
  }
}
