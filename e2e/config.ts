import dotenv from 'dotenv';

dotenv.config();

const {
  BASE_URL = 'https://www.forgerock-sdk-samples.com:3000',
  CHROME_PATH,
  CLIENT_ID,
  PASSWORD,
  SCOPE,
  TENANT,
  TREE,
  USERNAME,
} = process.env;

const SCREENSHOT_PATH = 'e2e/screenshots';

export {
  BASE_URL,
  CHROME_PATH,
  CLIENT_ID,
  PASSWORD,
  SCOPE,
  SCREENSHOT_PATH,
  TENANT,
  TREE,
  USERNAME,
};
