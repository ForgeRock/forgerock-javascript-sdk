import { Effect } from 'effect';
import { RouterBuilder } from 'effect-http';
import { apiSpec } from '../spec';
import { Tokens } from '../services/tokens';

const tokenHandler = RouterBuilder.handler(apiSpec, 'PingOneToken', (headers, query) =>
  Effect.gen(function* () {
    const { getTokens } = yield* Tokens;
    const tokens = yield* getTokens(headers, query);

    return tokens;
  }),
);

export { tokenHandler };
