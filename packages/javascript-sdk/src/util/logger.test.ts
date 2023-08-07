import { FRLogger } from './logger';
import Config from '../config';
import { LoggerFunctions } from '../config/interfaces';

describe('Logger Class', () => {
  it('should instantiate with default log level when one is not passed in', () => {
    Config.set({
      serverConfig: {
        baseUrl: 'http://localhost:8080',
      },
      clientId: 'test',
      realmPath: 'alpha',
    });
    expect(FRLogger.enabled()).toEqual(0);
  });
  it('should instantiate with the log level that is passed in and verify if it should log', () => {
    Config.set({
      serverConfig: {
        baseUrl: 'http://localhost:8080',
      },
      clientId: 'test',
      realmPath: 'alpha',
      logLevel: 'info',
    });
    expect(FRLogger.enabled()).toEqual(75);
  });
  it('should call error method if logLevel allows it', () => {
    Config.set({
      serverConfig: {
        baseUrl: 'http://localhost:8080',
      },
      clientId: 'test',
      realmPath: 'alpha',
      logLevel: 'info',
    });
    const spy = jest.spyOn(FRLogger, 'error').mockImplementation();
    FRLogger.error('test');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
  it('should call warn if logLevel allows it', () => {
    Config.set({
      serverConfig: {
        baseUrl: 'http://localhost:8080',
      },
      clientId: 'test',
      realmPath: 'alpha',
      logLevel: 'info',
    });
    const spy = jest.spyOn(FRLogger, 'warn').mockImplementation();
    FRLogger.warn('test');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
  it('should call log if logLevel allows it', () => {
    Config.set({
      serverConfig: {
        baseUrl: 'http://localhost:8080',
      },
      clientId: 'test',
      realmPath: 'alpha',
      logLevel: 'info',
    });
    const spy = jest.spyOn(FRLogger, 'log').mockImplementation();
    FRLogger.log('test');
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
  it('should not call error if logLevel does not allow it', () => {
    Config.set({
      serverConfig: {
        baseUrl: 'http://localhost:8080',
      },
      clientId: 'test',
      realmPath: 'alpha',
      logLevel: 'none',
    });
    const spy = jest.spyOn(console, 'error').mockImplementation();
    FRLogger.error('test');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
  it('should only call error when set to error', () => {
    Config.set({
      serverConfig: {
        baseUrl: 'http://localhost:8080',
      },
      clientId: 'test',
      realmPath: 'alpha',
      logLevel: 'error',
    });
    const spyError = jest.spyOn(console, 'error').mockImplementation();
    const spyWarn = jest.spyOn(console, 'warn').mockImplementation();
    const spyInfo = jest.spyOn(console, 'info').mockImplementation();
    FRLogger.log('info');
    expect(spyInfo).not.toHaveBeenCalled();
    FRLogger.warn('test');
    FRLogger.error('error');
    expect(spyWarn).not.toHaveBeenCalled();
    expect(spyError).toHaveBeenCalled();
    spyInfo.mockRestore();
    spyError.mockRestore();
    spyWarn.mockRestore();
  });
  it('should not call warn if logLevel does not allow it', () => {
    Config.set({
      serverConfig: {
        baseUrl: 'http://localhost:8080',
      },
      clientId: 'test',
      realmPath: 'alpha',
      logLevel: 'none',
    });
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    FRLogger.warn('test');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
  it('should not call log if logLevel does not allow it', () => {
    Config.set({
      serverConfig: {
        baseUrl: 'http://localhost:8080',
      },
      clientId: 'test',
      realmPath: 'alpha',
      logLevel: 'none',
    });
    const spy = jest.spyOn(console, 'log').mockImplementation();
    FRLogger.log('test');

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
  it('should allow a custom logger', () => {
    const myloggerFn: LoggerFunctions<typeof jest.fn, typeof jest.fn, typeof jest.fn> = {
      warn: jest.fn(),
      error: jest.fn(),
      log: jest.fn(),
    };

    Config.set({
      serverConfig: {
        baseUrl: 'http://localhost:8080',
      },
      clientId: 'test',
      realmPath: 'alpha',
      logLevel: 'debug',
      logger: myloggerFn,
    });

    FRLogger.warn('test');
    expect(myloggerFn.warn).toHaveBeenCalled();

    FRLogger.log('test');
    expect(myloggerFn.log).toHaveBeenCalled();

    FRLogger.error('test');
    expect(myloggerFn.error).toHaveBeenCalled();
  });
  it('should allow a custom logger but not call methods that arent allowed', () => {
    const myloggerFn: LoggerFunctions<typeof jest.fn, typeof jest.fn, typeof jest.fn> = {
      warn: jest.fn(),
      error: jest.fn(),
      log: jest.fn(),
    };

    Config.set({
      serverConfig: {
        baseUrl: 'http://localhost:8080',
      },
      clientId: 'test',
      realmPath: 'alpha',
      logLevel: 'error',
      logger: myloggerFn,
    });

    FRLogger.warn('test');
    expect(myloggerFn.warn).not.toHaveBeenCalled();

    FRLogger.log('test');
    expect(myloggerFn.log).not.toHaveBeenCalled();

    FRLogger.error('test');
    expect(myloggerFn.error).toHaveBeenCalled();
  });
  it('should use the hierarchy of log levels appropriately for warn', () => {
    Config.set({
      serverConfig: {
        baseUrl: 'http://localhost:8080',
      },
      clientId: 'test',
      realmPath: 'alpha',
      logLevel: 'warn',
    });
    const spyWarn = jest.spyOn(console, 'warn').mockImplementation();
    const spyError = jest.spyOn(console, 'error').mockImplementation();
    const spyLog = jest.spyOn(console, 'log').mockImplementation();

    FRLogger.warn('test');
    expect(console.warn).toHaveBeenCalled();

    FRLogger.log('test');
    expect(console.log).not.toHaveBeenCalled();

    FRLogger.error('test');
    expect(console.error).toHaveBeenCalled();

    spyWarn.mockReset();
    spyError.mockReset();
    spyLog.mockReset();
  });
  it('should use the hierarchy of log levels appropriately for info', () => {
    Config.set({
      serverConfig: {
        baseUrl: 'http://localhost:8080',
      },
      clientId: 'test',
      realmPath: 'alpha',
      logLevel: 'info',
    });
    const spyWarn = jest.spyOn(console, 'warn').mockImplementation();
    const spyError = jest.spyOn(console, 'error').mockImplementation();
    const spyLog = jest.spyOn(console, 'log').mockImplementation();

    FRLogger.warn('test');
    expect(console.warn).toHaveBeenCalled();

    FRLogger.log('test');
    expect(console.log).toHaveBeenCalled();

    FRLogger.error('test');
    expect(console.error).toHaveBeenCalled();

    spyWarn.mockReset();
    spyError.mockReset();
    spyLog.mockReset();
  });
  it('should use the hierarchy of log levels appropriately for debug', () => {
    Config.set({
      serverConfig: {
        baseUrl: 'http://localhost:8080',
      },
      clientId: 'test',
      realmPath: 'alpha',
      logLevel: 'debug',
    });
    const spyWarn = jest.spyOn(console, 'warn').mockImplementation();
    const spyError = jest.spyOn(console, 'error').mockImplementation();
    const spyLog = jest.spyOn(console, 'log').mockImplementation();

    FRLogger.warn('test');
    expect(console.warn).toHaveBeenCalled();

    FRLogger.log('test');
    expect(console.log).toHaveBeenCalled();

    FRLogger.error('test');
    expect(console.error).toHaveBeenCalled();

    spyWarn.mockReset();
    spyError.mockReset();
    spyLog.mockReset();
  });
  it('should use the hierarchy of log levels appropriately for error', () => {
    Config.set({
      serverConfig: {
        baseUrl: 'http://localhost:8080',
      },
      clientId: 'test',
      realmPath: 'alpha',
      logLevel: 'error',
    });
    const spyWarn = jest.spyOn(console, 'warn').mockImplementation();
    const spyError = jest.spyOn(console, 'error').mockImplementation();
    const spyLog = jest.spyOn(console, 'log').mockImplementation();

    FRLogger.warn('test');
    expect(console.warn).not.toHaveBeenCalled();

    FRLogger.log('test');
    expect(console.log).not.toHaveBeenCalled();

    FRLogger.error('test');
    expect(console.error).toHaveBeenCalled();

    spyWarn.mockReset();
    spyError.mockReset();
    spyLog.mockReset();
  });
  it('should use the hierarchy of log levels appropriately for info', () => {
    Config.set({
      serverConfig: {
        baseUrl: 'http://localhost:8080',
      },
      clientId: 'test',
      realmPath: 'alpha',
      logLevel: 'info',
    });
    const spyWarn = jest.spyOn(console, 'warn').mockImplementation();
    const spyError = jest.spyOn(console, 'error').mockImplementation();
    const spyLog = jest.spyOn(console, 'log').mockImplementation();
    const spyInfo = jest.spyOn(console, 'info').mockImplementation();

    FRLogger.warn('test');
    expect(console.warn).toHaveBeenCalled();

    FRLogger.log('test');
    expect(console.log).toHaveBeenCalled();

    FRLogger.info('info');
    expect(console.info).toHaveBeenCalled();

    FRLogger.error('test');
    expect(console.error).toHaveBeenCalled();

    spyInfo.mockReset();
    spyWarn.mockReset();
    spyError.mockReset();
    spyLog.mockReset();
  });
});
