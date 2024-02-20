import { CallbackType } from '../../auth/enums';
import PingOneProtectEvaluationCallback from './ping-protect-evaluation-callback';

describe('PingOneProtectEvaluationCallback', () => {
  it('should be defined', () => {
    expect(PingOneProtectEvaluationCallback).toBeDefined();
  });
  it('should test that the pauseBehavior method can be called', () => {
    const callback = new PingOneProtectEvaluationCallback({
      type: 'PingOneProtectEvaluationCallback' as CallbackType.PingOneProtectEvaluationCallback,
      output: [{ name: 'pauseBehavioralData', value: true }],
    });
    const mock = jest.spyOn(callback, 'getPauseBehavioralData');
    callback.getPauseBehavioralData();
    expect(mock).toHaveBeenCalled();
  });
  it('should test setData method', () => {
    const callback = new PingOneProtectEvaluationCallback({
      type: 'PingOneProtectEvaluationCallback' as CallbackType.PingOneProtectEvaluationCallback,
      output: [{ name: 'signals', value: '' }],
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
    });
    const mock = jest.spyOn(callback, 'setData');
    callback.setData('data');
    expect(mock).toHaveBeenCalledWith('data');
    expect(callback.getInputValue('IDToken1signals')).toBe('data');
  });
  it('should test setClientError method', () => {
    const callback = new PingOneProtectEvaluationCallback({
      type: 'PingOneProtectEvaluationCallback' as CallbackType.PingOneProtectEvaluationCallback,
      output: [{ name: 'signals', value: '' }],
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
    });
    const mock = jest.spyOn(callback, 'setClientError');
    callback.setClientError('error i just set');
    expect(mock).toHaveBeenCalledWith('error i just set');
    expect(callback.getInputValue('IDToken1clientError')).toBe('error i just set');
  });
});
