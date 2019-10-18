import FRCallback from '..';
import { CallbackType } from '../../../auth/enums';
import { Callback } from '../../../auth/interfaces';

describe('FRCallback', () => {
  it('reads/writes basic properties', () => {
    const payload: Callback = {
      _id: 0,
      input: [
        {
          name: 'userName',
          value: '',
        },
      ],
      output: [
        {
          name: 'prompt',
          value: 'Username:',
        },
      ],
      type: CallbackType.NameCallback,
    };
    const cb = new FRCallback(payload);
    cb.setInputValue('superman');

    expect(cb.getType()).toBe('NameCallback');
    expect(cb.getOutputValue('prompt')).toBe('Username:');
    expect(cb.getInputValue()).toBe('superman');
  });
});
