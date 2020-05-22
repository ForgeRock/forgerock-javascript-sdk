import dotenv from 'dotenv';

dotenv.config();
const useLiveOauth = process.env.OAUTH_SERVER === 'live';

export const AM_URL = useLiveOauth ? process.env.AM_URL : 'https://auth.example.com:9443/am';
export const BASE_URL = useLiveOauth ? process.env.BASE_URL : 'https://sdkapp.example.com:8443';
export const CLIENT_ID = process.env.CLIENT_ID;
export const PASSWORD = process.env.PASSWORD;
export const REALM_PATH = process.env.REALM_PATH;
export const RESOURCE_URL = 'https://api.example.com:9443/account';
export const SCOPE = process.env.SCOPE;
export const TREE = process.env.TREE;
export const USERNAME = process.env.USERNAME;
