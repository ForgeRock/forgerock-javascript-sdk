### [4.2.0] - 2023-09-11

## 4.2.3

### Patch Changes

- [#598](https://github.com/ForgeRock/forgerock-javascript-sdk/pull/598) [`de96cf6`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/de96cf6c00b637eea5ea2f7277a72b0c736e4064) Thanks [@ancheetah](https://github.com/ancheetah)! - Allow requests to resource server endpoints similar to AM endpoints to preserve backwards compatibility

- [#595](https://github.com/ForgeRock/forgerock-javascript-sdk/pull/595) [`11ac633`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/11ac633d9854b72cc72ea976df2f9dfe63e908aa) Thanks [@vatsalparikh](https://github.com/vatsalparikh)! - Add sessions/ endpoint to fully complete logout

- [#597](https://github.com/ForgeRock/forgerock-javascript-sdk/pull/597) [`85e2cc9`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/85e2cc90b8f697b86617580a434eaa1df4ee8e9d) Thanks [@ancheetah](https://github.com/ancheetah)! - Compose AM request URLs from config to prevent attacker-supplied request URLs

## 4.2.2

### Patch Changes

- Updated dependencies [[`d14d301`](https://github.com/ForgeRock/forgerock-javascript-sdk/commit/d14d301349bb08040363be5dafc01e100fb5862d)]:
  - @forgerock/javascript-sdk@4.9.1

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
