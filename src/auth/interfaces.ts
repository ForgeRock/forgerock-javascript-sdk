/*
 * @forgerock/javascript-sdk
 *
 * interfaces.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { ConfigOptions } from '../config/interfaces';
import { StringDict } from '../shared/interfaces';
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
  ok?: string;
  realm?: string;
  reason?: string;
  stage?: string;
  status?: number;
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
 * Represents configuration overrides used when requesting the next
 * step in an authentication tree.
 */
interface StepOptions extends ConfigOptions {
  query?: StringDict<string>;
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
  StepOptions,
};
