import crypto from 'crypto';
import { TextEncoder } from 'util';
import PKCE from '..';

Object.defineProperty(window, 'crypto', {
  value: {
    getRandomValues: (array: Uint8Array) => crypto.randomBytes(array.length),
    subtle: {
      digest: (alg: string, array: Uint8Array) => {
        if (alg === 'SHA-256') {
          return crypto
            .createHash('sha256')
            .update(array)
            .digest();
        }
        throw new Error(`Unsupported algorithm "${alg}"`);
      },
    },
  },
});

Object.defineProperty(global, 'TextEncoder', {
  value: TextEncoder,
});

describe('The PKCE module', () => {
  it('creates verifiers and challenges in the correct format', async () => {
    const validChars = /[a-z0-9-_]/i;
    for (let i = 1; i <= 100; i++) {
      const verifier = PKCE.createVerifier(i);
      expect(verifier).toMatch(validChars);

      const challenge = await PKCE.createChallenge(verifier);
      expect(challenge).toMatch(validChars);
    }
  });
});
