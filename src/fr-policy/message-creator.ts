import { PolicyParams } from '../auth/interfaces';
import { plural } from '../util/strings';
import { PolicyKey } from './enums';
import { MessageCreator } from './interfaces';

const defaultMessageCreator: MessageCreator = {
  [PolicyKey.CannotContainCharacters]: (
    property: string,
    params: Pick<PolicyParams, 'forbiddenChars'>,
  ) => {
    const forbiddenChars: string = params.forbiddenChars;
    return `${property} must not contain following characters: "${forbiddenChars}"`;
  },
  [PolicyKey.CannotContainDuplicates]: (
    property: string,
    params: Pick<PolicyParams, 'duplicateValue'>,
  ) => {
    const duplicateValue: string = params.duplicateValue;
    return `${property}  must not contain duplicates: "${duplicateValue}"`;
  },
  [PolicyKey.CannotContainOthers]: (
    property: string,
    params: Pick<PolicyParams, 'disallowedFields'>,
  ) => {
    const disallowedFields: string = params.disallowedFields;
    return `${property} must not contain: "${disallowedFields}"`;
  },
  [PolicyKey.LeastCapitalLetters]: (property: string, params: Pick<PolicyParams, 'numCaps'>) => {
    const numCaps: number = params.numCaps;
    return `${property} must contain at least ${numCaps} capital ${plural(numCaps, 'letter')}`;
  },
  [PolicyKey.LeastNumbers]: (property: string, params: Pick<PolicyParams, 'numNums'>) => {
    const numNums: number = params.numNums;
    return `${property} must contain at least ${numNums} numeric ${plural(numNums, 'value')}`;
  },
  [PolicyKey.MatchRegexp]: (property: string) => `${property} has failed the "MATCH_REGEXP" policy`,
  [PolicyKey.MaximumLength]: (property: string, params: Pick<PolicyParams, 'maxLength'>) => {
    const maxLength: number = params.maxLength;
    return `${property} must be at most ${maxLength} ${plural(maxLength, 'character')}`;
  },
  [PolicyKey.MaximumNumber]: (property: string) =>
    `${property} has failed the "MAXIMUM_NUMBER_VALUE" policy`,
  [PolicyKey.MinimumLength]: (property: string, params: Pick<PolicyParams, 'minLength'>) => {
    const minLength: number = params.minLength;
    return `${property} must be at least ${minLength} ${plural(minLength, 'character')}`;
  },
  [PolicyKey.MinimumNumber]: (property: string) =>
    `${property} has failed the "MINIMUM_NUMBER_VALUE" policy`,
  [PolicyKey.Required]: (property: string) => `${property} is required`,
  [PolicyKey.Unique]: (property: string) => `${property} must be unique`,
  [PolicyKey.UnknownPolicy]: (property: string, params: { policyRequirement: string }) =>
    `${property}: Unknown policy requirement "${params.policyRequirement}"`,
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
