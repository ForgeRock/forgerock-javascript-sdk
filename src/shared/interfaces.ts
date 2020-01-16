interface StringDict<T> {
  [name: string]: T;
}

interface Tokens {
  accessToken: string;
  idToken?: string;
  refreshToken?: string;
}

export { StringDict, Tokens };
