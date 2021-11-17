/*
 * @forgerock/javascript-sdk
 *
 * fr-login-success.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Step } from '../auth/interfaces';
import { StepType } from './enums';
import { AuthResponse } from './interfaces';

class FRLoginSuccess implements AuthResponse {
  /**
   * The type of step.
   */
  public readonly type = StepType.LoginSuccess;

  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Step) {}

  /**
   * Gets the step's realm.
   */
  public getRealm(): string | undefined {
    return this.payload.realm;
  }

  /**
   * Gets the step's session token.
   */
  public getSessionToken(): string | undefined {
    return this.payload.tokenId;
  }

  /**
   * Gets the step's success URL.
   */
  public getSuccessUrl(): string | undefined {
    return this.payload.successUrl;
  }
}

export default FRLoginSuccess;
