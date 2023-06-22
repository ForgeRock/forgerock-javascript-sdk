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
 */
type ProxyConfigInit = Partial<BaseConfig>;
export interface ProxyConfig extends ProxyConfigInit {
  app: BaseConfig['app'];
  forgerock: BaseConfig['forgerock'];
  proxy?: BaseConfig['proxy'];
}
