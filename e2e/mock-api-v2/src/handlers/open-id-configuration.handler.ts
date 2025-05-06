import { Effect } from 'effect';
import { RouterBuilder } from 'effect-http';
import { apiSpec } from '../spec.js';
import { openidConfigurationResponse } from '../responses/open-id-configuration.js';

const openidConfiguration = RouterBuilder.handler(apiSpec, 'openidConfiguration', () =>
  // eslint-disable-next-line require-yield
  Effect.gen(function* () {
    return openidConfigurationResponse;
  }),
);

export { openidConfiguration };
