import { DEFAULT_TIMEOUT } from '../config';

function withTimeout<T>(promise: Promise<T>, timeout: number = DEFAULT_TIMEOUT) {
  const effectiveTimeout = timeout || DEFAULT_TIMEOUT;
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Timeout')), effectiveTimeout)),
  ]);
}

export { withTimeout };
