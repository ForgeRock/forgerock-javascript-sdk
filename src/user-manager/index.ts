import OAuth2Client from '../oauth2-client';

/**
 * Provides access to the current user's profile.
 */
abstract class UserManager {
  /**
   * Gets the current user's profile.
   */
  public static getCurrentUser() {
    return OAuth2Client.getUserInfo();
  }
}

export default UserManager;
