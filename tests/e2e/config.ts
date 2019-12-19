import dotenv from 'dotenv';
import { MOCK_AM_PATH, MOCK_AM_PORT, MOCK_APP_PORT, MOCK_HOSTNAME } from './constants.js';

dotenv.config();
const useLiveOauth = process.env.OAUTH_SERVER === 'live';

export const AM_URL = useLiveOauth
  ? process.env.AM_URL
  : `${MOCK_HOSTNAME}:${MOCK_AM_PORT}${MOCK_AM_PATH}`;
export const BASE_URL = useLiveOauth ? process.env.BASE_URL : `${MOCK_HOSTNAME}:${MOCK_APP_PORT}`;
export const CHROME_PATH = process.env.CHROME_PATH;
export const CLIENT_ID = process.env.CLIENT_ID;
export const PASSWORD = process.env.PASSWORD;
export const REALM_PATH = process.env.REALM_PATH;
export const SCOPE = process.env.SCOPE;
export const TREE = process.env.TREE;
export const USERNAME = process.env.USERNAME;
