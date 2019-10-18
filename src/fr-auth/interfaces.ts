import { StepType } from './enums';

/**
 * Base interface for all types of authentication step responses.
 */
interface AuthResponse {
  type: StepType;
}

/**
 * Represents details of a failure in an authentication step.
 */
interface FailureDetail {
  failureUrl?: string;
}

export { AuthResponse, FailureDetail };
