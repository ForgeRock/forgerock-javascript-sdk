/*
 * angular-todo-prototype
 *
 * auth.guard.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public userService: UserService, private router: Router) {}

  /**
   * Extends CanActivate to protect selected routes from unauthenticated access
   *
   * @param next - Route that the user is trying to access
   * @param state - Router state
   * @returns Promise - Boolean or route to redirect the user to
   */
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<true | UrlTree> {
    return true;
  }
}
