import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const certsUrl = new URL('../../../', import.meta.url);
const certsPath = fileURLToPath(certsUrl);

export const key = readFileSync(certsPath + 'example.com+5-key.pem').toString('utf8');
export const cert = readFileSync(certsPath + 'example.com+5.pem').toString('utf8');
