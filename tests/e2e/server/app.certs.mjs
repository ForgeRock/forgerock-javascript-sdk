import https from 'https';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';

const certsUrl = new URL('../../../tests/e2e/certs', import.meta.url);
const certsPath = fileURLToPath(certsUrl);

https.globalAgent.options.ca = readFileSync(certsPath + '/ca.crt').toString('utf8');
export const key = readFileSync(certsPath + '/samples.key').toString('utf8');
export const cert = readFileSync(certsPath + '/samples.crt').toString('utf8');
