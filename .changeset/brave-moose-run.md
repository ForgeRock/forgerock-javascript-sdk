---
'@forgerock/ping-protect': patch
---

fixes the type of the options param in `PIProtect.start` so it better aligns with output from `PingOneProtectInitializeCallback.getConfig()` as defined in `javascript-sdk` (importantly it no longer expects `_type` and `_action` fields)
