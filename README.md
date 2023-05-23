[![npm (scoped)](https://img.shields.io/npm/v/@forgerock/javascript-sdk?color=%23f46200&label=Version&style=flat-square)](CHANGELOG.md)
[![ForgeRock CI](https://github.com/ForgeRock/forgerock-javascript-sdk/actions/workflows/ci.yml/badge.svg)](https://github.com/ForgeRock/forgerock-javascript-sdk/actions/workflows/ci.yml)

<p align="center">
  <a href="https://github.com/ForgeRock">
    <img src="https://www.forgerock.com/themes/custom/forgerock/images/fr-logo-horz-color.svg" alt="Logo">
  </a>
  <h2 align="center">ForgeRock SDK for JavaScript</h2>
  <p align="center">
    <a href="https://github.com/ForgeRock/forgerock-javascript-sdk/blob/master/CHANGELOG.md">Change Log</a>
    ·
    <a href="#support">Support</a>
    ·
    <a href="#documentation" target="_blank">Docs</a>
  </p>
<hr/></p>

The ForgeRock JavaScript SDK enables you to quickly integrate the [ForgeRock Identity Platform](https://www.forgerock.com/digital-identity-and-access-management-platform) into your client-side JavaScript apps.

Use the SDKs to leverage _[Intelligent Authentication](https://www.forgerock.com/platform/access-management/intelligent-authentication)_ in [ForgeRock's Access Management (AM)](https://www.forgerock.com/platform/access-management) product, to easily step through each stage of an authentication tree by using callbacks.

 <!------------------------------------------------------------------------------------------------------------------------------------>
<!-- REQUIREMENTS - Supported AM versions, API versions, any other requirements. -->

## Requirements

- ForgeRock Identity Platform

  - Access Management (AM) 6.5.2+

- Browsers:

  - Chrome 87
  - Firefox 84
  - Safari 14
  - Edge 87 (Chromium)
  - Edge 44 (Legacy): requires one polyfill for TextEncoder, [`fast-text-encoding` is recommended](https://www.npmjs.com/package/fast-text-encoding)

- npm
  - npm 7+ is required to use this project and the sample apps, since npm workspaces are used to install dependencies in sub-projects such as the sample apps

> **Tip**: Older browsers (like IE11) may require multiple [polyfills, which can be found in our documentation](https://sdks.forgerock.com/javascript/polyfills/).

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- INSTALLATION -->

## Installation

```
npm install @forgerock/javascript-sdk
```

## Samples

ForgeRock provides these samples to help demonstrate SDK functionality/implementation. They are provided "as is" and are not official products of ForgeRock and are not officially supported.

To try out the ForgeRock JavaScript SDK please look at one of our samples:

- [**Embedded login - `samples/embedded-login`**](./samples/embedded-login/README.md)

- [**Central login - `samples/central-login`**](./samples/central-login/README.md)

- [**React Todo - `samples/reactjs-todo`**](./samples/reactjs-todo/README.md)

- [**Angular Todo - `samples/angular-todo`**](./samples/angular-todo/README.md)

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- DOCS - Link off to the AM-centric documentation at sdks.forgerock.com. -->

## Documentation

Documentation for the SDKs is provided at **<https://sdks.forgerock.com>**, and includes topics such as:

- Introducing the SDK Features
- Preparing AM for use with the SDKS
- API Reference documentation

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- SUPPORT -->

## Support

If you encounter any issues, be sure to check our **[Troubleshooting](https://backstage.forgerock.com/knowledge/kb/article/a83789945)** pages.

Support tickets can be raised whenever you need our assistance; here are some examples of when it is appropriate to open a ticket (but not limited to):

- Suspected bugs or problems with ForgeRock software.
- Requests for assistance - please look at the **[Documentation](https://sdks.forgerock.com)** and **[Knowledge Base](https://backstage.forgerock.com/knowledge/kb/home/g32324668)** first.

You can raise a ticket using **[BackStage](https://backstage.forgerock.com/support/tickets)**, our customer support portal that provides one stop access to ForgeRock services.

BackStage shows all currently open support tickets and allows you to raise a new one by clicking **New Ticket**.

## Version History

[Our version history can be viewed by visiting our CHANGELOG.md](https://github.com/ForgeRock/forgerock-javascript-sdk/blob/master/CHANGELOG.md).

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- COLLABORATION -->

## Contributing

If you would like to contribute to this project you can fork the repository, clone it to your machine and get started.

<!-- Note: Found elsewhere, but is Java-only //-->

Be sure to check out our [Coding Style and Guidelines](https://wikis.forgerock.org/confluence/display/devcom/Coding+Style+and+Guidelines) page.

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- LEGAL -->

## Disclaimer

> **This code is provided by ForgeRock on an “as is” basis, without warranty of any kind, to the fullest extent permitted by law. ForgeRock does not represent or warrant or make any guarantee regarding the use of this code or the accuracy, timeliness or completeness of any data or information relating to this code, and ForgeRock hereby disclaims all warranties whether express, or implied or statutory, including without limitation the implied warranties of merchantability, fitness for a particular purpose, and any warranty of non-infringement. ForgeRock shall not have any liability arising out of or related to any use, implementation or configuration of this code, including but not limited to use for any commercial purpose. Any action or suit relating to the use of the code may be brought only in the courts of a jurisdiction wherein ForgeRock resides or in which ForgeRock conducts its primary business, and under the laws of that jurisdiction excluding its conflict-of-law provisions.**

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- LICENSE - Links to the MIT LICENSE file in each repo. -->

## License

This project is licensed under the MIT License - see the [LICENSE](./packages/javascript-sdk/LICENSE) file for details

---

&copy; Copyright 2020 ForgeRock AS. All Rights Reserved.

[forgerock-logo]: https://www.forgerock.com/themes/custom/forgerock/images/fr-logo-horz-color.svg 'ForgeRock Logo'
