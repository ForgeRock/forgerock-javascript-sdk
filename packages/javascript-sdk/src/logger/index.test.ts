import { Logger } from './index';
import Config from '../config';

describe('Logger Class', () => {
  it('should instantiate with default log level when one is not passed in', () => {
    Config.set({
      serverConfig: {
        baseUrl: 'http://localhost:8080',
      },
      clientId: 'test',
      realmPath: 'alpha',
    });
    expect(Logger.shouldLog()).toEqual(false);
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
    expect(Logger.shouldLog()).toEqual(true);
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
    const spy = jest.spyOn(console, 'error').mockImplementation();
    Logger.error('test');
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
    const spy = jest.spyOn(console, 'warn').mockImplementation();
    Logger.warn('test');
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
    const spy = jest.spyOn(console, 'log').mockImplementation();
    Logger.log('test');
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
    Logger.error('test');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
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
    Logger.warn('test');
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
    Logger.log('test');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
