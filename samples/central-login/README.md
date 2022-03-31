# Central login

The ForgeRock SDK provides an option for using the Authorization Code Flow (with PKCE) with a centralized login application. For a non-authenticated user, use the login of "redirect" option (from the `TokenManager`) to request OAuth/OIDC tokens. This instructs the SDK to redirect the user to the login application that uses the ForgeRock platform. After successful authentication, the SDK redirects the user back to the original application to obtain OAuth/OIDC tokens and complete the centralized login flow.

You can run this sample app with the `npm run start:central-login` command. Please [see the Getting Started instructions](#getting-started) for more details.

### Getting Started

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

5. Open `samples/central-login/.env.example`. Copy the file in the same directory and name it `.env`. Fill in the values in this file with your values.

6. Run the Central Login application

   ```
   npm run start:central-login
   ```

7. Edit your `/etc/hosts` file to point your localhost (e.g. `127.0.0.1`) to `sdkapp.example.com`

8. In a [supported web browser](../../README.md#requirements), navigate to [https://sdkapp.example.com:8443](https://sdkapp.example.com:8443).
