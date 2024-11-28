/**
 * @interface SingleValueCollector - Represents a request to collect a single value from the user, like email or password.
 */
export type SingleValueCollectorTypes =
  | 'TextCollector'
  | 'PasswordCollector'
  | 'ListCollector'
  | 'SingleValueCollector';

export interface SingleValueCollectorWithValue<T extends SingleValueCollectorTypes> {
  category: 'SingleValueCollector';
  error: string | null;
  type: T;
  id: string;
  name: string;
  input: { key: string; value: string | number | boolean; type: string };
  output: {
    key: string;
    label: string;
    type: string;
    value: string;
  };
}

export interface SingleValueCollectorWithNoValue<T extends SingleValueCollectorTypes> {
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
  | SingleValueCollectorWithValue<'ListCollector'>
  | SingleValueCollectorWithValue<'PasswordCollector'>
  | SingleValueCollectorWithValue<'TextCollector'>
  | SingleValueCollectorWithNoValue<'SingleValueCollector'>
  | SingleValueCollectorWithNoValue<'ListCollector'>
  | SingleValueCollectorWithNoValue<'PasswordCollector'>
  | SingleValueCollectorWithNoValue<'TextCollector'>;

export type SingleValueCollector<T extends SingleValueCollectorTypes> =
  | SingleValueCollectorWithValue<T>
  | SingleValueCollectorWithNoValue<T>;

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

export interface ActionCollectorWithUrl<T extends ActionCollectorTypes> {
  category: 'ActionCollector';
  error: string | null;
  type: T;
  id: string;
  name: string;
  output: {
    key: string;
    label: string;
    type: string;
    url: string | null;
  };
}

export type ActionCollector<T extends ActionCollectorTypes> =
  | ActionCollectorNoUrl<T>
  | ActionCollectorWithUrl<T>;

export type ActionCollectors =
  | ActionCollectorWithUrl<'ActionCollector'>
  | ActionCollectorWithUrl<'FlowCollector'>
  | ActionCollectorWithUrl<'SocialLoginCollector'>
  | ActionCollectorWithUrl<'SubmitCollector'>
  | ActionCollectorNoUrl<'ActionCollector'>
  | ActionCollectorNoUrl<'FlowCollector'>
  | ActionCollectorNoUrl<'SocialLoginCollector'>
  | ActionCollectorNoUrl<'SubmitCollector'>;

export type FlowCollector = ActionCollector<'FlowCollector'>;
export type PasswordCollector = SingleValueCollector<'PasswordCollector'>;
export type TextCollector = SingleValueCollector<'TextCollector'>;
export type SocialLoginCollector = ActionCollectorWithUrl<'SocialLoginCollector'>;
export type SubmitCollector = ActionCollector<'SubmitCollector'>;
