import { TokenManager } from "@forgerock/javascript-sdk";

const url = new URL(document.location.href);
const params = url.searchParams;
const code = params.get('code');
const state = params.get('state');

if (code && state) {
  // Exchange auth code and state for tokens from the Authorization Server with async-await
  await TokenManager.getTokens({
    query: { code, state },
  });
}
