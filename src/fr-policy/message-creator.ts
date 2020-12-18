/*
 * @forgerock/javascript-sdk
 *
 * message-creator.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { plural } from '../util/strings';
import { PolicyKey } from './enums';
import { getProp } from './helpers';
import { MessageCreator } from './interfaces';

const defaultMessageCreator: MessageCreator = {
  [PolicyKey.CannotContainCharacters]: (property: string, params?: { forbiddenChars?: string }) => {
    const forbiddenChars = getProp<string>(params, 'forbiddenChars', '');
    return `${property} must not contain following characters: "${forbiddenChars}"`;
  },
  [PolicyKey.CannotContainDuplicates]: (property: string, params?: { duplicateValue?: string }) => {
    const duplicateValue = getProp<string>(params, 'duplicateValue', '');
    return `${property}  must not contain duplicates: "${duplicateValue}"`;
  },
  [PolicyKey.CannotContainOthers]: (property: string, params?: { disallowedFields?: string }) => {
    const disallowedFields = getProp<string>(params, 'disallowedFields', '');
    return `${property} must not contain: "${disallowedFields}"`;
  },
  [PolicyKey.LeastCapitalLetters]: (property: string, params?: { numCaps?: number }) => {
    const numCaps = getProp<number>(params, 'numCaps', 0);
    return `${property} must contain at least ${numCaps} capital ${plural(numCaps, 'letter')}`;
  },
  [PolicyKey.LeastNumbers]: (property: string, params?: { numNums?: number }) => {
    const numNums = getProp<number>(params, 'numNums', 0);
    return `${property} must contain at least ${numNums} numeric ${plural(numNums, 'value')}`;
  },
  [PolicyKey.MatchRegexp]: (property: string) => `${property} has failed the "MATCH_REGEXP" policy`,
  [PolicyKey.MaximumLength]: (property: string, params?: { maxLength?: number }) => {
    const maxLength = getProp<number>(params, 'maxLength', 0);
    return `${property} must be at most ${maxLength} ${plural(maxLength, 'character')}`;
  },
  [PolicyKey.MaximumNumber]: (property: string) =>
    `${property} has failed the "MAXIMUM_NUMBER_VALUE" policy`,
  [PolicyKey.MinimumLength]: (property: string, params?: { minLength?: number }) => {
    const minLength = getProp<number>(params, 'minLength', 0);
    return `${property} must be at least ${minLength} ${plural(minLength, 'character')}`;
  },
  [PolicyKey.MinimumNumber]: (property: string) =>
    `${property} has failed the "MINIMUM_NUMBER_VALUE" policy`,
  [PolicyKey.Required]: (property: string) => `${property} is required`,
  [PolicyKey.Unique]: (property: string) => `${property} must be unique`,
  [PolicyKey.UnknownPolicy]: (property: string, params?: { policyRequirement?: string }) => {
    const policyRequirement = getProp<string>(params, 'policyRequirement', 'Unknown');
    return `${property}: Unknown policy requirement "${policyRequirement}"`;
  },
  [PolicyKey.ValidArrayItems]: (property: string) =>
    `${property} has failed the "VALID_ARRAY_ITEMS" policy`,
  [PolicyKey.ValidDate]: (property: string) => `${property} has an invalid date`,
  [PolicyKey.ValidEmailAddress]: (property: string) => `${property} has an invalid email address`,
  [PolicyKey.ValidNameFormat]: (property: string) => `${property} has an invalid name format`,
  [PolicyKey.ValidNumber]: (property: string) => `${property} has an invalid number`,
  [PolicyKey.ValidPhoneFormat]: (property: string) => `${property} has an invalid phone number`,
  [PolicyKey.ValidQueryFilter]: (property: string) =>
    `${property} has failed the "VALID_QUERY_FILTER" policy`,
  [PolicyKey.ValidType]: (property: string) => `${property} has failed the "VALID_TYPE" policy`,
};

export default defaultMessageCreator;
