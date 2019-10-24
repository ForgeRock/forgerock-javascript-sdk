module.exports = {
	launch: {
    args: ['--incognito', '--ignore-certificate-errors'],
    // Turn headless to false if you want to see the test run
    // headless: false,
  },
  server: {
    command: 'npm run server:e2e',
  }
};
