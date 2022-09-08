# Autoscript Suites

This is a package that contains [playwright](https://playwright.dev/)
tests for the [autoscript-apps](../autoscript-apps) application.

## How to write a test

In order to write a test navigate to the [src](./src) directory.

Once there you will see a folder called suites.
In here we can write a test which follows the name of the
feature we are testing, and a .test.ts suffix.

`my-auth.test.ts` as an example.

Next, we typically use `playwrights` `test` blocks and leverage a
helper file called [setupAndGo](./src/utilities).

Setup and go will do most of the heavy lifting, and launch the browser,
and setup the url state so that the proper values passed through.

Note: Remember, setup and go is a promise returning function
so please use an async callback in your `test` block.

Furthermore, setup and go will only output console logs to the terminal
for the chrome browser. This is because we don't want any extra noise
in the terminal than we already have.

If you need to debug a browser specific issue, you can
always set that in the `playwright.config.ts`, or just
`.only` the test and inspect the running e2e test.

Setup and go will return a messageArray and a NetworkArray. These are
essentially lists of the network or console from the running application.

You can use this to assert that things have occured in the running application.

We place console logs after successful events have occured
like a successful oauth token retreival.

Finally, you can write out your expectations based on the message array
including some console log or network request from the autoscript app.

### Running the suite

By default we run the suite in headless mode. This means that a browser
will not spawn.

If you would like to run this in headed mode, again,
visit the [playwright.config.ts](./playwright.config.ts) file and
edit it from `headless: true` to `headless: false`.

There are other ways to do this, but please read
the playwright documentation for more information.

To run the whole suite, just run `npm run test:e2e` and
this will spawn both the mock-api and the playwright suite
testing the running autoscript-apps application
