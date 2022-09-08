<!--toc:start-->

- [Autoscript Apps](#autoscript-apps)
- [Running](#running)
- [Adding an application](#adding-an-application)
<!--toc:end-->

# Autoscript Apps

This is a package within the repository that contains miniature applications that
represent a unit or piece of functionality. They exist on a singular multi-page
web app which is bundled together via webpack.

The point of this is to have an application which can serve various
functionalities that are as bare bones as possible to ensure
the functionality that is being supported can be tested.
They contain no real ui, and are minimal in terms of what they do.

## Running

In order to run this application you will need to configure your `/etc/hosts`
file to include a few domains.

```bash
  127.0.0.1	localhost sdkapp.example.com user.example.com
  127.0.0.1 localhost auth.example.com api.example.com
```

Typically these would be run using the `npm` script: `npm run start:e2e`.

This will run both the mock-api and this application.
This is the best way to write e2e tests and visually see how the application is working.

Note: This does not "Run" any tests, its a way of developing the test suite.
This is because we don't have a true "application".

## Adding an application

In order to add an application or page, there are a few steps required.

Let's pretend to add a new feature called `xyz-auth-check`.

Create a new folder in `[src](./src)`, called `xyz-auth-check`.

1.Next, you will need to edit the [webpack config](./webpack.config.js).

Here you will see an array that says `pages`.

2. Add your folder name to the pages array as a string: `xyz-auth-check`.

3. Add the following files to the folder, `index.html` and `autoscript.ts`.

4. Write the necessary javascript in the `autoscript.ts` file.

We use `rxjs` for this so please look at existing autoscripts to understand the pattern we follow.
