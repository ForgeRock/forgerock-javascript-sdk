forgerock.Config.set({
  clientId: 'sdk',
  redirectUri: 'https://forgerock-sdk-samples.com:3000/custom-ui/callback',
  scope: 'openid profile',
  serverConfig: { baseUrl: 'https://default.iam.example.com/am/', timeout: 30000 },
  realmPath: 'root',
  tree: 'Sample',
});
