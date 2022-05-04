import { AM_DOMAIN_PATH, JSON_REALM_PATH } from '$lib/constants';
import { get as getCookie, remove as removeCookie } from '$lib/sessions';

export async function post(event) {
  const cookie = event.request.headers.get('cookie');
  const reqCookieUuid = cookie && cookie.match(/=(\S{1,})/);
  const reqCookie = Array.isArray(reqCookieUuid) && getCookie(reqCookieUuid[1]);
  Array.isArray(reqCookieUuid) && removeCookie(reqCookieUuid[1]);

  const response = await fetch(`${AM_DOMAIN_PATH}${JSON_REALM_PATH}/sessions/${event.url.search}`, {
    method: 'POST',
    headers: {
      cookie: reqCookie,
    },
  });

  // const resBody = await response.json();
  // console.log(response);

  return {
    status: 200,
    body: response.body,
    headers: {
      'set-cookie': '',
    },
  };
}
