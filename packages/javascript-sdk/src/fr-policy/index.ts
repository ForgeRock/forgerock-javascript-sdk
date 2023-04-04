/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { FailedPolicyRequirement, PolicyRequirement, Step } from '../auth/interfaces';
import { PolicyKey } from './enums';
import { MessageCreator, ProcessedPropertyError } from './interfaces';
import defaultMessageCreator from './message-creator';

/**
 * Utility for processing policy failures into human readable messages.
 *
 * Example:
 *
 * ```js
 * // Create message overrides and extensions as needed
 * const messageCreator = {
 *   [PolicyKey.unique]: (property: string) => (
 *     `this is a custom message for "UNIQUE" policy of ${property}`
 *   ),
 *   CUSTOM_POLICY: (property: string, params: any) => (
 *     `this is a custom message for "${params.policyRequirement}" policy of ${property}`
 *   ),
 * };
 *
 * const thisStep = await FRAuth.next(previousStep);
 *
 * if (thisStep.type === StepType.LoginFailure) {
 *   const messagesStepMethod = thisStep.getProcessedMessage(messageCreator);
 *   const messagesClassMethod = FRPolicy.parseErrors(thisStep, messageCreator)
 * }
 */
abstract class FRPolicy {
  /**
   * Parses policy errors and generates human readable error messages.
   *
   * @param {Step} err The step containing the error.
   * @param {MessageCreator} messageCreator
   * Extensible and overridable custom error messages for policy failures.
   * @return {ProcessedPropertyError[]} Array of objects containing all processed policy errors.
   */
  public static parseErrors(
    err: Partial<Step>,
    messageCreator?: MessageCreator,
  ): ProcessedPropertyError[] {
    const errors: ProcessedPropertyError[] = [];
    if (err.detail && err.detail.failedPolicyRequirements) {
      err.detail.failedPolicyRequirements.map((x) => {
        errors.push.apply(errors, [
          {
            detail: x,
            messages: this.parseFailedPolicyRequirement(x, messageCreator),
          },
        ]);
      });
    }
    return errors;
  }

  /**
   * Parses a failed policy and returns a string array of error messages.
   *
   * @param {FailedPolicyRequirement} failedPolicy The detail data of the failed policy.
   * @param {MessageCreator} customMessage
   * Extensible and overridable custom error messages for policy failures.
   * @return {string[]} Array of strings with all processed policy errors.
   */
  public static parseFailedPolicyRequirement(
    failedPolicy: FailedPolicyRequirement,
    messageCreator?: MessageCreator,
  ): string[] {
    const errors: string[] = [];
    failedPolicy.policyRequirements.map((policyRequirement) => {
      errors.push(
        this.parsePolicyRequirement(failedPolicy.property, policyRequirement, messageCreator),
      );
    });
    return errors;
  }

  /**
   * Parses a policy error into a human readable error message.
   *
   * @param {string} property The property with the policy failure.
   * @param {PolicyRequirement} policy The policy failure data.
   * @param {MessageCreator} customMessage
   * Extensible and overridable custom error messages for policy failures.
   * @return {string} Human readable error message.
   */
  public static parsePolicyRequirement(
    property: string,
    policy: PolicyRequirement,
    messageCreator: MessageCreator = {},
  ): string {
    // AM is returning policy requirement failures as JSON strings
    const policyObject = typeof policy === 'string' ? JSON.parse(policy) : { ...policy };

    const policyRequirement = policyObject.policyRequirement;

    // Determine which message creator function to use
    const effectiveMessageCreator =
      messageCreator[policyRequirement] ||
      defaultMessageCreator[policyRequirement] ||
      defaultMessageCreator[PolicyKey.UnknownPolicy];

    // Flatten the parameters and create the message
    const params = policyObject.params
      ? { ...policyObject.params, policyRequirement }
      : { policyRequirement };
    const message = effectiveMessageCreator(property, params);

    return message;
  }
}

export default FRPolicy;
export { PolicyKey, MessageCreator, ProcessedPropertyError };
