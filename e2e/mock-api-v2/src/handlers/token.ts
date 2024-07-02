import { Effect } from 'effect';
import { RouterBuilder } from 'effect-http';
import { apiSpec } from '../spec';
import { tokenResponseBody } from '../responses/token/token';

const tokenHandler = RouterBuilder.handler(apiSpec, 'PingOneToken', () =>
  // eslint-disable-next-line require-yield
  Effect.gen(function* () {
    return tokenResponseBody;
  }),
);

export { tokenHandler };
