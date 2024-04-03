import { v4 } from 'uuid';
import FRCallback from '../fr-auth/callbacks';
import { CallbackType } from '../auth/enums';
import * as jose from 'jose';

const ALGORITHM = 'ES256';

/**
 * An emulator for a device binding client. Not for production use.
 * Can help with testing scenarios.
 */
export default class DeviceBindingEmulator {
  /**
   * Factory method to create a virtual device
   * @param issuer the issuer to use
   * @returns Promise that will resolve to a new device emulator object
   */
  public static async createDevice(
    issuer = 'com.forgerock.unsummit',
  ): Promise<DeviceBindingEmulator> {
    const { publicKey, privateKey } = await jose.generateKeyPair('ES256', {
      extractable: true,
    });

    const privateJwk = await jose.exportJWK(privateKey);
    const publicJwk = await jose.exportJWK(publicKey);
    const kid = v4();

    return new DeviceBindingEmulator(publicJwk, privateJwk, kid, issuer);
  }

  private publicJwk: jose.JWK;
  private privateJwk: jose.JWK;
  private kid: string;
  private deviceId: string = v4();
  private _userId = '';
  private issuer: string;

  private constructor(publicJwk: jose.JWK, privateJwk: jose.JWK, kid: string, issuer: string) {
    this.publicJwk = publicJwk;
    this.privateJwk = privateJwk;
    this.kid = kid;
    this.issuer = issuer;
  }

  /**
   * Execute device binding for a user and store the user
   * in this object. Will satisfy the device binding challenge
   * from the server, posing as an iOS client.
   * @param callback device binding callback received from a journey
   */
  public async bind(callback: FRCallback): Promise<void> {
    if (callback.getType() !== CallbackType.DeviceBindingCallback) {
      throw new Error(
        `Expecting a callback of type DeviceBindingCallback but got ${callback.getType()}`,
      );
    }

    const userId = callback.getOutputValue(0) as string;
    this._userId = userId;

    const challenge = callback.getOutputValue(3) as string;

    const jwt = await this.createDeviceBindingJwt(challenge);

    callback.setInputValue(jwt, 0);
    callback.setInputValue('iPhone', 1);
    callback.setInputValue(this.deviceId, 2);
  }

  /**
   * Perform the device signing operation, satisfying a device
   * signing verifier callback. This emulates login with face id or
   * thumbprint, etc. It also acts as though the iOS SDK.
   * @param callback the device signing callback
   */
  public async signIn(callback: FRCallback): Promise<void> {
    if (callback.getType() !== CallbackType.DeviceSigningVerifierCallback) {
      throw new Error(
        `Expecting a callback of type DeviceSigningVerifierCallback but got ${callback.getType()}`,
      );
    }

    const challenge = callback.getOutputValue(1) as string;

    const jwt = await this.createDeviceLoginJwt(challenge);

    callback.setInputValue(jwt, 0);
  }

  public get userId() {
    return this._userId;
  }

  public set userId(userId: string) {
    this._userId = userId;
  }

  private async createDeviceBindingJwt(challenge: string): Promise<string> {
    const { privateJwk, kid, publicJwk, _userId: sub } = this;

    return new jose.SignJWT({
      platform: 'ios',
      iss: this.issuer,
      sub,
      challenge,
    })
      .setProtectedHeader({
        typ: 'JWS',
        jwk: { kid, ...publicJwk },
        kid,
        alg: ALGORITHM,
      })
      .setIssuedAt()
      .setExpirationTime('1m')
      .sign(await jose.importJWK(privateJwk, ALGORITHM));
  }

  private async createDeviceLoginJwt(challenge: string): Promise<string> {
    const { privateJwk, kid, _userId: sub } = this;

    return new jose.SignJWT({
      iss: this.issuer,
      sub,
      challenge,
    })
      .setProtectedHeader({
        typ: 'JWS',
        kid,
        alg: ALGORITHM,
      })
      .setIssuedAt()
      .setExpirationTime('1m')
      .sign(await jose.importJWK(privateJwk, ALGORITHM));
  }
}
