import { CallbackType } from '../../auth/enums';
import { Callback } from '../../auth/interfaces';
import AttributeInputCallback from './attribute-input-callback';

describe('AttributeInputCallback', () => {
  const payload: Callback = {
    _id: 0,
    input: [
      {
        name: 'IDToken0',
        value: '',
      },
    ],
    output: [
      {
        name: 'name',
        value: 'givenName',
      },
      {
        name: 'prompt',
        value: 'First Name:',
      },
      {
        name: 'required',
        value: true,
      },
      {
        name: 'policies',
        value: ['a', 'b'],
      },
      {
        name: 'failedPolicies',
        value: ['c', 'd'],
      },
    ],
    type: CallbackType.StringAttributeInputCallback,
  };

  it('reads/writes basic properties', () => {
    const cb = new AttributeInputCallback<string>(payload);
    cb.setValue('Clark');

    expect(cb.getType()).toBe('StringAttributeInputCallback');
    expect(cb.getName()).toBe('givenName');
    expect(cb.getPrompt()).toBe('First Name:');
    expect(cb.isRequired()).toBe(true);
    expect(cb.getPolicies()).toStrictEqual(['a', 'b']);
    expect(cb.getFailedPolicies()).toStrictEqual(['c', 'd']);
    expect(cb.getInputValue()).toBe('Clark');
  });
});
