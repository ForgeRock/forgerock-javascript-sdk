import { FailedPolicyRequirement } from '../auth/interfaces';

interface MessageCreator {
  [key: string]: (propertyName: string, params?: any) => string;
}

interface ProcessedPropertyError {
  detail: FailedPolicyRequirement;
  messages: string[];
}

export { MessageCreator, ProcessedPropertyError };
