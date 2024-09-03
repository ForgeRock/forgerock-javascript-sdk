/**
 * Import ConfigOptions type from the JavaScript SDK
 */
import { ConfigOptions } from '@forgerock/javascript-sdk';

/**
 * DaVinci configuration options that extends the Forgerock SDK configuration options
 */
export interface DaVinciConfig extends ConfigOptions {
  responseType?: string;
}
