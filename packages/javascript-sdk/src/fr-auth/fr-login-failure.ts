/*
 * @forgerock/javascript-sdk
 *
 * fr-login-failure.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import FRPolicy from '../fr-policy';
import { MessageCreator, ProcessedPropertyError } from '../fr-policy/interfaces';
import { Step } from '../auth/interfaces';
import { StepType } from './enums';
import { AuthResponse, FailureDetail } from './interfaces';

class FRLoginFailure implements AuthResponse {
  /**
   * The type of step.
   */
  public readonly type = StepType.LoginFailure;

  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Step) {}

  /**
   * Gets the error code.
   */
  public getCode(): number {
    return Number(this.payload.code);
  }

  /**
   * Gets the failure details.
   */
  public getDetail(): FailureDetail | undefined {
    return this.payload.detail;
  }

  /**
   * Gets the failure message.
   */
  public getMessage(): string | undefined {
    return this.payload.message;
  }

  /**
   * Gets processed failure message.
   */
  public getProcessedMessage(messageCreator?: MessageCreator): ProcessedPropertyError[] {
    return FRPolicy.parseErrors(this.payload, messageCreator);
  }

  /**
   * Gets the failure reason.
   */
  public getReason(): string | undefined {
    return this.payload.reason;
  }
}

export default FRLoginFailure;
