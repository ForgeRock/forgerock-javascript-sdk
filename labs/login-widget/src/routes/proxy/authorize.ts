import { AM_DOMAIN_PATH, OAUTH_REALM_PATH } from '$lib/constants';
import { get as getCookie } from '$lib/sessions';

export async function get(event) {
  console.log('Start authorization call');
  const cookie = event.request.headers.get('cookie');
  const reqCookieUuid = cookie && cookie.match(/=(\S{1,})/);
  const reqCookie = Array.isArray(reqCookieUuid) && getCookie(reqCookieUuid[1]);

  console.log('Authorize request: AM cookie sent');
  console.log(reqCookie);

  const response = await fetch(
    `${AM_DOMAIN_PATH}${OAUTH_REALM_PATH}/authorize${event.url.search}`,
    {
      method: 'GET',
      headers: {
        cookie: reqCookie,
      },
    },
  );

  // console.log(response.url);
  // console.log(await response.text());

  return {
    status: 302,
    headers: {
      location: response.url,
    },
  };
}
