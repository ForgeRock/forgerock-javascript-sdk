import Config from '../config/index';
import { LogLevel } from '../config/interfaces';

/*
 * Log “levels” are inclusive of its level and the level above.
 * error will log only error()
 * warn will log warn(), plus everything  in error level
 * info will log info(), plus everything from warn level
 * debug will log everything
 * none will log nothing
 */
type LogLevelRating = {
  ['none']: 0;
  ['error']: 25;
  ['warn']: 50;
  ['info']: 75;
  ['debug']: 100;
};

abstract class FRLogger {
  public static enabled(): LogLevelRating[LogLevel] {
    const { logLevel } = Config.get();
    /*
     * Return an object
     * which satisfies the LogLevelRating type
     * and has a key of the current log level
     * and a value of the log level rating
     */
    const logLevels = {
      none: 0,
      error: 25,
      warn: 50,
      info: 75,
      debug: 100,
    } satisfies LogLevelRating;

    return logLevels[logLevel];
  }
  static info(...msgs: unknown[]) {
    const { logger } = Config.get();
    if (this.enabled() >= 50) {
      if (logger && logger.info) {
        logger.info(...msgs);
      } else {
        console.info(...msgs);
      }
    }
  }
  static warn(...msgs: unknown[]) {
    const { logger } = Config.get();
    if (this.enabled() >= 50) {
      if (logger && logger.warn) {
        logger.warn(...msgs);
      } else {
        console.warn(...msgs);
      }
    }
  }
  static error(...msgs: unknown[]) {
    const { logger } = Config.get();
    if (this.enabled() >= 25) {
      if (logger && logger.error) {
        logger.error(...msgs);
      } else {
        console.error(...msgs);
      }
    }
  }
  static log(...msgs: unknown[]) {
    const { logger } = Config.get();
    if (this.enabled() >= 75) {
      if (logger && logger.log) {
        logger.log(...msgs);
      } else {
        console.log(...msgs);
      }
    }
  }
}

export { FRLogger };
