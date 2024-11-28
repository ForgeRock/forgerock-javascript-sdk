/**
 * Import ConfigOptions type from the JavaScript SDK
 */
import type { AsyncConfigOptions } from '@forgerock/javascript-sdk/src/config/interfaces';
import { WellknownResponse } from './wellknown.types';

export interface DaVinciConfig extends AsyncConfigOptions {
  responseType: string;
}

export interface InternalDaVinciConfig extends DaVinciConfig {
  wellknownResponse: WellknownResponse;
}

/**
 * DaVinci configuration options that extends the Forgerock SDK configuration options
 */
// export type InternalDaVinciConfig =
//   | ((DavinciConfigWithResponseType | AsyncConfigOptions) & {
//       openIdConfiguration: OpenIdResponse;
//     })
//   | (DavinciConfigWithResponseType | AsyncConfigOptions);
