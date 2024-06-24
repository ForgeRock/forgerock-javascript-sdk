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
export type ActionCollectorTypes = 'FlowCollector' | 'SubmitCollector' | 'ActionCollector';

export interface ActionCollector {
  category: 'ActionCollector';
  type: ActionCollectorTypes;
  id: string;
  name: string;
  output: {
    key: string;
    label: string;
    type: string;
  };
}
export interface NodeState {
  authorization?: {
    code?: string;
    state?: string;
  };
  cache: {
    key: string;
  };
  client: {
    name?: string;
    description?: string;
    collectors?: (SingleValueCollector | ActionCollector)[];
  };
  error?: {
    code?: string;
    httpCode?: number;
    message?: string;
  };
  server: {
    id?: string;
    interactionId?: string;
    interactionToken?: string;
    href?: string;
    eventName?: string;
  };
  session?: string;
  status: string;
  success?: boolean;
}

// export interface CompleteState {}
