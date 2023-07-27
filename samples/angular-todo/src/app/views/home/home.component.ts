/*
 * angular-todo-prototype
 *
 * home.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

/**
 * Used to show a home page with information about the application, and links to sign in or register or a personalised welcome
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(public userService: UserService) {}

  // ngOnInit(): void {
  //   const code = this.route.snapshot.queryParamMap.get('code');
  //   const state = this.route.snapshot.queryParamMap.get('state');
  //   if (code && state) {
  //     FRAuth.resume(window.location.href);
  //   }
  // }
}
