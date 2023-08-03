import type { ConfigOptions } from '../config/interfaces';
import Config from '../config/index';

abstract class Logger implements ConfigOptions {
  static shouldLog(): boolean {
    if (Config.logLevel === 'info') {
      return true;
    }
    return false;
  }

  static error(...msgs: unknown[]) {
    if (this.shouldLog()) {
      console.error(...msgs);
    }
  }
  static warn(...msgs: unknown[]) {
    if (this.shouldLog()) {
      console.warn(...msgs);
    }
  }
  static log(...msgs: unknown[]) {
    if (this.shouldLog()) {
      console.log(...msgs);
    }
  }
}

export { Logger };
