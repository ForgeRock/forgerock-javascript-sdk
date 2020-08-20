const { setup: setupDevServer } = require('jest-dev-server');
const liveServers = [
  {
    command: 'npm run start:e2e',
    port: 8443,
  },
  {
    command: 'npm run start:server:live',
    port: 9443,
  },
];
const mockServers = [
  {
    command: 'npm run start:e2e',
    port: 8443,
  },
  {
    command: 'npm run start:server',
    port: 9443,
  },
];
const servers = process.env.LIVE === 'true' ? liveServers : mockServers;

module.exports = async () => {
  await setupDevServer(servers);
};
