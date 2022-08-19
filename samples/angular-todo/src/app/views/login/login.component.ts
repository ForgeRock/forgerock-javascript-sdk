/*
 * angular-todo-prototype
 *
 * login.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
// @ts-ignore
import Widget, { modal, journey } from 'forgerock-web-login-widget/modal';
import { Router } from '@angular/router';

/**
 * Used to show a login page
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const loginWidget = new Widget({
      target: document.getElementById('login-widget'), // Any existing element from static HTML file
      props: {
        config: {
          clientId: environment.WEB_OAUTH_CLIENT,
          redirectUri: environment.APP_URL,
          scope: 'openid profile email',
          serverConfig: {
            baseUrl: environment.AM_URL,
            timeout: 30000, // 90000 or less
          },
          realmPath: environment.REALM_PATH,
          tree: environment.JOURNEY_LOGIN,
        },
      },
    });
    modal.open();

    journey.onSuccess((userData: any) => {
      console.log(userData);
      loginWidget.$destroy();
      this.router.navigateByUrl('/');
    });
    journey.onFailure((error: any) => {
      console.log(error);
    });
  }
}
