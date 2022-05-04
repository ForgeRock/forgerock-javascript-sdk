<script>
    import { Config } from '@forgerock/javascript-sdk';
    import Form from '../lib/components/journey/form.svelte';
    import KeyIcon from '../lib/components/icons/key-icon.svelte';

    Config.set({
      clientId: 'WebOAuthClient',
      redirectUri: 'https://localhost:3000/callback',
      // redirectUri: 'https://crbrl.ngrok.io/callback',
      scope: 'openid profile me.read',
      serverConfig: {
        baseUrl: 'https://openam-crbrl-01.forgeblocks.com/am/',
        // baseUrl: 'https://crbrl.ngrok.io/proxy/',
        timeout: 3000, // 90000 or less
        // paths: {
        //   authenticate: 'authenticate',
        //   authorize: 'authorize',
        //   accessToken: 'access-token',
        //   endSession: 'end-session',
        //   userInfo: 'userinfo',
        //   revoke: 'revoke',
        //   sessions: 'sessions',
        // },
      },
      realmPath: 'alpha',
      tree: 'Login',
    });
</script>

<div class="flex items-center justify-center my-5 min-h-full">
  <div class="max-w-lg w-full bg-white p-10 rounded shadow-md">
    <div class="flex w-full justify-center">
      <KeyIcon classes="text-gray-400 fill-current" size="72px" />
    </div>
    <h1 class="flex justify-center text-4xl text-gray-600 font-family-">Sign In</h1>
    <Form />
  </div>
</div>

