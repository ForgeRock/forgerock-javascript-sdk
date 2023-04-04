/*
 * @forgerock/javascript-sdk
 *
 * interfaces.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { FailedPolicyRequirement } from '../auth/interfaces';

interface MessageCreator {
  [key: string]: (propertyName: string, params?: { [key: string]: unknown }) => string;
}

interface ProcessedPropertyError {
  detail: FailedPolicyRequirement;
  messages: string[];
}

export { MessageCreator, ProcessedPropertyError };
