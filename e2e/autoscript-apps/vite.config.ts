import { defineConfig } from 'vite';
import * as path from 'path';

const pages = [
  'authn-basic',
  'authn-central-login',
  'authn-central-login-wellknown',
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
];

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/e2e/autoscript-apps',

  server: {
    cors: true,
    port: 8443,
    host: 'localhost',
    headers: {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Origin': 'null',
      'Access-Control-Allow-Headers': 'x-authorize-middleware',
    },
  },
  preview: {
    port: 8443,
    host: 'localhost',
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:8443',
    },
  },
  build: {
    outDir: './dist',
    reportCompressedSize: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        ...pages.reduce(
          (acc, page) => {
            acc[page as keyof typeof pages] = path.resolve(__dirname, `src/${page}/index.html`);
            return acc;
          },
          {} as Record<keyof typeof pages, string>,
        ),
      },
      output: {
        entryFileNames: 'src/[name]/main.js',
      },
    },
  },
});
