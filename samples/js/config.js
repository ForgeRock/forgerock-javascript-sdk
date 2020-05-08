forgerock.Config.set({
  clientId: 'WebOAuthClient',
  redirectUri: 'https://sdks.mytestrun.com:3000/custom-ui/callback',
  realmPath: 'sdk',
  scope: 'openid profile me.read',
  serverConfig: { baseUrl: 'https://idp37.mytestrun.com/openam', timeout: 30000 },
  tree: 'UsernamePassword',
});
