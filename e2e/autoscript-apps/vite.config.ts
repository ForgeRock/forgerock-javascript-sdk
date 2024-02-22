import { defineConfig } from 'vite';
import { dirname, resolve } from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { fileURLToPath } from 'url';
import mkcert from 'vite-plugin-mkcert';

const __dirname = dirname(fileURLToPath(import.meta.url));

const pages = [
  'authn-basic',
  'authn-central-login',
  'authn-device-profile',
  'authn-protect',
  'authn-email-suspend',
  'authn-no-session',
  'authn-oauth',
  'authn-platform',
  'authn-saml',
  'authn-second-factor',
  'authn-social-login-am',
  'authn-social-login-idm',
  'authn-webauthn',
  'authn-webauthn-device-registration',
  'authn-otp-reg',
  'authz-token',
  'authz-tree-basic-json',
  'authz-tree-basic-redirect',
  'authz-txn-basic-json',
  'authz-txn-basic-redirect',
  'authz-txn-oauth',
  'config-custom-paths',
  'config-request-middleware',
  'config-token-storage',
  'misc-callbacks',
  'register-basic',
] as const;

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/e2e/autoscript-apps',
  server: {
    port: 8443,
    host: 'sdkapp.example.com',
    headers: {
      'Access-Control-Allow-Origin': 'https://sdkapp.example.com:8443',
    },
  },

  preview: {
    port: 4300,
    host: 'sdkapp.example.com',
  },

  plugins: [mkcert(), nxViteTsPaths()],

  build: {
    outDir: '../../dist/e2e/autoscript-apps',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        ...pages.reduce((acc, page) => {
          acc[page as keyof typeof pages] = resolve(__dirname, `src/${page}/index.html`);
          return acc;
        }, {} as Record<keyof typeof pages, string>),
      },
    },
  },
});
