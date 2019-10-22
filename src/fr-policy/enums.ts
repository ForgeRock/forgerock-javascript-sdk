import { plural } from '../util/strings';

enum PolicyName {
  required = 'REQUIRED',
  unique = 'UNIQUE',
  matchRegexp = 'MATCH_REGEXP',
  validType = 'VALID_TYPE',
  validQueryFilter = 'VALID_QUERY_FILTER',
  validArrayItems = 'VALID_ARRAY_ITEMS',
  validDate = 'VALID_DATE',
  validEmailAddress = 'VALID_EMAIL_ADDRESS_FORMAT',
  validNameFormat = 'VALID_NAME_FORMAT',
  validPhoneFormat = 'VALID_PHONE_FORMAT',
  leastCapitalLetters = 'AT_LEAST_X_CAPITAL_LETTERS',
  leastNumbers = 'AT_LEAST_X_NUMBERS',
  validNumber = 'VALID_NUMBER',
  minimumNumber = 'MINIMUM_NUMBER_VALUE',
  maximumNumber = 'MAXIMUM_NUMBER_VALUE',
  minLenght = 'MIN_LENGTH',
  maxLength = 'MAX_LENGTH',
  noOthers = 'CANNOT_CONTAIN_OTHERS',
  noCharacters = 'CANNOT_CONTAIN_CHARACTERS',
  noDuplicates = 'CANNOT_CONTAIN_DUPLICATES',
}

namespace PolicyMessage {
  export const required = (propertyName: string) => (
    `${propertyName} is required`
  );
  export const unique = (propertyName: string) => (
    `${propertyName} must be unique`
  );
  export const matchRegexp = (propertyName: string) => (
    /* no current error message */
    `${propertyName}`
    /* no current error message */
  );
  export const validType = (propertyName: string) => (
    /* no current error message */
    `${propertyName}`
    /* no current error message */
  );
  export const validQueryFilter = (propertyName: string) => (
    /* no current error message */
    `${propertyName}`
    /* no current error message */
  );
  export const validArrayItems = (propertyName: string) => (
    /* no current error message */
    `${propertyName}`
    /* no current error message */
  );
  export const validDate = (propertyName: string) => (
    `${propertyName} has an invalid date`
  );
  export const validEmailAddress = (propertyName: string) => (
    `${propertyName} has an invalid email address`
  );
  export const validNameFormat = (propertyName: string) => (
    `${propertyName} has an invalid name format`
  );
  export const validPhoneFormat = (propertyName: string) => (
    `${propertyName} has an invalid phone number`
  );
  export const leastCapitalLetters = (propertyName: string, numCaps: number) => (
    `${propertyName} must contain at least ${numCaps} capital ${plural(numCaps, 'letter')}`
  );
  export const leastNumbers = (propertyName: string, numNums: number) => (
    `${propertyName} must contain at least ${numNums} numeric ${plural(numNums, 'value')}`
  );
  export const validNumber = (propertyName: string) => (
    `${propertyName} has an invalid number`
  );
  export const minimumNumber = (propertyName: string) => (
    /* no current error message */
    `${propertyName}`
    /* no current error message */
  );
  export const maximumNumber = (propertyName: string) => (
    /* no current error message */
    `${propertyName}`
    /* no current error message */
  );
  export const minLength = (propertyName: string, minLength: number) => (
    `${propertyName} must be at least ${minLength} ${plural(minLength, 'character')}`
  );
  export const maxLength = (propertyName: string, maxLength: number) => (
    `${propertyName} must be at most ${maxLength} ${plural(maxLength, 'character')}`
  );
  export const noOthers = (propertyName: string, disallowedFields: string) => (
    `${propertyName} must not contain: ${disallowedFields}`
  );
  export const noCharacters = (propertyName: string, forbiddenChars: string) => (
    `${propertyName} must not contain following characters: ${forbiddenChars}`
  );
  export const noDuplicates = (propertyName: string, duplicateValue: string) => (
    `${propertyName}  must not contain duplicates: ${duplicateValue}`
  );
}

export { PolicyName, PolicyMessage };
