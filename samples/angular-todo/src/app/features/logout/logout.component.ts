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
import { FRUser } from '@forgerock/javascript-sdk';

/**
 * Used to log the user out whilst a spinner and message are displayed
 */
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {
  constructor(private router: Router, public userService: UserService) { }

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
    try {
      await FRUser.logout();
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
