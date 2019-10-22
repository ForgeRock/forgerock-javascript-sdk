import { FailedPolicyRequirement } from '../auth/interfaces';

interface ProcessedPropertyError {
  messages: string[];
  detail: FailedPolicyRequirement;
}

export {
  ProcessedPropertyError,
};
