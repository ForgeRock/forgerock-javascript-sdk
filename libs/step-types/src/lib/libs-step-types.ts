import { StringDict } from '@forgerock/libs/shared';
import { ConfigOptions } from '@forgerock/libs/shared-types';
import { Callback } from '@forgerock/libs/fr-callback';
/**
 * Represents details of a failure in an authentication step.
 */
export interface StepDetail {
  failedPolicyRequirements?: FailedPolicyRequirement[];
  failureUrl?: string;
  result?: boolean;
}

/**
 * Represents the authentication tree API payload schema.
 */
export interface Step {
  authId?: string;
  callbacks?: Callback[];
  code?: number;
  description?: string;
  detail?: StepDetail;
  header?: string;
  message?: string;
  ok?: string;
  realm?: string;
  reason?: string;
  stage?: string;
  status?: number;
  successUrl?: string;
  tokenId?: string;
}

/**
 * Represents configuration overrides used when requesting the next
 * step in an authentication tree.
 */
export interface StepOptions extends ConfigOptions {
  query?: StringDict<string>;
}

/**
 * Represents failed policies for a matching property.
 */
export interface FailedPolicyRequirement {
  policyRequirements: PolicyRequirement[];
  property: string;
}

/**
 * Represents a failed policy policy and failed policy params.
 */
export interface PolicyRequirement {
  params?: Partial<PolicyParams>;
  policyRequirement: string;
}

export interface PolicyParams {
  [key: string]: unknown;
  disallowedFields: string;
  duplicateValue: string;
  forbiddenChars: string;
  maxLength: number;
  minLength: number;
  numCaps: number;
  numNums: number;
}
