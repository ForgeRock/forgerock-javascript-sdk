/*
 * angular-todo-prototype
 *
 * webAuthn.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, Input, OnInit } from '@angular/core';
import {
  FRAuth,
  FRLoginFailure,
  FRLoginSuccess,
  FRStep,
  TokenManager,
  UserManager,
  FRWebAuthn,
  WebAuthnStepType,
} from '@forgerock/javascript-sdk';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

/**
 * Used to handle webAuthn journey
 */
@Component({
  selector: 'app-webAuthn',
  templateUrl: './webAuthn.component.html',
})
export class WebAuthnComponent implements OnInit {
  @Input() webAuthnType: WebAuthnStepType;
  @Input() step: FRStep;
  message: string;
  header: string;
  success: FRLoginSuccess;
  failure: FRLoginFailure;

  constructor(private router: Router, public userService: UserService) {}

  async ngOnInit(): Promise<void> {
    try {
      /** *********************************************************************
       * SDK INTEGRATION POINT
       * Summary: Handle type of webAuthn
       * ----------------------------------------------------------------------
       * Details: Depending on the type of webAuthn being handled, we set the values
       * for the message and header of the loading spinner and call for the respective method.
       * Finally with the result of the request, we handle the next step by calling the next function.
       ********************************************************************* */
      switch (this.webAuthnType) {
        case WebAuthnStepType.Registration:
          this.message = 'Your device will be used to verify your identity';
          this.header = 'Registering your device';
          this.step = await FRWebAuthn.register(this.step);
          break;

        case WebAuthnStepType.Authentication:
          this.message = 'Use your device to verify your identity';
          this.header = 'Verifying your identity';
          this.step = await FRWebAuthn.authenticate(this.step);
          break;
      }
    } catch (err) {
      console.log('Error in WebAuthn was caught, forwarding to server', err);
    }

    let nextStep;
    try {
      nextStep = await FRAuth.next(this.step);
    } catch (err) {
      console.log('Error in calling `/authenticate`', err);
    }

    switch (nextStep.type) {
      case 'LoginFailure':
        this.handleFailure(nextStep);
        break;
      case 'LoginSuccess':
        this.handleSuccess(nextStep);
        break;
      default:
        this.handleFailure();
    }
  }

  handleFailure(failure?: FRLoginFailure) {
    this.failure = failure;
  }

  async handleSuccess(success?: FRLoginSuccess) {
    this.success = success;
    try {
      /** *********************************************************************
       * SDK INTEGRATION POINT
       * Summary: Get OAuth/OIDC tokens with Authorization Code Flow w/PKCE.
       * ----------------------------------------------------------------------
       * Details: Since we have successfully authenticated the user, we can now
       * get the OAuth2/OIDC tokens. We are passing the `forceRenew` option to
       * ensure we get fresh tokens, regardless of existing tokens.
       ************************************************************************* */
      await TokenManager.getTokens({ forceRenew: true });

      /** *********************************************************************
       * SDK INTEGRATION POINT
       * Summary: Call the user info endpoint for some basic user data.
       * ----------------------------------------------------------------------
       * Details: This is an OAuth2 call that returns user information with a
       * valid access token. This is optional and only used for displaying
       * user info in the UI.
       ********************************************************************* */
      const info = await UserManager.getCurrentUser();
      this.userService.info = info;
      this.userService.isAuthenticated = true;

      this.router.navigateByUrl('/');
    } catch (err) {
      console.error(err);
    }
  }
}
