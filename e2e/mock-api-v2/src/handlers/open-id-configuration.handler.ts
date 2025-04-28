/**
 *
 * Copyright (c) 2025 Ping Identity Corporation. All right reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 *
 **/

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
