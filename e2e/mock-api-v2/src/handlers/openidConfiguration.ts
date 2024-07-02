import { Effect } from 'effect';
import { RouterBuilder } from 'effect-http';
import { apiSpec } from '../spec';
import { openidConfigurationResponse } from '../responses/openidConfiguration';

const openidConfiguration = RouterBuilder.handler(apiSpec, 'openidConfiguration', () =>
  // eslint-disable-next-line require-yield
  Effect.gen(function* () {
    return openidConfigurationResponse;
  }),
);

export { openidConfiguration };
