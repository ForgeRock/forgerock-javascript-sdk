function getProp<T>(obj: { [key: string]: unknown } | undefined, prop: string, defaultValue: T): T {
  if (!obj || obj[prop] === undefined) {
    return defaultValue;
  }
  return obj[prop] as T;
}

export { getProp };
