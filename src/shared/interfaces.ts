interface AnyObject {
  [key: string]: {} | null | undefined;
}

interface Tokens {
  accessToken: string;
  idToken?: string;
  refreshToken?: string;
}

export { AnyObject, Tokens };
