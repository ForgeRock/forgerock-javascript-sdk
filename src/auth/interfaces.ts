import { CallbackType } from './enums';

/**
 * Represents the authentication tree API payload schema.
 */
interface Step {
  authId?: string;
  callbacks?: Callback[];
  code?: number;
  description?: string;
  detail?: StepDetail;
  header?: string;
  message?: string;
  realm?: string;
  reason?: string;
  stage?: string;
  successUrl?: string;
  tokenId?: string;
}

/**
 * Represents details of a failure in an authentication step.
 */
interface StepDetail {
  failedPolicyRequirements?: FailedPolicyRequirement[];
  failureUrl?: string;
  result?: boolean;
}

/**
 * Represents failed policies for a matching property.
 */
interface FailedPolicyRequirement {
  policyRequirements: PolicyRequirement[];
  property: string;
}

/**
 * Represents a failed policy policy and failed policy params.
 */
interface PolicyRequirement {
  params?: Partial<PolicyParams>;
  policyRequirement: string;
}

interface PolicyParams {
  [key: string]: unknown;
  disallowedFields: string;
  duplicateValue: string;
  forbiddenChars: string;
  maxLength: number;
  minLength: number;
  numCaps: number;
  numNums: number;
}

/**
 * Represents the authentication tree API callback schema.
 */
interface Callback {
  _id?: number;
  input?: NameValue[];
  output: NameValue[];
  type: CallbackType;
}

/**
 * Represents a name/value pair found in an authentication tree callback.
 */
interface NameValue {
  name: string;
  value: unknown;
}

export {
  Callback,
  FailedPolicyRequirement,
  NameValue,
  PolicyParams,
  PolicyRequirement,
  Step,
  StepDetail,
};
