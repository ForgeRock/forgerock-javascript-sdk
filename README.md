[![npm (scoped)](https://img.shields.io/npm/v/@forgerock/javascript-sdk?color=%23f46200&label=Version&style=flat-square)](CHANGELOG.md)


<p align="center">
  <a href="https://github.com/ForgeRock">
    <img src="https://www.forgerock.com/themes/custom/forgerock/images/fr-logo-horz-color.svg" alt="Logo">
  </a>
  <h2 align="center">ForgeRock SDK for JavaScript</h2>
  <p align="center">
    <a href="./blob/master/CHANGELOG.md">Change Log</a>
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

* ForgeRock Identity Platform
    * Access Management (AM) 6.5.2+

* Browsers:
    * Edge 44 (Legacy): requires one polyfill for TextEncoder, [`fast-text-encoding` is recommended](https://www.npmjs.com/package/fast-text-encoding)
    * Edge 83 (Chromium)
    * Chrome 83
    * Firefox 77

> **Tip**: Older browsers (like IE11) may require multiple [polyfills, which can be found in our documentation](https://sdks.forgerock.com/javascript/polyfills/).

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- INSTALLATION -->

## Installation

```
npm install @forgerock/javascript-sdk
```

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- QUICK START - Get one of the included samples up and running in as few steps as possible. -->

## Getting Started

To try out the ForgeRock JavaScript SDK, perform these steps:

1. Setup CORS support in an Access Management (AM) instance.

   See [Enabling CORS Support](https://sdks.forgerock.com/js/01_prepare-am/#enabling-cors-support) in the Documentation.
2. Create an authentication tree in AM.

   See [Creating a User Authentication Tree](https://sdks.forgerock.com/js/01_prepare-am/#creating-a-user-authentication-tree) in the Documentation.
3. Clone this repo:

    ```
    git clone https://github.com/ForgeRock/forgerock-javascript-sdk.git
    ```

4. In the root folder of the repo, use NPM to install dependencies:

    ```
    npm install
    ```

5. Build the ForgeRock JavaScript SDK:

    ```
    npm run build
    ```

6. Open `samples/custom-ui/index.html` and edit the configuration values to match your AM instance.
7. Serve the `samples` directory by using a simple HTTP server, for example:
   `npm run start:samples`
8. Edit your `/etc/hosts` file to point your localhost to `sdkapp.example.com`
8. In a [supported web browser](#requirements), navigate to `https://sdkapp.example.com:8443`, and then click
 **Custom UI**.

   > **Note**:
   >
   > Using the supplied self-signed certs is for testing and evaluation purposes **only**.
   >
   > Use your own production certifications from a valid Certificate Authority in production environments.

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- SAMPLES - List the samples we include with the SDKs, where they are, briefly what they show. -->

## Samples

ForgeRock provides these samples to help demonstrate SDK functionality:

- **Custom UI - `/samples/custom-ui`**

    In most real-world scenarios, you will want to have full control over the UI. In these cases, you can use `FRAuth`
    to obtain typed callback instances from authentication trees and render the UI in whatever way makes sense for your application.

    In this example, a simple React app iteratively calls `FRAuth.next()` until either an error occurs, or the sample obtains a session token.

    The custom React component `<UsernamePassword />` is defined to handle an authentication step named "_UsernamePassword_".

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- DOCS - Link off to the AM-centric documentation at sdks.forgerock.com. -->

## Documentation

Documentation for the SDKs is provided at **<https://sdks.forgerock.com>**, and includes topics such as:

* Introducing the SDK Features
* Preparing AM for use with the SDKS
* API Reference documentation

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- SUPPORT -->

## Support

If you encounter any issues, be sure to check our **[Troubleshooting](https://backstage.forgerock.com/knowledge/kb/article/a83789945)** pages.

Support tickets can be raised whenever you need our assistance; here are some examples of when it is appropriate to open a ticket (but not limited to):

* Suspected bugs or problems with ForgeRock software.
* Requests for assistance - please look at the **[Documentation](https://sdks.forgerock.com)** and **[Knowledge Base](https://backstage.forgerock.com/knowledge/kb/home/g32324668)** first.

You can raise a ticket using **[BackStage](https://backstage.forgerock.com/support/tickets)**, our customer support portal that provides one stop access to ForgeRock services.

BackStage shows all currently open support tickets and allows you to raise a new one by clicking **New Ticket**.

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- COLLABORATION -->

## Contributing

If you would like to contribute to this project you can fork the repository, clone it to your machine and get started.

<!-- Note: Found elsewhere, but is Java-only //-->
Be sure to check out our [Coding Style and Guidelines](https://wikis.forgerock.org/confluence/display/devcom/Coding+Style+and+Guidelines) page.

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- LEGAL -->

## Disclaimer

> This code is provided on an “as is” basis, without warranty of any kind, to the fullest extent permitted by law.
>
> ForgeRock does not warrant or guarantee the individual success developers may have in implementing the code on their development platforms or in production configurations.
>
> ForgeRock does not warrant, guarantee or make any representations regarding the use, results of use, accuracy, timeliness or completeness of any data or information relating to this code.
>
> ForgeRock disclaims all warranties, expressed or implied, and in particular, disclaims all warranties of merchantability, and warranties related to the code, or any service or software related thereto.
>
> ForgeRock shall not be liable for any direct, indirect or consequential damages or costs of any type arising out of any action taken by you or others related to the code.

<!------------------------------------------------------------------------------------------------------------------------------------>
<!-- LICENSE - Links to the MIT LICENSE file in each repo. -->

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

---

&copy; Copyright 2020 ForgeRock AS. All Rights Reserved.

[forgerock-logo]: https://www.forgerock.com/themes/custom/forgerock/images/fr-logo-horz-color.svg "ForgeRock Logo"
