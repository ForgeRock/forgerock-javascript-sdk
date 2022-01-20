/*
 * angular-todo-prototype
 *
 * form.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { FRAuth, FRLoginFailure, FRLoginSuccess, FRStep, TokenManager, UserManager, } from '@forgerock/javascript-sdk'; import { UserService } from 'src/app/services/user.service';

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
  submittingForm: boolean = false;

  /**
   * The authentication tree or journey being specified in this authentication attempt
   */
  tree?: string;

  constructor(private router: Router, public userService: UserService) { }

  ngOnInit(): void {
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
      let nextStep = await FRAuth.next(step, { tree: this.tree });

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
      await TokenManager.getTokens({ forceRenew: true });

      let info = await UserManager.getCurrentUser();

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
        this.buttonText = 'Sign In';
        this.tree = environment.JOURNEY_LOGIN;
        break;
      }
      case 'register': {
        this.title = 'Sign Up';
        (this.buttonText = 'Register'),
          (this.tree = environment.JOURNEY_REGISTER);
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
}
