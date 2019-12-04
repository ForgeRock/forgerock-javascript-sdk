const page = {
  goto: (): Promise<void> => Promise.resolve(),
  on: (): Promise<void> => Promise.resolve(),
  waitForSelector: (): Promise<void> => Promise.resolve(),
};

export { page };
