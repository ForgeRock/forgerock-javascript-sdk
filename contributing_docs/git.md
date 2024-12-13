# Git

## Standards

We use standard conventional commits for committing to the repository. Your commits will run through a linting process to make sure they are standard.

Please use [Conventional Commit Conventions](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#summary) as a guide for how to commit to the repository.

## Commit Format

Commits should be formatted like so

```bash
    <type>(<scope>): <short summary>
    <BLANK LINE>
    <body>
    <BLANK LINE>
    <footer>
```

## Scopes

If your commit is to a specific package, you can include a `scope` in your commit.
This is done as shown above, after the `type` of commit per the Conventional
Commit Standards
