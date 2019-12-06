function parsePubKeyArray(s: string | unknown[]): PublicKeyCredentialParameters[] | undefined {
  if (!s) {
    return undefined;
  }
  if (Array.isArray(s)) {
    return s as PublicKeyCredentialParameters[];
  }
  if (typeof s !== 'string') {
    return undefined;
  }
  if (s.length > 0 && s[0] === '[') {
    return JSON.parse(s);
  }
  s = s.replace(/(\w+):/g, '"$1":');
  return JSON.parse(`[${s}]`);
}

export { parsePubKeyArray };
