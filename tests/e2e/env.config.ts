import { env } from 'process';

/**
 * Configure your environment defaults below.
 */
const oauth = {
  client: 'WebOAuthClient',
  scope: 'openid profile me.read',
};
const origins = {
  app: 'https://sdkapp.example.com',
  forgeops: 'https://default.iam.example.com',
  mock: 'https://auth.example.com',
  resource: 'https://api.example.com',
};
const paths = {
  am: '/am',
};
const ports = {
  app: '8443',
  forgeops: '51927',
  mock: '9443',
  resource: '9443',
};
const realm = 'root';
const testUsers = [
  {
    pw: 'ieH034K&-zlwqh3V_',
    un: '57a5b4e4-6999-4b45-bf86-a4f2e5d4b629',
  },
];

/**
 * The below will be composed of the above values.
 * Do not edit unless you know what you're doing.
 */
let amUrl;
let amPort;

if (env.LIVE) {
  amUrl = origins.forgeops;
  amPort = ports.forgeops;
} else {
  amUrl = origins.mock;
  amPort = ports.mock;
}

export const APP_PORT = ports.app;
export const AM_PORT = amPort;
export const MOCK_PORT = ports.mock;

export const AM_URL = `${amUrl}:${amPort}${paths.am}`;
export const BASE_URL = `${origins.app}:${ports.app}`;
export const CLIENT_ID = oauth.client;
export const FORGEOPS = origins.forgeops;
export const REALM_PATH = realm;
export const RESOURCE_URL = `${origins.resource}:${ports.resource}`;
export const SCOPE = oauth.scope;
export const USERS = testUsers;
