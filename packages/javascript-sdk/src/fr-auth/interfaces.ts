/*
 * @forgerock/javascript-sdk
 *
 * interfaces.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { StepType } from './enums';

/**
 * Base interface for all types of authentication step responses.
 */
interface AuthResponse {
  type: StepType;
}

/**
 * Represents details of a failure in an authentication step.
 */
interface FailureDetail {
  failureUrl?: string;
}

export { AuthResponse, FailureDetail };
