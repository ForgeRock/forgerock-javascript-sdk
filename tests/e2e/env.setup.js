const { setup: setupDevServer } = require('jest-dev-server');
const liveServers = [
  {
    command: 'npm run start:e2e',
    port: 8443,
  },
];
const nonLiveServers = [
  {
    command: 'npm run start:e2e',
    port: 8443,
  },
  {
    command: 'npm run start:server',
    port: 9443,
  },
];
const servers = process.env.OAUTH_SERVER === 'live' ? liveServers : nonLiveServers;
module.exports = async () => {
  await setupDevServer(servers);
};
