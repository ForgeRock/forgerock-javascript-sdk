const svelte = require('rollup-plugin-svelte');
const commonjs = require('@rollup/plugin-commonjs');
const { default: resolve } = require('@rollup/plugin-node-resolve');
const livereload = require('rollup-plugin-livereload');
const { terser } = require('rollup-plugin-terser');
const { tsConfigPaths: tsPaths } = require('rollup-plugin-tsconfig-paths');
const css = require('rollup-plugin-css-only');
const child_process = require('child_process');
const production = !process.env.ROLLUP_WATCH;

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = child_process.spawn('npm', ['run', 'start', '--', '--dev'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true,
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

module.exports = {
  input: 'src/lib/main.ts',
  output: {
    sourcemap: true,
    format: 'es',
    name: 'login-widget',
    file: 'package/widget.js',
  },
  plugins: [
    tsPaths(),
    svelte({
      compilerOptions: {
        // enable run-time checks when not in production
        dev: !production,
      },
    }),
    // we'll extract any component CSS out into
    // a separate file - better for performance
    css({ output: 'bundle.css' }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
