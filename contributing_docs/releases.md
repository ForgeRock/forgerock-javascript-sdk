# Releases

We use changesets to handle publishing of all packages in the repository.
Please see the changesets repository for documentation on how to use
changesets. Below will be a brief summary.

## Adding a changeset

You can run `pnpm changeset` in order to add a changeset. You then
can navigate the UI that it provides.

If you do not add a changeset, this means the code you are trying to merge will _not_:

- Be included in the `changelog` when releases are done.
- trigger the opening of a `Release PR` if one is not open

Be very aware of the type of changeset you are adding, if you want to trigger a
"patch" release, please make sure you are committing a PR with a `patch` changesets.

Changesets are mutable, so you can edit changesets afterwards if need be.

Nothing will be released until the `Release PR` is merged.

## Versioning

Versioning is handled automatically by `changesets` in the CI pipeline.

If you have a feature branch open against `develop`, when your feature,
is merged, `changesets` will open a `PR` from `changesets-release/master`
against `master`.

In this PR, you should be able to see the following:

- the packages that will be released
- the versions that are being updated
- all of the code that has been merged between the last release on
  `master` and current time.

## Adding a package to the repository

If you are adding a new package to the repository, you should _ALWAYS_ mark the package
as `private` in the package.json. This will mean that the package _will not_ be published
to `npm` during releases.

When the package is officially ready for release, you should delete
the `private: true` from the `{projectRoot}/package.json`.

The package will still be versioned, if changesets are added to the repository.
It just won't be released.

If you are adding a package that _should_ never be released, you can modify the `ignore`
field in the `.changetsets/config.json`. Doing this will mean `changesets` will
never ask if you are adding a `changeset` for this package (when running `pnpm changeset`).
This is common for `e2e` related applications. We don't version or care
about publishing them. You will see in the `.changesets/config.json` these are listed
in the `ignore` field, and they will all have `private:true` in the package.json

## First time releasing a package

If your package is ready to be released, and has never been released before,
(the package.json `name` field does not exist on `npm`), then it is critical that
your `{packageRoot}/package.json` has the following:

```
"publishConfig": {
  "access": true
}
```

If your package does not contain this information, your package publishing **WILL**
break the publish pipeline.

This is because all packages in this repository are published with `npm provenance`.
You can read about the requirements [here](https://docs.npmjs.com/generating-provenance-statements#prerequisites).

## Testing a package publish

In order to test a package publish, you should use `verdaccio`.

We provide verdaccio two ways:

- `pnpm nx run local-registry`. This command will spawn a private npm registry.
  It also _should_ update your local `.npmrc` file to point here.

  You can then publish your package like so:

  ```bash
    pnpm publish packages/{your_package} --dry-run --registry=http://localhost:4873
  ```

  Notes: - I am including the `dry-run` flag here so if you copy paste it,
  you will "dry-run" the publish. - I also like to add the `registry` flag, as a secondary check to
  make sure i publish to this registry. - The `-r` flag is necessary if your package requires other workspace packages
  to be published. This command runs `publish` recursively via pnpm's
  topological graph.

- Publishing to a hosted private registry: Please message @ryanbas21 on slack.
