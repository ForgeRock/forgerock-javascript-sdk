const nonLiveServers = 'npm run server:e2e & npm run server:iframe';
const liveServers = 'npm run server:e2e:live';

module.exports = {
  launch: {
    args: ['--incognito', '--ignore-certificate-errors'],
    // Turn headless to false if you want to see the test run
    // headless: false,
  },
  server: {
    command: process.env.OAUTH_SERVER === 'live' ? liveServers : nonLiveServers,
  },
};
