/*
 * @forgerock/javascript-sdk
 *
 * pkce.ts
 *
 * Copyright (c) 2020-2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/**
 * Helper class for generating verifier, challenge and state strings used for
 * Proof Key for Code Exchange (PKCE).
 */
abstract class PKCE {
  /**
   * Creates a random state.
   */
  public static createState(): string {
    return this.createRandomString(16);
  }

  /**
   * Creates a random verifier.
   */
  public static createVerifier(): string {
    return this.createRandomString(32);
  }

  /**
   * Creates a SHA-256 hash of the verifier.
   *
   * @param verifier The verifier to hash
   */
  public static async createChallenge(verifier: string): Promise<string> {
    const sha256 = await this.sha256(verifier);
    const challenge = this.base64UrlEncode(sha256);
    return challenge;
  }

  /**
   * Creates a base64 encoded, URL-friendly version of the specified array.
   *
   * @param array The array of numbers to encode
   */
  public static base64UrlEncode(array: Uint8Array): string {
    const numbers = Array.prototype.slice.call(array);
    const ascii = window.btoa(String.fromCharCode.apply(null, numbers));
    const urlEncoded = ascii.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
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
  /**
   * Creates a random string.
   *
   * @param size The number for entropy (default: 32)
   */
  private static createRandomString(num = 32): string {
    const random = new Uint8Array(num);
    window.crypto.getRandomValues(random);
    return btoa(random.join('')).replace(/[^a-zA-Z0-9]+/, '');
  }
}

export default PKCE;
