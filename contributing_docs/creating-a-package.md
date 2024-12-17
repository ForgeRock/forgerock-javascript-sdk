# Creating a package

We have a local plugin to create packages within the repository. This document will explain the options when creating a package.

## How to generate a package

There is a `pnpm` command to create a package. `pnpm create-package`.

## Options

You will be provided with several prompts when creating the package.

The only required prompt is a `name`. This is the `package` name and the file-system name.

### Optional prompts

`scope`: this is the `npm` scope that will be interpolated into the `package.json` `name` field. Do not include the `@` symbol, it is added automatically.

`sideEffects`: This is to ensure packages are tree shakeable. `false` sets the the value to `false`. If you intend to have `sideEffects` you can set it to `true`. however this will mark _every_ file as a side effect. It's best to edit this afterwards on your own if the value is not `false`.

`description`: If you want to add a description of the package in the `package.json`, `description` field.

`moduleType`: This sets the `module` type. Either `commonjs` or `module` are valid entries. Default is `module`

`outputDir`: This sets up the `output` directory. by default, it is set to `dist`. This typically shouldn't need to be changed.

## Notes

All packages are marked as `private` by default. This is to prevent unwanted publishing. It is the developer's responsibility to mark a package as public when ready to publish. See [releases](./releases.md) for more information on releases.

All packages are by default setup to used `tsc`. Other build tools can be used after the generator is run. If its requested to add a generator or option for using `vite` or something else, please reach out to @ryanbas21 or add the feature in yourself and PR it.
