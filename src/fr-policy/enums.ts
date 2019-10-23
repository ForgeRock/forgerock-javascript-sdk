import { PolicyParams } from 'auth/interfaces';
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
  minLength = 'MIN_LENGTH',
  maxLength = 'MAX_LENGTH',
  noOthers = 'CANNOT_CONTAIN_OTHERS',
  noCharacters = 'CANNOT_CONTAIN_CHARACTERS',
  noDuplicates = 'CANNOT_CONTAIN_DUPLICATES',
}

namespace PolicyMessage {
  export const required = (property: string) => (
    `${property} is required`
  );
  export const unique = (property: string) => (
    `${property} must be unique`
  );
  export const matchRegexp = (property: string) => (
    `${property} has failed the "MATCH_REGEXP" policy`
  );
  export const validType = (property: string) => (
    `${property} has failed the "VALID_TYPE" policy`
  );
  export const validQueryFilter = (property: string) => (
    `${property} has failed the "VALID_QUERY_FILTER" policy`
  );
  export const validArrayItems = (property: string) => (
    `${property} has failed the "VALID_ARRAY_ITEMS" policy`
  );
  export const validDate = (property: string) => (
    `${property} has an invalid date`
  );
  export const validEmailAddress = (property: string) => (
    `${property} has an invalid email address`
  );
  export const validNameFormat = (property: string) => (
    `${property} has an invalid name format`
  );
  export const validPhoneFormat = (property: string) => (
    `${property} has an invalid phone number`
  );
  export const leastCapitalLetters = (
    property: string, params: Pick<PolicyParams, 'numCaps'>) => {
    const numCaps: number = params.numCaps;
    return `${property} must contain at least ${numCaps} capital ${plural(numCaps, 'letter')}`;
  };
  export const leastNumbers = (property: string, params: Pick<PolicyParams, 'numNums'>) => {
    const numNums: number = params.numNums;
    return `${property} must contain at least ${numNums} numeric ${plural(numNums, 'value')}`;
  };
  export const validNumber = (property: string) => (
    `${property} has an invalid number`
  );
  export const minimumNumber = (property: string) => (
    `${property} has failed the "MINIMUM_NUMBER_VALUE" policy`
  );
  export const maximumNumber = (property: string) => (
    `${property} has failed the "MAXIMUM_NUMBER_VALUE" policy`
  );
  export const minLength = (property: string, params: Pick<PolicyParams, 'minLength'>) => {
    const minLength: number = params.minLength;
    return `${property} must be at least ${minLength} ${plural(minLength, 'character')}`;
  };
  export const maxLength = (property: string, params: Pick<PolicyParams, 'maxLength'>) => {
    const maxLength: number = params.maxLength;
    return `${property} must be at most ${maxLength} ${plural(maxLength, 'character')}`;
  };
  export const noOthers = (
    property: string, params: Pick<PolicyParams, 'disallowedFields'>,
  ) => {
    const disallowedFields: string = params.disallowedFields;
    return `${property} must not contain: "${disallowedFields}"`;
  };
  export const noCharacters = (
    property: string, params: Pick<PolicyParams, 'forbiddenChars'>,
  ) => {
    const forbiddenChars: string = params.forbiddenChars;
    return `${property} must not contain following characters: "${forbiddenChars}"`;
  };
  export const noDuplicates = (
    property: string, params: Pick<PolicyParams, 'duplicateValue'>,
  ) => {
    const duplicateValue: string = params.duplicateValue;
    return `${property}  must not contain duplicates: "${duplicateValue}"`;
  };
  export const unknownPolicy = (
    property: string, params: Pick<PolicyParams, 'policyRequirement'>,
  ) => (
    `${property}: Unknown policy requirement "${params.policyRequirement}"`
  );
}

export { PolicyName, PolicyMessage };
