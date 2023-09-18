/*
 * angular-todo-prototype
 *
 * form.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { EventEmitter, OnInit, Output } from '@angular/core';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import type {
  FRCallback,
  FRLoginFailure,
  FRLoginSuccess,
  FRStep,
  IdPValue,
} from '@forgerock/javascript-sdk';
import {
  CallbackType,
  FRAuth,
  FRWebAuthn,
  TokenManager,
  UserManager,
  WebAuthnStepType,
} from '@forgerock/javascript-sdk';
import { UserService } from '../../../services/user.service';

/**
 * Used to display a login / registration form to the user, with authentication callbacks dynamically rendered based on the tree / journey
 */
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  /**
   * The value representing whether this is a login or registration journey, or something else
   */
  @Input() action?: string;

  /**
   * the value representing whether is a webAuthn step or not
   */
  @Output() isWebAuthn = new EventEmitter<boolean>();
  /**
   * The current step awaiting user input and submission to AM
   */
  step?: FRStep;

  /**
   * A representation of an authentication failure received from AM
   */
  failure?: FRLoginFailure;

  /**
   * A representation of an authentication success received from AM
   */
  success?: FRLoginSuccess;

  /**
   * The form title
   */
  title?: string;

  /**
   * The text for the submit button
   */
  buttonText?: string;

  /**
   * If the form is currently being submitted we want to display a spinner on the submit button
   */
  submittingForm = false;

  /**
   * The authentication tree or journey being specified in this authentication attempt
   */
  tree?: string;

  identityProviders: IdPValue[];
  code: string;
  state: string;
  showWebAuthn = false;
  webAuthnType: WebAuthnStepType;

  constructor(
    private router: Router,
    public userService: UserService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.code = this.route.snapshot.queryParamMap.get('code');
    this.state = this.route.snapshot.queryParamMap.get('state');
    this.setConfigForAction(this.action);
    this.nextStep();
  }

  /**
   * Call AM with a previous step to get a new step
   * @param step - The previous step that should contain the input for AM
   */
  async nextStep(step?: FRStep): Promise<void> {
    this.submittingForm = true;

    try {
      /** *********************************************************************
       * SDK INTEGRATION POINT
       * Summary: Handle selection of IdpCallbacks
       * ----------------------------------------------------------------------
       * Details: If we do not initially select the IdpCallback, when pressing enter,
       * local authentication will automatically be submitted.
       * This allows us to submit the form with the proper selection of an
       * identity provider rather than local authentication.
       ********************************************************************* */

      const selectIdPCallback = step?.getCallbacksOfType(CallbackType.SelectIdPCallback);

      if (selectIdPCallback?.length > 0) {
        const nameCallBacksInputs = step?.getCallbackOfType(CallbackType.NameCallback);
        const idToken2Input = nameCallBacksInputs?.getInputValue('IDToken2');

        if (this.isIdentityProviderLogin(selectIdPCallback[0]) && idToken2Input !== '') {
          selectIdPCallback[0].setInputValue('localAuthentication', 0);
        }
      }

      /** *********************************************************************
       * SDK INTEGRATION POINT
       * Summary: Call the SDK's next method to submit the current step.
       * ----------------------------------------------------------------------
       * Details: This calls the next method with the previous step, expecting
       * the next step to be returned, or a success or failure.
       ********************************************************************* */

      let nextStep;
      if (this.code && this.state) {
        nextStep = await FRAuth.resume(window.location.href);
      } else {
        nextStep = await FRAuth.next(step, { tree: this.tree });
      }

      /** *******************************************************************
       * SDK INTEGRATION POINT
       * Summary: Handle step based on step type
       * --------------------------------------------------------------------
       * Details: Determine whether the step is a login failure, success or
       * next step in the authentication journey, and handle appropriately.
       ******************************************************************* */
      switch (nextStep.type) {
        case 'LoginFailure':
          this.handleFailure(nextStep);
          break;
        case 'LoginSuccess':
          this.handleSuccess(nextStep);
          break;
        case 'Step':
          this.handleStep(nextStep);
          break;
        default:
          this.handleFailure();
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.submittingForm = false;
    }
  }

  handleFailure(failure?: FRLoginFailure) {
    this.failure = failure;
  }

  /**
   * If the user authenticates successfully, update the UI to show a spinner, get an access token save user info then navigate home
   * @param success - The step representing authentication success
   */
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

  /**
   * Store the next step in the authentication journey and set configuration depending on the action type
   * @param step - The next step in the journey
   */
  handleStep(step?: FRStep) {
    this.step = step;

    /**
     * Since WebAuthn is being handled as its own unique component, it is necessary to check if we have WebAuthn type step.
     * if so an output event is emitted to the log-in component to switch the login icon and render the webAuhtn component into the form component.
     */
    const webAuthnType = FRWebAuthn.getWebAuthnStepType(step);
    if (webAuthnType !== WebAuthnStepType.None) {
      this.showWebAuthn = true;
      this.webAuthnType = webAuthnType;
      this.isWebAuthn.emit(true);
    }

    const redirectCallback = step?.getCallbacksOfType(CallbackType.RedirectCallback);
    if (redirectCallback?.length > 0) {
      FRAuth.redirect(step);
    }
    this.setConfigForAction(this.action);

    if (step?.getHeader()) {
      this.title = step?.getHeader();
    }
  }

  /**
   * Initialise configuration for the page based on whether this is a login or registration journey, or something else
   * @param action - The type of action this form is being used for
   */
  setConfigForAction(action?: string) {
    switch (action) {
      case 'login': {
        this.title = 'Sign In';
        this.buttonText = 'Submit';
        this.tree = environment.JOURNEY_LOGIN;
        break;
      }
      case 'register': {
        this.title = 'Sign Up';
        (this.buttonText = 'Submit'), (this.tree = environment.JOURNEY_REGISTER);
        break;
      }
      default: {
        this.title = 'Welcome';
        this.buttonText = 'Next';
        this.tree = environment.JOURNEY_LOGIN;
        break;
      }
    }
  }

  isIdentityProviderLogin(callback: FRCallback): boolean {
    return callback
      ?.getOutputByName('providers', [])
      .filter((provider) => provider.provider !== 'localAuthentication').length > 0
      ? true
      : false;
  }

  requiresUserInput(callbacks: FRCallback[]): boolean {
    return callbacks.filter((callback) => {
      return (
        callback.getType() === CallbackType.ConfirmationCallback ||
        callback.getType() === CallbackType.SelectIdPCallback
      );
    }).length > 0
      ? false
      : true;
  }
}
