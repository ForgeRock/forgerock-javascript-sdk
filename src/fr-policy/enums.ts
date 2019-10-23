import { PolicyParams } from 'auth/interfaces';
import { plural } from '../util/strings';
import { MessageCreator } from './interfaces';

enum PolicyKey {
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
  unknownPolicy = 'UNKNOWN_POLICY',
}

const policyMessage: MessageCreator = {
  [PolicyKey.required]: (property: string) => (
    `${property} is required`
  ),
  [PolicyKey.unique] : (property: string) => (
    `${property} must be unique`
  ),
  [PolicyKey.matchRegexp]: (property: string) => (
    `${property} has failed the "MATCH_REGEXP" policy`
  ),
  [PolicyKey.validType]: (property: string) => (
    `${property} has failed the "VALID_TYPE" policy`
  ),
  [PolicyKey.validQueryFilter]: (property: string) => (
    `${property} has failed the "VALID_QUERY_FILTER" policy`
  ),
  [PolicyKey.validArrayItems]: (property: string) => (
    `${property} has failed the "VALID_ARRAY_ITEMS" policy`
  ),
  [PolicyKey.validDate]: (property: string) => (
    `${property} has an invalid date`
  ),
  [PolicyKey.validEmailAddress]: (property: string) => (
    `${property} has an invalid email address`
  ),
  [PolicyKey.validNameFormat]: (property: string) => (
    `${property} has an invalid name format`
  ),
  [PolicyKey.validPhoneFormat]: (property: string) => (
    `${property} has an invalid phone number`
  ),
  [PolicyKey.leastCapitalLetters]: (
    property: string, params: Pick<PolicyParams, 'numCaps'>) => {
    const numCaps: number = params.numCaps;
    return `${property} must contain at least ${numCaps} capital ${plural(numCaps, 'letter')}`;
  },
  [PolicyKey.leastNumbers]: (property: string, params: Pick<PolicyParams, 'numNums'>) => {
    const numNums: number = params.numNums;
    return `${property} must contain at least ${numNums} numeric ${plural(numNums, 'value')}`;
  },
  [PolicyKey.validNumber]: (property: string) => (
    `${property} has an invalid number`
  ),
  [PolicyKey.minimumNumber]: (property: string) => (
    `${property} has failed the "MINIMUM_NUMBER_VALUE" policy`
  ),
  [PolicyKey.maximumNumber]: (property: string) => (
    `${property} has failed the "MAXIMUM_NUMBER_VALUE" policy`
  ),
  [PolicyKey.minLength]: (property: string, params: Pick<PolicyParams, 'minLength'>) => {
    const minLength: number = params.minLength;
    return `${property} must be at least ${minLength} ${plural(minLength, 'character')}`;
  },
  [PolicyKey.maxLength]: (property: string, params: Pick<PolicyParams, 'maxLength'>) => {
    const maxLength: number = params.maxLength;
    return `${property} must be at most ${maxLength} ${plural(maxLength, 'character')}`;
  },
  [PolicyKey.noOthers]: (
    property: string, params: Pick<PolicyParams, 'disallowedFields'>,
  ) => {
    const disallowedFields: string = params.disallowedFields;
    return `${property} must not contain: "${disallowedFields}"`;
  },
  [PolicyKey.noCharacters]: (
    property: string, params: Pick<PolicyParams, 'forbiddenChars'>,
  ) => {
    const forbiddenChars: string = params.forbiddenChars;
    return `${property} must not contain following characters: "${forbiddenChars}"`;
  },
  [PolicyKey.noDuplicates]: (
    property: string, params: Pick<PolicyParams, 'duplicateValue'>,
  ) => {
    const duplicateValue: string = params.duplicateValue;
    return `${property}  must not contain duplicates: "${duplicateValue}"`;
  },
  [PolicyKey.unknownPolicy]: (
    property: string, params: Pick<PolicyParams, 'policyRequirement'>,
  ) => (
    `${property}: Unknown policy requirement "${params.policyRequirement}"`
  ),
};

export { PolicyKey, policyMessage };
