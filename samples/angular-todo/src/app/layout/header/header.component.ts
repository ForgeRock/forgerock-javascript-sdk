/*
 * angular-todo-prototype
 *
 * header.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';
// Import the modal form factor
import Widget, { configuration, journey, modal, user } from '@forgerock/login-widget/modal';

/**
 * Used to show a navigation bar with router links and user info
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  /**
   * Initialise with user service and router as we will be using user info and showing router links
   * @param userService - Determine whether user is authenticated and get user info retrieved by other parts of the app
   * @param router - Show router links
   */
  constructor(
    public userService: UserService,
    public router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params) => {
      if (params.login) {
        this.launchWidget();
      }
    });
  }

  launchWidget() {
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

    // Instatiate the widget
    const widget = new Widget({
      target: document.getElementById('widget-root'),
    });

    modal.open();

    journey.onSuccess(async (response) => {
      try {
        // Assume user is likely authenticated if there are tokens
        const info = await user.info(true);
        this.userService.isAuthenticated = false;
        this.userService.info = info;
      } catch (err) {
        // User likely not authenticated
        console.log(err);
      }
    });
  }
}
