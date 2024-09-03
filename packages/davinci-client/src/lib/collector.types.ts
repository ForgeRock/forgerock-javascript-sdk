/**
 * @interface SingleValueCollector - Represents a request to collect a single value from the user, like email or password.
 */
export type SingleValueCollectorTypes =
  | 'TextCollector'
  | 'PasswordCollector'
  | 'ListCollector'
  | 'SingleValueCollector';
export interface SingleValueCollector {
  category: 'SingleValueCollector';
  type: SingleValueCollectorTypes;
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
    value?: string;
  };
}

/**
 * @interface ActionCollector - Represents a user option to perform an action, like submitting a form or choosing another flow.
 */
export type ActionCollectorTypes =
  | 'FlowCollector'
  | 'SubmitCollector'
  | 'SocialLoginCollector'
  | 'ActionCollector';
export interface ActionCollector {
  category: 'ActionCollector';
  type: ActionCollectorTypes;
  id: string;
  name: string;
  output: {
    key: string;
    label: string;
    type: string;
    url?: string;
  };
}

export interface FlowCollector extends ActionCollector {}
export interface SocialLoginCollector extends ActionCollector {}
export interface PasswordCollector extends SingleValueCollector {}
export interface TextCollector extends SingleValueCollector {}
