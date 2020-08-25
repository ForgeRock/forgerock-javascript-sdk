# Testing IE11

## Install packages

Use the following command to install the following packages without writing to `package.json`:

```
npm install --no-save @babel/core @babel/preset-env babel-loader core-js fast-text-encoding regenerator-runtime whatwg-fetch
```

## Configure

Ensure the configuration within `index.js` aligns with your environment. Don't forget to configure both trees!

## Build IE11 compat file and watch

```
npx webpack --watch --config tests/e2e/app/ie11/webpack.config.js
```

## Run the automation

Visit https://sdkapp.example.com:8443/ie11/ in IE11. To rerun, delete the user from last run.
