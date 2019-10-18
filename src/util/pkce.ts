import * as crypto from 'crypto';

function createVerifier(size: number = 32): string {
  const verifier = base64URLEncode(crypto.randomBytes(size));
  return verifier;
}

function createChallenge(verifier: string): string {
  const challenge = base64URLEncode(sha256(verifier));
  return challenge;
}

function base64URLEncode(b: Buffer): string {
  return b
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function sha256(b: string): Buffer {
  return crypto
    .createHash('sha256')
    .update(b)
    .digest();
}

export { createVerifier, createChallenge };
