/**
 * @interface SingleValueCollector - Represents a request to collect a single value from the user, like email or password.
 */
export type SingleValueCollectorTypes =
  | 'TextCollector'
  | 'PasswordCollector'
  | 'SingleValueCollector';

export interface SingleValueCollectorWithValue<T extends SingleValueCollectorTypes> {
  category: 'SingleValueCollector';
  error: string | null;
  type: T;
  id: string;
  name: string;
  input: {
    key: string;
    value: string | number | boolean;
    type: string;
  };
  output: {
    key: string;
    label: string;
    type: string;
    value: string;
  };
}

export interface SingleValueCollectorNoValue<T extends SingleValueCollectorTypes> {
  category: 'SingleValueCollector';
  error: string | null;
  type: T;
  id: string;
  name: string;
  input: {
    key: string;
    value: string | number | boolean;
    type: string;
  };
  output: {
    key: string;
    label: string;
    type: string;
  };
}

export type SingleValueCollectors =
  | SingleValueCollectorWithValue<'SingleValueCollector'>
  | SingleValueCollectorWithValue<'TextCollector'>
  | SingleValueCollectorNoValue<'PasswordCollector'>;

export type SingleValueCollector<T extends SingleValueCollectorTypes> =
  | SingleValueCollectorWithValue<T>
  | SingleValueCollectorNoValue<T>;

/**
 * @interface ActionCollector - Represents a user option to perform an action, like submitting a form or choosing another flow.
 */
export type ActionCollectorTypes =
  | 'FlowCollector'
  | 'SubmitCollector'
  | 'SocialLoginCollector'
  | 'ActionCollector';

type ActionCollectorOutputTypes =
  | {
      key: string;
      label: string;
      type: string;
      url: string;
    }
  | {
      key: string;
      label: string;
      type: string;
    };

export interface ActionCollector<T extends ActionCollectorTypes> {
  category: 'ActionCollector';
  error: string | null;
  type: T;
  id: string;
  name: string;
  output: ActionCollectorOutputTypes;
}

export type ActionCollectors =
  | ActionCollector<'SocialLoginCollector'>
  | ActionCollector<'ActionCollector'>
  | ActionCollector<'FlowCollector'>
  | ActionCollector<'SubmitCollector'>;

export type FlowCollector = ActionCollector<'FlowCollector'>;
export type PasswordCollector = SingleValueCollectorNoValue<'PasswordCollector'>;
export type TextCollector = SingleValueCollectorWithValue<'TextCollector'>;
export type SocialLoginCollector = ActionCollector<'SocialLoginCollector'>;
export type SubmitCollector = ActionCollector<'SubmitCollector'>;
