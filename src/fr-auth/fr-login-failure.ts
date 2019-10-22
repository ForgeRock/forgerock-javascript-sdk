import FRPolicy from 'fr-policy';
import { ProcessedPropertyError } from 'fr-policy/interfaces';
import { Step } from '../auth/interfaces';
import { StepType } from './enums';
import { AuthResponse, FailureDetail } from './interfaces';

// add method to detect policy failure
// usage of that method and the fr-policy integration will fall on the developer
class FRLoginFailure implements AuthResponse {
  /**
   * The type of step.
   */
  public readonly type = StepType.LoginFailure;

  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Step) {}

  /**
   * Gets the error code.
   */
  public getCode(): number {
    return Number(this.payload.code);
  }

  /**
   * Gets the failure details.
   */
  public getDetail(): FailureDetail | undefined {
    return this.payload.detail;
  }

  /**
   * Gets the failure message.
   */
  public getMessage(): string | undefined {
    return this.payload.message;
  }

  /**
   * Gets processed failure message.
   */
  public getProcessedMessage(): ProcessedPropertyError[] | undefined {
    return FRPolicy.parseErrors(this.payload);
  }

  /**
   * Gets the failure reason.
   */
  public getReason(): string | undefined {
    return this.payload.reason;
  }
}

export default FRLoginFailure;
