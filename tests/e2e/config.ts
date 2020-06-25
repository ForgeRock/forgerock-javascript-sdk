import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const AM_URL = process.env.AM_URL;
export const BASE_URL = process.env.BASE_URL;
export const CLIENT_ID = process.env.CLIENT_ID;
export const PASSWORD = process.env.PASSWORD;
export const REALM_PATH = process.env.REALM_PATH;
export const RESOURCE_URL = 'https://api.example.com:9443/account';
export const SCOPE = process.env.SCOPE;
export const TREE = process.env.TREE;
export const USERNAME = process.env.USERNAME;
