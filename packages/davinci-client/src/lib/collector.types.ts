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

export interface ActionCollectorNoUrl<T extends ActionCollectorTypes> {
  category: 'ActionCollector';
  error: string | null;
  type: T;
  id: string;
  name: string;
  output: {
    key: string;
    label: string;
    type: string;
  };
}

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
export interface ActionCollectorWithUrl<T extends ActionCollectorTypes> {
  category: 'ActionCollector';
  error: string | null;
  type: T;
  id: string;
  name: string;
  output: ActionCollectorOutputTypes;
}

export type ActionCollector<T extends ActionCollectorTypes> =
  | ActionCollectorNoUrl<T>
  | ActionCollectorWithUrl<T>;

export type ActionCollectors =
  | ActionCollectorWithUrl<'SocialLoginCollector'>
  | ActionCollectorNoUrl<'ActionCollector'>
  | ActionCollectorNoUrl<'FlowCollector'>
  | ActionCollectorNoUrl<'SubmitCollector'>;

export type FlowCollector = ActionCollectorNoUrl<'FlowCollector'>;
export type PasswordCollector = SingleValueCollectorNoValue<'PasswordCollector'>;
export type TextCollector = SingleValueCollectorWithValue<'TextCollector'>;
export type SocialLoginCollector = ActionCollectorWithUrl<'SocialLoginCollector'>;
export type SubmitCollector = ActionCollectorNoUrl<'SubmitCollector'>;
