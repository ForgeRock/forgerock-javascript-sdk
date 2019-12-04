const page = {
  goto: (url: string) => Promise.resolve(),
  on: (e: string, params: unknown) => Promise.resolve(),
  waitForSelector: (selector: string, params: unknown) => Promise.resolve(),
};

export { page };
