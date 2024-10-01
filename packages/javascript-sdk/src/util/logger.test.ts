import { vi, describe, it, expect } from 'vitest';
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
    const spy = vi.spyOn(FRLogger, 'error').mockImplementation();
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
    const spy = vi.spyOn(FRLogger, 'warn').mockImplementation();
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
    const spy = vi.spyOn(FRLogger, 'log').mockImplementation();
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
    const spy = vi.spyOn(console, 'error').mockImplementation();
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
    const spyError = vi.spyOn(console, 'error').mockImplementation();
    const spyWarn = vi.spyOn(console, 'warn').mockImplementation();
    const spyInfo = vi.spyOn(console, 'info').mockImplementation();
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
    const spy = vi.spyOn(console, 'warn').mockImplementation();
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
    const spy = vi.spyOn(console, 'log').mockImplementation();
    FRLogger.log('test');

    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
  it('should allow a custom logger', () => {
    const myloggerFn: LoggerFunctions<typeof vi.fn, typeof vi.fn, typeof vi.fn> = {
      warn: vi.fn(),
      error: vi.fn(),
      log: vi.fn(),
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
    const myloggerFn: LoggerFunctions<typeof vi.fn, typeof vi.fn, typeof vi.fn> = {
      warn: vi.fn(),
      error: vi.fn(),
      log: vi.fn(),
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
    const spyWarn = vi.spyOn(console, 'warn').mockImplementation();
    const spyError = vi.spyOn(console, 'error').mockImplementation();
    const spyLog = vi.spyOn(console, 'log').mockImplementation();

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
    const spyWarn = vi.spyOn(console, 'warn').mockImplementation();
    const spyError = vi.spyOn(console, 'error').mockImplementation();
    const spyLog = vi.spyOn(console, 'log').mockImplementation();

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
    const spyWarn = vi.spyOn(console, 'warn').mockImplementation();
    const spyError = vi.spyOn(console, 'error').mockImplementation();
    const spyLog = vi.spyOn(console, 'log').mockImplementation();

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
    const spyWarn = vi.spyOn(console, 'warn').mockImplementation();
    const spyError = vi.spyOn(console, 'error').mockImplementation();
    const spyLog = vi.spyOn(console, 'log').mockImplementation();

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
    const spyWarn = vi.spyOn(console, 'warn').mockImplementation();
    const spyError = vi.spyOn(console, 'error').mockImplementation();
    const spyLog = vi.spyOn(console, 'log').mockImplementation();
    const spyInfo = vi.spyOn(console, 'info').mockImplementation();

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
