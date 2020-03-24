import request from 'superagent';
import { key, cert } from './certs.mjs';
import { amURL } from './constants.mjs';

export let session;

export async function authorizeApp({ un, pw }) {
  const response = await request
    .post(`${amURL}/json/realms/root/authenticate`)
    .key(key)
    .cert(cert)
    .set('Content-Type', 'application/json')
    .set('Accept-API-Version', 'resource=2.0, protocol=1.0')
    .set('X-OpenAM-Username', un)
    .set('X-OpenAM-Password', pw)
    .send({});

  session = response.body;

  console.log(`REST app identity token: ${session.tokenId}`);

  return session;
}
