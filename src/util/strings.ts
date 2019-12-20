/** @hidden */
export function plural(n: number, singularText: string, pluralText?: string): string {
  if (n === 1) {
    return singularText;
  }
  return pluralText !== undefined ? pluralText : singularText + 's';
}
