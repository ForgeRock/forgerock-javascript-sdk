import { AM_COOKIE_NAME, AM_DOMAIN_PATH, JSON_REALM_PATH } from '$lib/constants';
import { get, set } from '$lib/sessions';

export async function post(event) {
  const body = event.request.body.read();
  let cookieUuid: string;

  // console.log(body.toString());

  const cookie = event.request.headers.get('cookie');
  const reqCookieUuid = cookie && cookie.match(/=(\S{1,})/);
  const reqCookie = Array.isArray(reqCookieUuid) && get(reqCookieUuid[1]);
  console.log(`Cookie sent to AM: ${reqCookie}`);

  const response = await fetch(
    `${AM_DOMAIN_PATH}${JSON_REALM_PATH}/authenticate?authIndexType=service&authIndexValue=Login`,
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'accept-api-version': 'protocol=1.0,resource=2.1',
        'content-type': 'application/json',
        cookie: reqCookie,
      },
      body: body.toString(),
    },
  );

  const resBody = await response.json();

  // console.log('Body of response from authenticate call:');
  // console.log(resBody);

  const resCookie = response.headers.get('set-cookie');
  console.log(`AM response write cookie header: ${resCookie}`);

  if (resCookie.includes(AM_COOKIE_NAME)) {
    if (resCookie !== reqCookie) {
      cookieUuid = set(resCookie);
    }
  }

  return {
    status: 200,
    body: resBody,
    headers: {
      'set-cookie': cookieUuid
        ? `cookie=${cookieUuid}; domain=.crbrl.ngrok.io; SameSite=None; HTTPOnly; Secure;`
        : '',
    },
  };
}
