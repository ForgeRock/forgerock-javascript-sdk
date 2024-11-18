/**
 * Import ConfigOptions type from the JavaScript SDK
 */
import type { AsyncConfigOptions } from '@forgerock/javascript-sdk/src/config/interfaces';

export interface DavinciConfigWithResponseType extends AsyncConfigOptions {
  responseType: string;
}

/**
 * DaVinci configuration options that extends the Forgerock SDK configuration options
 */
export type DaVinciConfig = DavinciConfigWithResponseType | AsyncConfigOptions;
