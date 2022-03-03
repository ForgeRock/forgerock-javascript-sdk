import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
  kit: {
    routes: (filepath) => {
      return ![
        // exclude *test.js files
        /\.spec\.ts$/,

        // original default config
        /(?:(?:^_|\/_)|(?:^\.|\/\.)(?!well-known))/,
      ].some((regex) => regex.test(filepath));
    },
    package: {
      dir: '../../dist/packages/login-widget/package',
    },
    vite: {
      build: {
        outDir: '../../dist/packages/login-widget/build',
      },
    },
  },
};

export default config;
