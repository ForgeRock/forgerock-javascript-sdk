# @forgerock/davinci-client

## 0.1.0

### Minor Changes

- [#509](https://github.com/ForgeRock/forgerock-javascript-sdk/pull/509) [`958ba10`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/958ba101b37efab1ba5cb0afe4b6c870f8f4ef36) Thanks [@ryanbas21](https://github.com/ryanbas21)! - fix the type for the single value collector output. make it a union so it narrows and either has a url or does not have a url

### Patch Changes

- [#493](https://github.com/ForgeRock/forgerock-javascript-sdk/pull/493) [`70de27a`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/70de27aa322154f36d52e5b3a21cdc9c94a2ec92) Thanks [@ryanbas21](https://github.com/ryanbas21)! - refactor to improve type inference. use the wellknown endpoint to derive all the endpoints for the server, rather than using the baseurl

- [#491](https://github.com/ForgeRock/forgerock-javascript-sdk/pull/491) [`2b7e983`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/2b7e98352b6b264af086791b33a64ee409e15944) Thanks [@ryanbas21](https://github.com/ryanbas21)! - use async config options instead of configoptions
