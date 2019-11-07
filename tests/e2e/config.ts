import dotenv from 'dotenv';

dotenv.config();

const {
  AM_URL,
  BASE_URL,
  CHROME_PATH,
  CLIENT_ID,
  PASSWORD,
  REALM_PATH,
  SCOPE,
  TREE,
  USERNAME,
} = process.env;

export { AM_URL, BASE_URL, CHROME_PATH, CLIENT_ID, PASSWORD, REALM_PATH, SCOPE, TREE, USERNAME };
