import { Step } from 'auth/interfaces';
import { FailedPolicyRequirement, PolicyRequirement } from '../auth/interfaces';
import { PolicyMessage, PolicyName } from './enums';
import { MessageCreator, ProcessedPropertyError } from './interfaces';

abstract class FRPolicy {
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

  public static parsePolicyRequirement(
    property: string,
    policy: PolicyRequirement,
    customMessage: MessageCreator = {},
  ): string {
    const policyName: { [key: string]: string } = PolicyName;
    const policyMessage: MessageCreator = { ...PolicyMessage, ...customMessage };
    const policyRequirement: string = policy.policyRequirement;
    let message = policyMessage.unknownPolicy(property, { policyRequirement });

    Object.keys(policyName).forEach((name) => {
      if (policyName[name] === policyRequirement) {
        const params = policy.params || {};
        message = policyMessage[name](property, params);
      }
    });
    return message;
  }
}

export default FRPolicy;
