/*
 * angular-todo-prototype
 *
 * app.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { UserService } from './services/user.service';
import { Config, Tokens, TokenStorage, UserManager } from '@forgerock/javascript-sdk';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { filter, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'angular-todo-prototype';
  loading = false;

  constructor(public userService: UserService, private router: Router) {
    const navStart = router.events.pipe(
      filter((evt) => evt instanceof NavigationStart),
    ) as Observable<NavigationStart>;

    const navEnd: Observable<NavigationStart> = router.events.pipe(
      filter(
        (evt) =>
          evt instanceof NavigationEnd ||
          evt instanceof NavigationCancel ||
          evt instanceof NavigationError,
      ),
    ) as Observable<NavigationStart>;

    navStart.subscribe(() => (this.loading = true));
    navEnd.subscribe(() => (this.loading = false));
  }

  /**
   * Initialise the SDK and try to load the user when the app loads
   */
  async ngOnInit(): Promise<void> {
    Config.set({
      clientId: environment.WEB_OAUTH_CLIENT,
      redirectUri: environment.APP_URL,
      scope: 'openid profile email',
      serverConfig: {
        baseUrl: environment.AM_URL,
        timeout: 30000, // 90000 or less
      },
      realmPath: environment.REALM_PATH,
      tree: environment.JOURNEY_LOGIN,
    });

    try {
      const tokens: Tokens = await TokenStorage.get();
      if (tokens !== undefined) {
        // Assume user is likely authenticated if there are tokens
        const info = await UserManager.getCurrentUser();
        this.userService.isAuthenticated = true;
        this.userService.info = info;
      }
    } catch (err) {
      // User likely not authenticated
      console.log(err);
    }
  }
}
