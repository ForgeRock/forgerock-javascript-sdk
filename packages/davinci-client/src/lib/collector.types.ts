/**
 * @interface SingleValueCollector - Represents a request to collect a single value from the user, like email or password.
 */
export type SingleValueCollectorTypes =
  | 'TextCollector'
  | 'PasswordCollector'
  | 'ListCollector'
  | 'SingleValueCollector';

interface SingleValueCollectorWithValue<T extends SingleValueCollectorTypes> {
  category: 'SingleValueCollector';
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

interface SingleValueCollectorWithNoValue<T extends SingleValueCollectorTypes> {
  category: 'SingleValueCollector';
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

interface ActionCollectorNoUrl<T extends ActionCollectorTypes> {
  category: 'ActionCollector';
  type: T;
  id: string;
  name: string;
  output: {
    key: string;
    label: string;
    type: string;
    url?: string;
  };
}

interface ActionCollectorWithUrl<T extends ActionCollectorTypes> {
  category: 'ActionCollector';
  type: T;
  id: string;
  name: string;
  output: {
    key: string;
    label: string;
    type: string;
    url: string;
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
export type SocialLoginCollector = ActionCollector<'SocialLoginCollector'>;
export type PasswordCollector = SingleValueCollector<'PasswordCollector'>;
export type TextCollector = SingleValueCollector<'TextCollector'>;
