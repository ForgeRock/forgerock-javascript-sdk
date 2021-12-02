function fail(reason = 'fail was called in a test.'): void {
  throw new Error(reason);
}
global.fail = fail;
