---
'@forgerock/javascript-sdk': patch
---

Update typings to be more strict. There are a few places where if you compile an app in strict mode that consumes the SDK, the compilation could break because its not 100% type safe.
