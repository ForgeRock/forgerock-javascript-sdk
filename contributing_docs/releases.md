# Releases

We use changesets to handle publishing of all packages in the repository.
Please see the changesets repository for documentation on how to use
changesets. Below will be a brief summary.

## Table of Contents

- [Adding a changeset](#adding-a-changeset)
- [Versioning](#versioning)
- [Adding a package to the repository](#adding-a-package-to-the-repository)
- [Testing a package publish](#testing-a-package-publish)
- [First time releasing a package](#first-time-releasing-a-package)
- [Publishing a beta](#publishing-a-beta)

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

## Testing a package publish

In order to test a package publish, you should use `verdaccio`.

We provide verdaccio two ways:

1. `pnpm nx run local-registry`. This command will spawn a private npm registry. It also _should_ update your local `.npmrc` file to point here.

   You can then publish your package like so:

   ```bash
     pnpm changeset version
     pnpm publish packages/{your_package} --dry-run --no-git-checks --registry=http://localhost:4873
   ```

   **Notes**:

   - The `changeset` command will version your packages before the test release. To version them as a beta add `--snapshot beta` to the changeset command
   - I am including the `dry-run` flag here so if you copy paste it, you will "dry-run" the publish.
   - I also like to add the `registry` flag, as a secondary check to make sure I publish to this registry.
   - The `-r` flag is necessary if your package requires other workspace packages to be published. This command runs `publish` recursively via pnpm's topological graph. To publish all packages, include the `-r` flag and remove `packages/{yourpackage}` from the publish command.
   - Include the `--no-git-checks` flag to ignore the changes made by the versioning command
   - To test publish a beta, add `--tag beta`
   - If you are publishing from a branch other than `main`, add `--publish-branch {branch-name}`

2. Publishing to a hosted private registry: Please message `@ryan.basmajian` on Slack.

## First time releasing a package

If your package is ready to be released, and has never been released before, (the package.json `name` field does not exist on `npm`), then it is critical that the package be published manually as a beta first.

First ensure that the `{packageRoot}/package.json` has the following:

```json
"publishConfig": {
  "access": "public"
}
```

When the package is officially ready for release, you should also delete the `private: true` from the `{projectRoot}/package.json`.

Then publish the package to npm:

```bash
# Version packages for beta
pnpm changeset version --snapshot beta
# Check that the beta tag is correct in a dry run
pnpm publish <package-name> --tag beta --no-git-checks --access public --dry-run
# Publish beta for the first time
pnpm publish <package-name> --tag beta --no-git-checks --access public
```

If you do not do this, your package publishing **WILL** break the publish pipeline. Publishing manually first prevents the package being published as the default private.

Next set up provenance and trusted publishing. With trusted publishing enabled, provenance attestations will be generated automatically. Learn more [here](https://docs.npmjs.com/trusted-publishers#automatic-provenance-generation).

To set up trusted publishing, follow the instructions [here](https://docs.npmjs.com/trusted-publishers#for-github-actions). Configure the following fields:

- **Publisher**: GitHub Actions
- **Organization**: ForgeRock
- **Repository**: ping-javascript-sdk
- **Workflow filename**: publish.yml

Additionally, set the publishing access to `Require two-factor authentication and disallow tokens`.

You should now be able to publish with provenance from GitHub Actions. To learn how to publish a beta from GitHub Actions see the next section [Publishing a beta](#publishing-a-beta) below.

## Publishing a beta

You can trigger a beta publish manually via the `publish.yml` GitHub action. In GitHub, select the `Actions` tab then the `Publish` workflow. Then select the `Run workflow` dropdown on the right-hand side. Select the branch you want to release in the `Use workflow from` dropdown, then fill out the beta release options. Click `Run workflow` and the action will automatically release the changeset snapshot to npm.
