// {
//   "code": 403,
//   "reason": "Forbidden",
//   "message": "Policy validation failed",
//   "detail": {
//     "result": false,
//     "failedPolicyRequirements": [
//       {
//         "policyRequirements": [{ "policyRequirement": "UNIQUE" }],
//         "property": "userName"
//       }
//     ]
//   }
// }

import { PolicyMessage, PolicyName } from './enums';
import {
  ErrorResponse,
  FailedPolicyRequirement,
  PolicyRequirement,
  } from './interfaces';

abstract class FRPolicy {

  public static parseErrors(err: ErrorResponse): object[] {
    let errors: object[] = [];
    if (err.detail && err.detail.failedPolicyRequirements) {
      errors = [];
      err.detail.failedPolicyRequirements.map((x) => {
        errors.push.apply(errors, [{ messages: this.parseFailedPolicyRequirement(x), detail: x}]);
      });
    }
    return errors;
  }

 public static parseFailedPolicyRequirement(policy: FailedPolicyRequirement): string[] {
    const errors: string[] = [];
    policy.policyRequirements.map((x) => {
      errors.push(this.parsePolicyRequirement(policy.property, x));
    });
    return errors;
  }

  public static parsePolicyRequirement(property: string, policy: PolicyRequirement): string {

    // Object.keys(PolicyName).forEach((name) => {
    //   if (PolicyName[name] === policy.policyRequirement) {

    //   }
    // });

    // for (const key in PolicyName) {
    //   if ( PolicyName[key as PolicyName]  === policy.policyRequirement) {

    //   }
    // }
    switch (policy.policyRequirement) {
      case PolicyName.required:
        return PolicyMessage.required(property);
      case PolicyName.unique:
        return PolicyMessage.unique(property);
      case PolicyName.matchRegexp:
        return PolicyMessage.matchRegexp(property);
      case PolicyName.validType:
        return PolicyMessage.validType(property);
      case PolicyName.validQueryFilter:
        return PolicyMessage.validQueryFilter(property);
      case PolicyName.validArrayItems:
        return PolicyMessage.validArrayItems(property);
      case PolicyName.validDate:
        return PolicyMessage.validDate(property);
      case PolicyName.validEmailAddress:
        return PolicyMessage.validEmailAddress(property);
      case PolicyName.validNameFormat:
        return PolicyMessage.validNameFormat(property);
      case PolicyName.validPhoneFormat:
        return PolicyMessage.validPhoneFormat(property);
      case PolicyName.leastCapitalLetters:
        const numCaps: number = policy.params.numCaps;
        return PolicyMessage.leastCapitalLetters(property, numCaps);
      case PolicyName.leastNumbers:
        const numNums: number = policy.params.numNums;
        return PolicyMessage.leastNumbers(property, numNums);
      case PolicyName.validNumber:
        return PolicyMessage.validNumber(property);
      case PolicyName.minimumNumber:
        return PolicyMessage.minimumNumber(property);
      case PolicyName.maximumNumber:
        return PolicyMessage.maximumNumber(property);
      case PolicyName.minLenght:
        const minLength: number = policy.params.minLength;
        return PolicyMessage.minLength(property, minLength);
      case PolicyName.maxLength:
        const maxLength = policy.params.maxLength;
        return PolicyMessage.maxLength(property, maxLength);
      case PolicyName.noOthers:
        const disallowed: string = policy.params.minLength;
        return PolicyMessage.noOthers(property, disallowed);
      case PolicyName.noCharacters:
        const characters: string = policy.params.minLength;
        return PolicyMessage.noCharacters(property, characters);
      case PolicyName.noDuplicates:
        const duplicates: string = policy.params.minLength;
        return PolicyMessage.noDuplicates(property, duplicates);
      default:
        return `${property}: Unknown policy requirement "${policy.policyRequirement}"`;
    }
  }
}

export default FRPolicy;
