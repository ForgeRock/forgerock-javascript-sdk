/*
 * @forgerock/javascript-sdk
 *
 * enums.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

enum PolicyKey {
  CannotContainCharacters = 'CANNOT_CONTAIN_CHARACTERS',
  CannotContainDuplicates = 'CANNOT_CONTAIN_DUPLICATES',
  CannotContainOthers = 'CANNOT_CONTAIN_OTHERS',
  LeastCapitalLetters = 'AT_LEAST_X_CAPITAL_LETTERS',
  LeastNumbers = 'AT_LEAST_X_NUMBERS',
  MatchRegexp = 'MATCH_REGEXP',
  MaximumLength = 'MAX_LENGTH',
  MaximumNumber = 'MAXIMUM_NUMBER_VALUE',
  MinimumLength = 'MIN_LENGTH',
  MinimumNumber = 'MINIMUM_NUMBER_VALUE',
  Required = 'REQUIRED',
  Unique = 'UNIQUE',
  UnknownPolicy = 'UNKNOWN_POLICY',
  ValidArrayItems = 'VALID_ARRAY_ITEMS',
  ValidDate = 'VALID_DATE',
  ValidEmailAddress = 'VALID_EMAIL_ADDRESS_FORMAT',
  ValidNameFormat = 'VALID_NAME_FORMAT',
  ValidNumber = 'VALID_NUMBER',
  ValidPhoneFormat = 'VALID_PHONE_FORMAT',
  ValidQueryFilter = 'VALID_QUERY_FILTER',
  ValidType = 'VALID_TYPE',
}

export { PolicyKey };
