import { Effect } from 'effect';
import { RouterBuilder } from 'effect-http';
import { apiSpec } from '../spec';
import { Fetch } from '../services/fetch';

const tokenHandler = RouterBuilder.handler(apiSpec, 'PingOneToken', () =>
  Effect.gen(function* () {
    const { get } = yield* Fetch;
    const tokens = yield* get('/tokens', {} as any);

    return tokens;
  }),
);

export { tokenHandler };
