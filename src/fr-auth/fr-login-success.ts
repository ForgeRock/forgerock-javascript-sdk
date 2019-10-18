import { Step } from '../auth/interfaces';
import { StepType } from './enums';
import { AuthResponse } from './interfaces';

class FRLoginSuccess implements AuthResponse {
  /**
   * The type of step.
   */
  public readonly type = StepType.LoginSuccess;

  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Step) {}

  /**
   * Gets the step's realm.
   */
  public getRealm() {
    return this.payload.realm;
  }

  /**
   * Gets the step's session token.
   */
  public getSessionToken() {
    return this.payload.tokenId;
  }

  /**
   * Gets the step's success URL.
   */
  public getSuccessUrl() {
    return this.payload.successUrl;
  }
}

export default FRLoginSuccess;
