interface NameValue<T> {
  [name: string]: T;
}

interface Tokens {
  accessToken: string;
  idToken?: string;
  refreshToken?: string;
}

export { NameValue, Tokens };
