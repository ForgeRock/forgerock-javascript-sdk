import { Step } from 'auth/interfaces';
import { FailedPolicyRequirement, PolicyRequirement } from '../auth/interfaces';
import { PolicyKey, policyMessage } from './enums';
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
    const policyRequirement = policy.policyRequirement;
    const params = policy.params ? { ...policy.params, policyRequirement } : { policyRequirement };
    const message = (
      customMessage[policyRequirement]
      || policyMessage[policyRequirement]
      || policyMessage[PolicyKey.unknownPolicy]
    )(property, params);

    return message;
  }
}

export default FRPolicy;
export { PolicyKey };
