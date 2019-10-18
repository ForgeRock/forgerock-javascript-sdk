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

import { plural } from '../strings';

// turn into enum for the policy names
// export at the bottom
// make into class - static
// fr-policy
export function parseErrors(err: ErrorResponse): object[] {
  let errors: object[] = [];
  if (err.detail && err.detail.failedPolicyRequirements) {
    errors = [];
    err.detail.failedPolicyRequirements.map((x) => {
      errors.push.apply(errors, [{ policyMessages: parseFailedPolicyRequirement(x), rawError: x}]);
    });
  }
  return errors;
}

export function parseFailedPolicyRequirement(policy: FailedPolicyRequirement): string[] {
  const errors: string[] = [];
  policy.policyRequirements.map((x) => {
    errors.push(parsePolicyRequirement(policy.property, x));
  });
  return errors;
}

export function parsePolicyRequirement(property: string, policy: PolicyRequirement): string {
  switch (policy.policyRequirement) {
    case 'MIN_LENGTH':
      const n: number = policy.params.minLength;
      return `${property} must be at least ${n} ${plural(n, 'character')}`;
    case 'UNIQUE':
      return `${property} must be unique`;
    default:
      return `${property}: Unknown policy requirement "${policy.policyRequirement}"`;
  }
}

export interface ErrorResponse {
  code: number;
  reason: string;
  message: string;
  detail: ErrorDetail;
}

export interface ErrorDetail {
  result: boolean;
  failedPolicyRequirements: FailedPolicyRequirement[];
}

export interface FailedPolicyRequirement {
  policyRequirements: PolicyRequirement[];
  property: string;
}

export interface PolicyRequirement {
  params?: any;
  policyRequirement: string;
}

export interface PolicyRequirementParams {
  [key: string]: number;
}
