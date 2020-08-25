function parseDisplayRecoveryCodesText(text: string): string[] {
  /**
   * e.g. ` ...
   *    "<div class=\"text-center\">\n" +
   *    "iZmEtxvQ00\n" +
   *    "</div>\n" +
   * ... `
   */
  const recoveryCodesMatches = text.match(/\s[\w\W]"([\w]*)\\/g);
  const recoveryCodes =
    Array.isArray(recoveryCodesMatches) &&
    recoveryCodesMatches.map((substr: string) => {
      // e.g. `"iZmEtxvQ00\`
      const arr = substr.match(/"([\w]*)\\/);
      return Array.isArray(arr) ? arr[1] : '';
    });
  return recoveryCodes || [];
}

export { parseDisplayRecoveryCodesText };
