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
  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  async ngOnInit(): Promise<void> {}
}
