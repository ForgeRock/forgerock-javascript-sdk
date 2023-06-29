/*
 * angular-todo-prototype
 *
 * home.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import FRAuth from 'packages/javascript-sdk/src/fr-auth';

/**
 * Used to show a home page with information about the application, and links to sign in or register or a personalised welcome
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(public userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code') as any;
    const state = this.route.snapshot.queryParamMap.get('state') as any;
    if (code && state) {
      FRAuth.resume(window.location.href);
    }
  }
}
