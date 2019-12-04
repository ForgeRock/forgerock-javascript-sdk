import { Tokens } from '../shared/interfaces';

interface TokenDbEventTarget extends EventTarget {
  result?: Tokens;
}

interface TokenDbEvent extends Event {
  target: TokenDbEventTarget | null;
}

export { TokenDbEvent, TokenDbEventTarget };
