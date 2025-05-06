/** ****************************************************************
 * This contains a few types pulled from the JavaScript SDK
 * TODO: Refactor the SDK to use these shared types instead of the internal ones
 */
import type { ConfigOptions } from '@forgerock/javascript-sdk';

/** ****************************************************************
 * NOTE: Pulled out of the SDK's /config/enums.ts file
 */
export enum ActionTypes {
  Authenticate = 'AUTHENTICATE',
  Authorize = 'AUTHORIZE',
  EndSession = 'END_SESSION',
  Logout = 'LOGOUT',
  ExchangeToken = 'EXCHANGE_TOKEN',
  RefreshToken = 'REFRESH_TOKEN',
  ResumeAuthenticate = 'RESUME_AUTHENTICATE',
  RevokeToken = 'REVOKE_TOKEN',
  StartAuthenticate = 'START_AUTHENTICATE',
  UserInfo = 'USER_INFO',
}

/** ****************************************************************
 * NOTE: Pulled out of the SDK's /config/interfaces.ts file
 */
export type ConfigurablePaths = keyof CustomPathConfig;

/** ****************************************************************
 * NOTE: Pulled out of the SDK's /config/interfaces.ts file
 * Optional configuration for custom paths for actions
 */
export interface CustomPathConfig {
  authenticate?: string;
  authorize?: string;
  accessToken?: string;
  endSession?: string;
  userInfo?: string;
  revoke?: string;
  sessions?: string;
}

/** ****************************************************************
 * This is the foundational config type for the Token Vault overall
 */
export type BaseConfig = {
  app: {
    origin: string;
  };
  events?: Partial<EventsConfig>;
  forgerock: ForgeRockConfig;
  interceptor: {
    file: string;
    type?: 'classic' | 'module';
    scope?: string;
  };
  proxy: {
    id?: string;
    origin: string;
    path?: string;
    redact?: ('access_token' | 'refresh_token' | 'id_token')[];
    urls?: string[];
  };
};

/** ****************************************************************
 * The events configuration object
 * We're going to make all props required, but allow call-sites to
 * use Partial<EventsConfig> to make props optional
 */
export type EventsConfig = {
  fetch: string;
  has: string;
  refresh: string;
  remove: string;
  set: string;
};

/** ****************************************************************
 * Overriding the serverConfig prop to make it & baseUrl required,
 * rather than optional
 *
 * Use type intersection to make the serverConfig prop required
 */
interface FRConfig {
  serverConfig: {
    baseUrl: string;
  };
}
export type ForgeRockConfig = FRConfig & ConfigOptions;

/** ****************************************************************
 * Convert the BaseConfig to all optional. Then, modify the result
 * specifically for the Proxy's config needs.
 *
 * TODO: The below could use some work; just trying to reuse as much as possible
 */
type AppConfigInit = BaseConfig['app'];
type ForgeRockConfigInit = BaseConfig['forgerock'];
// Pluck out the irrelevant props for Proxy configuration
type ProxyConfigBase = Omit<BaseConfig['proxy'], 'id' | 'path'>;
// Make only the `urls` property required.
interface ProxyConfigBaseRequired extends ProxyConfigBase {
  urls: ProxyConfigBase['urls'];
}
// Rebuild config specifically for Proxy configuration
export type ProxyConfig = {
  app: AppConfigInit;
  events?: Partial<EventsConfig>;
  forgerock: ForgeRockConfigInit;
  proxy: ProxyConfigBaseRequired;
};
