/**
 * Import ConfigOptions type from the JavaScript SDK
 */
import { type AsyncConfigOptions } from '@forgerock/javascript-sdk/src/config/interfaces';

/**
 * DaVinci configuration options that extends the Forgerock SDK configuration options
 */
export interface DaVinciConfig extends AsyncConfigOptions {
  responseType?: string;
}
