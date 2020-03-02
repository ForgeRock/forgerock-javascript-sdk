import {
  AM_URL,
  BASE_URL,
  CLIENT_ID,
  PASSWORD,
  REALM_PATH,
  RESOURCE_URL,
  SCOPE,
  USERNAME,
} from '../config.mjs';

const url = new URL(BASE_URL);
url.searchParams.set('amUrl', AM_URL || '');
url.searchParams.set('resourceUrl', RESOURCE_URL || '');
url.searchParams.set('clientId', CLIENT_ID || '');
url.searchParams.set('realmPath', REALM_PATH || '');
url.searchParams.set('scope', SCOPE || '');
url.searchParams.set('un', USERNAME);
url.searchParams.set('pw', `${PASSWORD}`);

console.log(url.toString());
