---
'@forgerock/javascript-sdk': patch
---

In order to display a more user-friendly name when saving a WebAuthn/Passkey device to an account, we prioritized displayName over userName for assignment to the `name` property of the WebAuthn options object. This avoids the display of UUIDs for saved credentials.
