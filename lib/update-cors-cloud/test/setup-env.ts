process.env['INPUT_AM_URL'] = 'some-am-url';
process.env['INPUT_USERNAME'] = 'admin';
process.env['INPUT_PASSWORD'] = 'password';
process.env['INPUT_REALM_PATH'] = 'alpha';
process.env['INPUT_ORIGINS'] = JSON.stringify(
  'reactjs-todo\nangular-todo\ntodo-api\nmock-api\nautoscript-apps',
);
