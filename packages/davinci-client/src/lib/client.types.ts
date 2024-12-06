import { GenericError } from './error.types';
import { ErrorNode, FailureNode, ContinueNode, StartNode, SuccessNode } from './node.types';

export type InitFlow =
  | (() => Promise<{ error: GenericError }>)
  | (() => Promise<ContinueNode | ErrorNode | StartNode | SuccessNode | FailureNode>);

export type Updater = (value: string, index?: number) => { error: GenericError } | null;
