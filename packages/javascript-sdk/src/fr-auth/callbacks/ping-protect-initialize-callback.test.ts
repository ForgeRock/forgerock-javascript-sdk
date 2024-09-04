import { describe, expect, it } from 'vitest';
import { CallbackType } from '../../auth/enums';
import PingOneProtectInitializeCallback from './ping-protect-initialize-callback';

describe('PingOneProtectInitializeCallback', () => {
  it('should exist', () => {
    expect(PingOneProtectInitializeCallback).toBeDefined();
  });
  it('should test the getConfig method', () => {
    const callback = new PingOneProtectInitializeCallback({
      type: 'PingOneProtectInitializeCallback' as CallbackType,
      input: [
        {
          name: 'IDToken1signals',
          value: '',
        },
        {
          name: 'IDToken1clientError',
          value: '',
        },
      ],
      output: [
        {
          name: 'envId',
          value: '02fb4743-189a-4bc7-9d6c-a919edfe6447',
        },
        {
          name: 'consoleLogEnabled',
          value: false,
        },
        {
          name: 'deviceAttributesToIgnore',
          value: [],
        },
        {
          name: 'customHost',
          value: '',
        },
        {
          name: 'lazyMetadata',
          value: false,
        },
        {
          name: 'behavioralDataCollection',
          value: true,
        },
        {
          name: 'deviceKeyRsyncIntervals',
          value: 14,
        },
        {
          name: 'enableTrust',
          value: false,
        },
        {
          name: 'disableTags',
          value: false,
        },
        {
          name: 'disableHub',
          value: false,
        },
      ],
    });
    const mock = jest.spyOn(callback, 'getConfig');
    const config = callback.getConfig();
    expect(mock).toHaveBeenCalled();
    expect(config).toMatchObject({
      envId: '02fb4743-189a-4bc7-9d6c-a919edfe6447',
      consoleLogEnabled: false,
      deviceAttributesToIgnore: [],
      customHost: '',
      lazyMetadata: false,
      behavioralDataCollection: true,
      deviceKeyRsyncIntervals: 14,
      enableTrust: false,
      disableTags: false,
      disableHub: false,
    });
  });
  it('should test the setClientError method', () => {
    const callback = new PingOneProtectInitializeCallback({
      type: 'PingOneProtectInitializeCallback' as CallbackType,
      input: [
        {
          name: 'IDToken1signals',
          value: '',
        },
        {
          name: 'IDToken1clientError',
          value: '',
        },
      ],
      output: [
        {
          name: 'envId',
          value: '02fb4743-189a-4bc7-9d6c-a919edfe6447',
        },
        {
          name: 'consoleLogEnabled',
          value: false,
        },
        {
          name: 'deviceAttributesToIgnore',
          value: [],
        },
        {
          name: 'customHost',
          value: '',
        },
        {
          name: 'lazyMetadata',
          value: false,
        },
        {
          name: 'behavioralDataCollection',
          value: true,
        },
        {
          name: 'deviceKeyRsyncIntervals',
          value: 14,
        },
        {
          name: 'enableTrust',
          value: false,
        },
        {
          name: 'disableTags',
          value: false,
        },
        {
          name: 'disableHub',
          value: false,
        },
      ],
    });
    const mock = jest.spyOn(callback, 'setClientError');
    callback.setClientError('error i just set');
    expect(mock).toHaveBeenCalled();
    expect(callback.getInputValue('IDToken1clientError')).toBe('error i just set');
  });
});
