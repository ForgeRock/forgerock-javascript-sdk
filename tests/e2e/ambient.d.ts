declare const page: {
  goto: (url: string) => Promise<void>;
  on: (e: string, fn: (message: unknown) => void) => void;
  waitForSelector: (e: string, params: unknown) => Promise<void>;
};
