export interface GenericError {
  code?: string | number;
  message: string;
  type:
    | 'argument_error'
    | 'davinci_error'
    | 'internal_error'
    | 'network_error'
    | 'state_error'
    | 'unknown_error';
}
