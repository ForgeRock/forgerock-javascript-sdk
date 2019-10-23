import { Step } from 'auth/interfaces';
import { FailedPolicyRequirement, PolicyRequirement } from '../auth/interfaces';
import { PolicyKey, policyMessage } from './enums';
import { MessageCreator, ProcessedPropertyError } from './interfaces';

abstract class FRPolicy {
  /**
   * Parses policy errors and generates human readable error messages.
   *
   * @param {Step} err The step containing the error.
   * @param {MessageCreator} customMessage
   * Extensible and overiable custom error messages for policy faiures.
   * @return {ProcessedPropertyError[]} Array of objects contianing all processed policy errors.
   */
  public static parseErrors(
    err: Partial<Step>,
    customMessage?: MessageCreator,
  ): ProcessedPropertyError[] {
    let errors: ProcessedPropertyError[] = [];
    if (err.detail && err.detail.failedPolicyRequirements) {
      errors = [];
      err.detail.failedPolicyRequirements.map((x) => {
        errors.push.apply(errors, [
          {
            detail: x,
            messages: this.parseFailedPolicyRequirement(x, customMessage),
          },
        ]);
      });
    }
    return errors;
  }

  /**
   * Parses a failed policy and return a string array of error messages.
   *
   * @param {FailedPolicyRequirement} failePolicy The detail data of the failed policy.
   * @param {MessageCreator} customMessage
   * Extensible and overiable custom error messages for policy faiures.
   * @return {string[]} Array of strings with all processed policy errors.
   */

  public static parseFailedPolicyRequirement(
    failePolicy: FailedPolicyRequirement,
    customMessage?: MessageCreator,
  ): string[] {
    const errors: string[] = [];
    failePolicy.policyRequirements.map((policyRequirement) => {
      errors.push(
        this.parsePolicyRequirement(failePolicy.property, policyRequirement, customMessage),
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
   * Extensible and overiable custom error messages for policy faiures.
   * @return {string} Human readable error message.
   */
  public static parsePolicyRequirement(
    property: string,
    policy: PolicyRequirement,
    customMessage: MessageCreator = {},
  ): string {
    const policyRequirement = policy.policyRequirement;
    const params = policy.params ? { ...policy.params, policyRequirement } : { policyRequirement };
    const message = (
      customMessage[policyRequirement] ||
      policyMessage[policyRequirement] ||
      policyMessage[PolicyKey.unknownPolicy]
      )(property, params);

    return message;
  }
}

export default FRPolicy;
export { PolicyKey, MessageCreator, ProcessedPropertyError };
