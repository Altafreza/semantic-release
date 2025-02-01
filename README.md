# Semantic Release Project

This project uses semantic-release for automated versioning and releases.

## Semantic Release and Versioning

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) to automatically determine the next version number, generate a changelog, create a Git tag, and publish a GitHub release based on the commit messages and the branch being pushed.

The versioning and release process is fully automated based on the commit messages and the branch strategy. Semantic-release uses the [Conventional Commits](https://www.conventionalcommits.org/) specification to determine the type of changes in the codebase and bump the version number accordingly.

## Setup

### Installing semantic-release

1. Create an NPM token and save it as a GitHub secret named `NPM_TOKEN`.
2. Install semantic-release-cli:
   ```bash
   npm i -D semantic-release-cli
   ```
3. Run the setup command:
   ```bash
   semantic-release-cli setup --npm-username={npmUserName} --npm-token={npmToken} --gh-token={githubToken}
   ```
4. Commit the current changes. The next step requires `package.json` to be free of any changes.
5. Set the initial version to `0.0.0-semantically-released`:
   ```bash
   npm version '0.0.0-semantically-released'
   ```

### Configuring release branches

Create a `release.config.js` file in the root directory to override the default tag deployment:

```js
module.exports = {
  branches: ['main'],
};
```

### Setting up Husky

1. Install Husky:
   ```bash
   npm i -D husky
   ```
2. Create a prepare script that installs Husky:
   ```bash
   npm set-script prepare "husky install"
   ```
3. Run the prepare script:
   ```bash
   npm run prepare
   ```

### Setting up commitizen

1. Install commitizen and the conventional changelog adapter:
   ```bash
   npm i -D commitizen cz-conventional-changelog
   ```
2. Initialize commitizen:
   ```bash
   commitizen init cz-conventional-changelog
   ```
3. Set up a pre-commit hook:
   ```bash
   npm set-script pre-commit "exec < /dev/tty && git cz --hook || true\n"
   npx husky add .husky/pre-commit "npm run pre-commit" && git add .husky/pre-commit
   ```

### Setting up commitlint

1. Install commitlint and the conventional config:
   ```bash
   npm i -D @commitlint/{cli,config-conventional}
   ```
2. Set up a commit-msg hook:
   ```bash
   npm set-script commit-msg "npx --no-install commitlint --edit $1"
   npx husky add .husky/commit-msg "npm run commit-msg" && git add .husky/commit-msg
   ```
3. Create a `commitlint.config.js` file in the root directory:
   ```js
   module.exports = {
     extends: ['@commitlint/config-conventional'],
   };
   ```

### Setting up GitHub Actions

Create a `.github/workflows/npm-release.yml` file with the following content:

```yaml
name: npm-release
on:
  workflow_dispatch:
  push:
    branches: [ main ]
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: '12'
      - name: Install dependencies
        run: npm ci
      - name: Release
        env:
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: npx semantic-release
```

This GitHub Actions workflow is configured to run manually or with each push to the `main` branch.

## Commit Guidelines

This project follows [Conventional Commits](https://www.conventionalcommits.org/). Commit messages should be structured as follows:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

The `<type>` must be one of the following:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing or correcting existing tests
- `build`: Changes to the build system or external dependencies
- `ci`: Changes to the CI configuration files and scripts
- `chore`: Other changes that don't modify src or test files

Examples:
```
feat: add new endpoint for user registration
fix: handle null values in search function
docs: update README with new installation instructions
```

Breaking changes should include a `BREAKING CHANGE:` footer, followed by a description of the change and migration notes.

## Branch Strategy

- `main`: Production releases. Commits to this branch will trigger a new release with an incremented version number based on the commit messages.
- `dev`: Development (beta) releases. Commits to this branch will trigger a new pre-release with an incremented version number and a `beta` tag.
- `qa`: QA testing releases. Commits to this branch will trigger a new pre-release with an incremented version number and a `qa` tag.
- `uat`: UAT testing releases. Commits to this branch will trigger a new pre-release with an incremented version number and a `uat` tag.
- `hotfix`: Hotfix releases. Commits to this branch will trigger a new patch release with an incremented version number.

## Triggering a Release

To trigger a release, simply push commits to one of the release branches (`main`, `dev`, `qa`, `uat`, or `hotfix`). Semantic-release will automatically analyze the commit messages, determine the appropriate version bump, and create a new release with a changelog and Git tag.

## Environment Variables

Each environment has its own `.env` file:
- `.env.dev` - Development
- `.env.qa` - QA
- `.env.uat` - UAT
- `.env.prod` - Production

## Available Scripts

### Development
```bash
# Start development server
npm run start:dev

# Build for development
npm run build:dev
```

### QA
```bash
# Start QA server
npm run start:qa

# Build for QA
npm run build:qa
```

### UAT
```bash
# Start UAT server
npm run start:uat

# Build for UAT
npm run build:uat
```

### Production
```bash
# Start production server
npm run start:prod

# Build for production
npm run build:prod
```

## Building, Committing, and Releasing

To build the project for a specific environment, run the corresponding build command:

```bash
# Build for development
npm run build:dev

# Build for QA
npm run build:qa

# Build for UAT
npm run build:uat

# Build for production
npm run build:prod
```

To create a commit, use the `git cz` command provided by commitizen:

```bash
git cz
```

Follow the prompts to select the type of change, scope, description, and other details for your commit message.

After committing your changes, push them to the appropriate release branch to trigger the semantic-release workflow:

```bash
git push origin main
```

Semantic-release will analyze the commit messages, determine the version bump, generate a changelog, create a Git tag, and publish a GitHub release.

## Plugins

Semantic-release plugins are available for various IDEs to help with commit message formatting and adherence to the Conventional Commits specification:

- WebStorm
- VSCode
- Visual Studio

## Logs

Semantic-release generates detailed logs during the release process. You can view these logs in the GitHub Actions workflow run for each release.

The logs include information about the commits analyzed, the version bump determined, the changelog generated, and the Git tag and GitHub release created.

To view the logs, navigate to the "Actions" tab in your GitHub repository, select the workflow run for the release, and expand the "Release" step.

## Learn More

For more information on how semantic-release works and its configuration options, refer to the [semantic-release documentation](https://semantic-release.gitbook.io/semantic-release/).