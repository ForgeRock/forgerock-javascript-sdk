/**
 *
 * SDKS-5448 regression tests — exact endpoint dispatch in the Token Vault Proxy.
 *
 * This drives the real, unmodified `proxy()` export exactly the way the
 * client iframe does (postMessage -> MessagePort), with no mocking of
 * proxy.ts itself. Only `global.fetch` is mocked, standing in for the
 * network boundary (the attacker-reachable resource server / AM).
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { proxy } from './proxy.js';
import type { ProxyConfig } from './types/index.js';

const CLIENT_ID = 'WebOAuthClient';
const APP_ORIGIN = 'https://app.example.com';
const AM_BASE_URL = 'https://openam.example.com/am/';
const API_ORIGIN = 'https://api.example.com';

type CapturedMessageHandler = (event: {
  data: unknown;
  origin: string;
  ports: { postMessage: (message: unknown) => void }[];
}) => Promise<void> | void;

function startProxy(config: ProxyConfig): CapturedMessageHandler {
  const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
  proxy(config);
  const call = addEventListenerSpy.mock.calls.find(([type]) => type === 'message');
  if (!call) {
    throw new Error('proxy() did not register a `message` listener');
  }
  return call[1] as CapturedMessageHandler;
}

function baseConfig(): ProxyConfig {
  return {
    app: { origin: APP_ORIGIN },
    forgerock: {
      clientId: CLIENT_ID,
      serverConfig: { baseUrl: AM_BASE_URL },
    } as ProxyConfig['forgerock'],
    proxy: {
      origin: 'https://vault.example.com',
      urls: [`${API_ORIGIN}/*`],
    },
  };
}

// proxy() does not await storeTokens, so storage lands a microtask later.
// Poll until the seeded accessToken is replaced by the expected value.
async function waitForStoredAccessToken(expected: string): Promise<string | null> {
  for (let i = 0; i < 50; i++) {
    const raw = localStorage.getItem(CLIENT_ID);
    if (raw) {
      const parsed = JSON.parse(raw) as Record<string, unknown>;
      if (parsed['accessToken'] === expected) {
        return raw;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  return null;
}

describe('SDKS-5448: exact endpoint dispatch', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Leg A fixed: substring in query no longer triggers token attachment on an allow-listed API endpoint', async () => {
    const REAL_ACCESS_TOKEN = 'SECRET-ACCESS-TOKEN-abc123';
    localStorage.setItem(
      CLIENT_ID,
      JSON.stringify({
        accessToken: REAL_ACCESS_TOKEN,
        idToken: 'secret-id-token',
        refreshToken: 'secret-refresh-token',
        scope: 'openid email',
        tokenExpiry: Date.now() + 10_000_000,
      }),
    );

    const fetchMock = vi.fn(async () => {
      return new Response(JSON.stringify({ id: 101, comment: 'hello' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    });
    vi.stubGlobal('fetch', fetchMock);

    const handler = startProxy(baseConfig());
    const responseToAttacker = vi.fn();

    // Attacker XSS on the app origin sends this — a normal-looking API call
    // whose query string merely contains the substring 'token/revoke'.
    await handler({
      data: {
        type: 'TVP_FETCH_RESOURCE',
        request: {
          url: `${API_ORIGIN}/v2/comments?cb=token/revoke`,
          options: {
            method: 'POST',
            headers: {},
            body: { text: async () => 'comment=hello' },
          },
        },
      },
      origin: APP_ORIGIN,
      ports: [{ postMessage: responseToAttacker }],
    });

    // 1. The request is treated as an ordinary API call: Bearer header,
    //    body passed through untouched — no token appended.
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [calledUrl, calledInit] = fetchMock.mock.calls[0];
    expect(calledUrl).toBe(`${API_ORIGIN}/v2/comments?cb=token/revoke`);
    const sentBody = (calledInit.body as URLSearchParams).toString();
    expect(sentBody).not.toContain(REAL_ACCESS_TOKEN);
    expect((calledInit.headers as Headers).get('authorization')).toBe(
      `Bearer ${REAL_ACCESS_TOKEN}`,
    );

    // 2. The response round-trips with any token-shaped values redacted.
    expect(responseToAttacker).toHaveBeenCalledTimes(1);
    const responsePayload = responseToAttacker.mock.calls[0][0] as {
      body: { comment: string; id: number };
    };
    expect(responsePayload.body.comment).toBe('hello');
    expect(responsePayload.body.id).toBe(101);
  });

  it('Leg B: percent-encoded access_token path is dispatched as the token endpoint and the response is redacted', async () => {
    const EXISTING_ACCESS_TOKEN = 'existing-access-token';
    localStorage.setItem(
      CLIENT_ID,
      JSON.stringify({
        accessToken: EXISTING_ACCESS_TOKEN,
        idToken: 'existing-id-token',
        refreshToken: 'existing-refresh-token',
        scope: 'openid email',
        tokenExpiry: Date.now() + 10_000_000,
      }),
    );

    const NEW_ACCESS_TOKEN = 'NEW-UNREDACTED-ACCESS-TOKEN-xyz';
    const NEW_REFRESH_TOKEN = 'NEW-UNREDACTED-REFRESH-TOKEN-xyz';

    // Stand-in for AM/Tomcat: it percent-decodes the path before routing,
    // so %61ccess_token is dispatched exactly like the real access_token
    // endpoint and returns a full token grant.
    const fetchMock = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          access_token: NEW_ACCESS_TOKEN,
          refresh_token: NEW_REFRESH_TOKEN,
          id_token: 'new-id-token',
          scope: 'openid email',
          token_type: 'Bearer',
          expires_in: 3600,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    });
    vi.stubGlobal('fetch', fetchMock);

    const handler = startProxy(baseConfig());
    const responseToAttacker = vi.fn();

    const encodedAccessTokenUrl = 'https://openam.example.com/am/oauth2/realms/root/%61ccess_token';
    // Sanity check the premise: the raw string genuinely does not contain 'access_token'.
    expect(encodedAccessTokenUrl.includes('access_token')).toBe(false);

    await handler({
      data: {
        type: 'TVP_FETCH_RESOURCE',
        request: {
          url: encodedAccessTokenUrl,
          options: {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: {
              text: async () =>
                'grant_type=authorization_code&code=STOLEN_CODE&code_verifier=STOLEN_VERIFIER&client_id=WebOAuthClient&redirect_uri=https://app.example.com/callback',
            },
          },
        },
      },
      origin: APP_ORIGIN,
      ports: [{ postMessage: responseToAttacker }],
    });

    expect(responseToAttacker).toHaveBeenCalledTimes(1);
    const responsePayload = responseToAttacker.mock.calls[0][0] as {
      body: { access_token: string; refresh_token: string; id_token: string };
    };

    // The AM server routed the decoded path as the token endpoint, so the
    // tokens ARE stored for the app's later use...
    const stored = JSON.parse((await waitForStoredAccessToken(NEW_ACCESS_TOKEN)) || '{}') as Record<
      string,
      unknown
    >;
    expect(stored['accessToken']).toBe(NEW_ACCESS_TOKEN);

    // ...but the response handed back to the caller is redacted, including
    // the refresh token.
    expect(responsePayload.body.access_token).toBe('REDACTED');
    expect(responsePayload.body.refresh_token).toBe('REDACTED');
  });

  it('Leg A2: substring in query no longer triggers id_token attachment via endSession branch', async () => {
    const EXISTING_ID_TOKEN = 'SECRET-ID-TOKEN-abc123';
    localStorage.setItem(
      CLIENT_ID,
      JSON.stringify({
        accessToken: 'existing-access-token',
        idToken: EXISTING_ID_TOKEN,
        refreshToken: 'existing-refresh-token',
        scope: 'openid email',
        tokenExpiry: Date.now() + 10_000_000,
      }),
    );

    const fetchMock = vi.fn(async () => {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    });
    vi.stubGlobal('fetch', fetchMock);

    const handler = startProxy(baseConfig());
    const responseToAttacker = vi.fn();

    await handler({
      data: {
        type: 'TVP_FETCH_RESOURCE',
        request: {
          url: `${API_ORIGIN}/v2/logout-redirect?cb=connect/endSession`,
          options: { method: 'GET' },
        },
      },
      origin: APP_ORIGIN,
      ports: [{ postMessage: responseToAttacker }],
    });

    // The id_token_hint must NOT be appended to the attacker-chosen URL.
    const [calledUrl] = fetchMock.mock.calls[0];
    expect(calledUrl).toBe(`${API_ORIGIN}/v2/logout-redirect?cb=connect/endSession`);
    expect(calledUrl).not.toContain(EXISTING_ID_TOKEN);
  });

  it('Legitimate flows still work: real revoke endpoint still attaches the token, real token exchange still stores and redacts', async () => {
    const REAL_ACCESS_TOKEN = 'SECRET-ACCESS-TOKEN-abc123';
    localStorage.setItem(
      CLIENT_ID,
      JSON.stringify({
        accessToken: REAL_ACCESS_TOKEN,
        idToken: 'secret-id-token',
        refreshToken: 'secret-refresh-token',
        scope: 'openid email',
        tokenExpiry: Date.now() + 10_000_000,
      }),
    );

    const fetchMock = vi.fn(async () => {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    });
    vi.stubGlobal('fetch', fetchMock);

    const handler = startProxy(baseConfig());
    const responseToAttacker = vi.fn();

    // 1. The REAL revoke endpoint: token must still be attached to the body.
    await handler({
      data: {
        type: 'TVP_FETCH_RESOURCE',
        request: {
          url: 'https://openam.example.com/am/oauth2/realms/root/token/revoke',
          options: {
            method: 'POST',
            headers: {},
            body: { text: async () => '' },
          },
        },
      },
      origin: APP_ORIGIN,
      ports: [{ postMessage: responseToAttacker }],
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [revokeUrl, revokeInit] = fetchMock.mock.calls[0];
    expect(revokeUrl).toBe('https://openam.example.com/am/oauth2/realms/root/token/revoke');
    expect((revokeInit.body as URLSearchParams).get('token')).toBe(REAL_ACCESS_TOKEN);

    // 2. The REAL access_token endpoint: exchange still stores the new tokens.
    localStorage.clear();
    const fetchMock2 = vi.fn(async () => {
      return new Response(
        JSON.stringify({
          access_token: 'fresh-access-token',
          refresh_token: 'fresh-refresh-token',
          id_token: 'fresh-id-token',
          scope: 'openid email',
          token_type: 'Bearer',
          expires_in: 3600,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    });
    vi.stubGlobal('fetch', fetchMock2);

    await handler({
      data: {
        type: 'TVP_FETCH_RESOURCE',
        request: {
          url: 'https://openam.example.com/am/oauth2/realms/root/access_token',
          options: {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: { text: async () => 'grant_type=authorization_code&code=CODE' },
          },
        },
      },
      origin: APP_ORIGIN,
      ports: [{ postMessage: responseToAttacker }],
    });

    const stored = JSON.parse(
      (await waitForStoredAccessToken('fresh-access-token')) || '{}',
    ) as Record<string, unknown>;
    expect(stored['accessToken']).toBe('fresh-access-token');
    expect(stored['refreshToken']).toBe('fresh-refresh-token');

    // The caller still gets a redacted body. The token-endpoint branch
    // rebuilds the body from the redaction list, so the id_token (not in
    // the default list) is dropped from the reply entirely — same as the
    // original code's behavior.
    const responsePayload = responseToAttacker.mock.calls[1][0] as {
      body: Record<string, string>;
    };
    expect(responsePayload.body['access_token']).toBe('REDACTED');
    expect(responsePayload.body['refresh_token']).toBe('REDACTED');
    expect(responsePayload.body['id_token']).toBeUndefined();
  });
});
