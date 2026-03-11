### [4.2.0] - 2023-09-11

## 4.2.1

### Patch Changes

- [#580](https://github.com/ForgeRock/forgerock-javascript-sdk/pull/580) [`d319384`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/d319384f0a592230ae299ebcf8eb46025006148b) Thanks [@ryanbas21](https://github.com/ryanbas21)! - fix(security): replace substring URL matching with strict equality in evaluateUrlForInterception to prevent URL allow-list bypass via query parameter injection

- Updated dependencies [[`03135cf`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/03135cf543e3f694d48e6b9e0b9116ccf42737d1), [`1fb1e57`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/1fb1e574a6583b00cecb909534e005da3b7d247e), [`1253482`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/1253482a3c517ba470f4dd8c6e43b89d380d6944)]:
  - @forgerock/javascript-sdk@4.9.0

Security: - Proxy config declaring URLs is now required and will be used to generate an allow list of origins to check again prior to fowarding a request.

## [4.1.2] - 2023-07-24

Features:

- Initial release of Token Vault
- Initial NPM deployment for latest version (4.1.2)
- Token vault is sync'd to the same version of the SDK.
- @forgerock/javascript-sdk is a peer dependency of Token vault, meaning the application must install it independently.
