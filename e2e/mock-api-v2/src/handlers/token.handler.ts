import { Effect } from 'effect';
import { RouterBuilder } from 'effect-http';
import { apiSpec } from '../spec.js';
import { Tokens } from '../services/tokens.service.js';

const tokenHandler = RouterBuilder.handler(apiSpec, 'PingOneToken', () =>
  Effect.gen(function* () {
    const { getTokens } = yield* Tokens;
    const tokens = yield* getTokens(null);

    return tokens;
  }),
);

export { tokenHandler };
