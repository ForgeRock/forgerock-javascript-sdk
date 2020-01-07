import { Tokens } from '../shared/interfaces';

/** @hidden */
interface TokenDbEventTarget extends EventTarget {
  result?: Tokens;
}

/** @hidden */
interface TokenDbEvent extends Event {
  target: TokenDbEventTarget | null;
}

export { TokenDbEvent, TokenDbEventTarget };
