### [4.2.0] - 2023-09-11

Security: - Proxy config declaring URLs is now required and will be used to generate an allow list of origins to check again prior to fowarding a request.

## [4.1.2] - 2023-07-24

Features:

- Initial release of Token Vault
- Initial NPM deployment for latest version (4.1.2)
- Token vault is sync'd to the same version of the SDK.
- @forgerock/javascript-sdk is a peer dependency of Token vault, meaning the application must install it independently.
