import { ConfigOptions } from '../config';

/**
 * Represents a UI implementation to be used with `FRUser.loginWithUI(ui)`.
 */
interface FRUI {
  clearState(): void;
  getSession(options?: ConfigOptions): Promise<string>;
}

export default FRUI;
