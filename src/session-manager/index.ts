import { resolve } from 'url';
import { getRealmUrlPath } from 'util/realm';
import Config, { ConfigOptions } from '../config/index';
import { isOkOr4xx } from '../util/http';
import { withTimeout } from '../util/timeout';

/**
 * Provides access to the session management API.
 */
abstract class SessionManager {
  /**
   * Ends the current session.
   */
  public static async logout(options?: ConfigOptions) {
    const { realmPath, serverConfig } = Config.get(options);
    const init: RequestInit = {
      credentials: 'include',
      method: 'POST',
    };

    const realmUrlPath = getRealmUrlPath(realmPath);
    const url = resolve(serverConfig.baseUrl, `json/${realmUrlPath}/sessions/?_action=logout`);

    const response = await withTimeout(fetch(url, init), serverConfig.timeout);
    if (!isOkOr4xx(response)) {
      throw new Error(`Failed to log out; received ${response.status}`);
    }
  }
}

export default SessionManager;
