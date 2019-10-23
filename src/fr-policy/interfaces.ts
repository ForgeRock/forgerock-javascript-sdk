import { FailedPolicyRequirement } from '../auth/interfaces';

interface MessageCreator {
  [key: string]: (propertyName: string, params?: any ) => string;
}

interface ProcessedPropertyError {
  messages: string[];
  detail: FailedPolicyRequirement;
}

export {
  MessageCreator,
  ProcessedPropertyError,
};
