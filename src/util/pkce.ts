/**
 * Helper class for generating verifier and challenge strings for PKCE.
 */
abstract class PKCE {
  /**
   * Creates a random verifier.
   *
   * @param size The length of the verifier (default 32 characters)
   */
  public static createVerifier(size = 32): string {
    const array = new Uint8Array(size);
    window.crypto.getRandomValues(array);
    const verifier = this.base64UrlEncode(array);
    return verifier;
  }

  /**
   * Creates a SDH-256 hash of the verifier.
   *
   * @param verifier The verifier to hash
   */
  public static async createChallenge(verifier: string): Promise<string> {
    const sha256 = await this.sha256(verifier);
    const challenge = this.base64UrlEncode(sha256);
    return challenge;
  }

  /**
   * Creates a base-64 encoded url-friendly version of the specified array.
   *
   * @param array The array of numbers to encode
   */
  public static base64UrlEncode(array: Uint8Array): string {
    const numbers = Array.prototype.slice.call(array);
    const ascii = window.btoa(String.fromCharCode.apply(null, numbers));
    const urlEncoded = ascii
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
    return urlEncoded;
  }

  /**
   * Creates a SHA-256 hash of the specified string.
   *
   * @param value The string to hash
   */
  public static async sha256(value: string): Promise<Uint8Array> {
    const uint8Array = new TextEncoder().encode(value);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', uint8Array);
    const hashArray = new Uint8Array(hashBuffer);
    return hashArray;
  }
}

export default PKCE;
