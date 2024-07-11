import { Effect } from 'effect';
import { RouterBuilder } from 'effect-http';
import { apiSpec } from '../spec';
import { Tokens } from '../services/tokens';

const tokenHandler = RouterBuilder.handler(apiSpec, 'PingOneToken', () =>
  Effect.gen(function* () {
    const { getTokens } = yield* Tokens;
    const tokens = yield* getTokens(null, null);

    return tokens;
  }),
);

export { tokenHandler };
