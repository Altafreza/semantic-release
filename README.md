# Semantic Release Setup Guide

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [GitHub Token Setup](#github-token-setup)
- [Configuration](#configuration)
- [Usage](#usage)
- [Commit Message Format](#commit-message-format)
- [Version Management](#version-management)

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- GitHub account

## Installation

1. Install dependencies:
```bash
npm install --save-dev semantic-release @semantic-release/git @semantic-release/github @semantic-release/changelog @semantic-release/commit-analyzer @semantic-release/release-notes-generator commitizen cz-conventional-changelog husky @commitlint/cli @commitlint/config-conventional
```

2. Add scripts to package.json:
```json
{
  "scripts": {
    "semantic-release": "semantic-release",
    "prepare": "husky install",
    "commit": "git-cz"
  }
}
```

## GitHub Token Setup

### Option 1: PowerShell Current Session (Temporary)
```powershell
$env:GITHUB_TOKEN = "your-github-token"
```

### Option 2: PowerShell Permanent (User Environment Variable)
```powershell
[Environment]::SetEnvironmentVariable("GITHUB_TOKEN", "your-github-token", "User")
```

### Option 3: PowerShell Profile (Automatic on Session Start)
1. Create/check profile existence:
```powershell
Test-Path $PROFILE
```

2. Create profile if it doesn't exist:
```powershell
New-Item -Path $PROFILE -Type File -Force
```

3. Add token to profile:
```powershell
Add-Content -Path $PROFILE -Value '$env:GITHUB_TOKEN = "your-github-token"'
```

4. Reload profile:
```powershell
. $PROFILE
```

## Configuration

1. Create release.config.js:
```javascript
module.exports = {
  branches: [
    'main',
    { name: 'dev', channel: 'beta', prerelease: 'beta' },
    { name: 'qa', channel: 'qa', prerelease: 'qa' },
    { name: 'uat', channel: 'uat', prerelease: 'uat' },
    { name: 'hotfix', prerelease: 'hotfix' }
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    ['@semantic-release/npm', { npmPublish: false }],
    '@semantic-release/github',
    ['@semantic-release/git', {
      assets: ['package.json', 'CHANGELOG.md', 'dist/**/*.{js,css}'],
      message: 'chore(release): 🔖 ${nextRelease.version} [skip ci]\\n\\n${nextRelease.notes}'
    }]
  ]
}
```

## Usage

### Making Changes and Committing

1. Make your changes to the code

2. Stage your changes:
```bash
git add .
```

3. Commit using commitizen:
```bash
npm run commit
```

4. Follow the prompts to create a conventional commit:
   - Choose type (feat, fix, docs, etc.)
   - Enter scope (optional)
   - Write short description
   - Write longer description (optional)
   - Indicate breaking changes (if any)
   - Reference issues (if any)

### Creating a Release

Run semantic-release:
```bash
npx semantic-release
```

## Commit Message Format

Follow the Conventional Commits specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: New feature (minor version)
- `fix`: Bug fix (patch version)
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI configuration changes
- `chore`: Other changes

Examples:
```
feat(auth): add user authentication system

fix(api): correct response status code for invalid requests

docs(readme): update installation instructions
```

## Release Process

1. semantic-release will:
   - Analyze commits since last release
   - Determine version bump (major, minor, patch)
   - Generate changelog
   - Create GitHub release
   - Create Git tag
   - Update package.json version

2. The release will be visible:
   - In CHANGELOG.md
   - On GitHub Releases page
   - In Git tags
   - In package.json version

## Troubleshooting

### Common Issues

1. Token Issues:
```bash
# Verify token is set
echo $env:GITHUB_TOKEN

# Reset token if needed
$env:GITHUB_TOKEN = "new-token"
```

2. Commit Hook Issues:
```bash
# Reinstall husky hooks
npm run prepare
```

3. Dry Run Test:
```bash
npx semantic-release --dry-run
```

## Version Management

### Example Versioning Flow

Here's how versions progress through different branches:

```bash
# On dev branch (Development)
git checkout dev
git commit -m "feat: new feature"
# Creates: 1.0.0-beta.1

# On qa branch (Quality Assurance)
git checkout qa
git merge dev
# Creates: 1.0.0-qa.1

# On uat branch (User Acceptance Testing)
git checkout uat
git merge qa
# Creates: 1.0.0-uat.1

# On main branch (Production)
git checkout main
git merge uat
# Creates: 1.0.0

# On hotfix branch (Emergency Fixes)
git checkout hotfix
git commit -m "fix: critical bug"
# Creates: 1.0.1-hotfix.1
```

### Commit Types and Version Updates

The following commit types will trigger version updates:

| Commit Type | Description                | Version Bump | Example                |
|------------|----------------------------|--------------|------------------------|
| `feat`     | New feature                | Minor        | 1.0.0 -> 1.1.0        |
| `fix`      | Bug fix                    | Patch        | 1.0.0 -> 1.0.1        |
| `perf`     | Performance improvement    | Patch        | 1.0.0 -> 1.0.1        |
| `docs`     | Documentation changes      | Patch        | 1.0.0 -> 1.0.1        |
| `style`    | Code style changes         | Patch        | 1.0.0 -> 1.0.1        |
| `refactor` | Code refactoring           | Patch        | 1.0.0 -> 1.0.1        |
| `test`     | Adding/updating tests      | Patch        | 1.0.0 -> 1.0.1        |
| `build`    | Build system changes       | Patch        | 1.0.0 -> 1.0.1        |
| `ci`       | CI configuration changes   | Patch        | 1.0.0 -> 1.0.1        |
| `revert`   | Reverting changes          | Patch        | 1.0.0 -> 1.0.1        |
| `BREAKING` | Breaking changes           | Major        | 1.0.0 -> 2.0.0        |

### Environment-Specific Versions

Each environment has its own version format:

| Environment        | Branch  | Version Format    | Example        |
|-------------------|---------|-------------------|----------------|
| Production        | main    | x.y.z            | 1.0.0          |
| Development       | dev     | x.y.z-beta.n     | 1.0.0-beta.1   |
| QA               | qa      | x.y.z-qa.n       | 1.0.0-qa.1     |
| UAT              | uat     | x.y.z-uat.n      | 1.0.0-uat.1    |
| Hotfix           | hotfix  | x.y.z-hotfix.n   | 1.0.1-hotfix.1 |

### Breaking Changes

To create a breaking change that triggers a major version bump:

```bash
git commit -m "feat: new authentication system
BREAKING CHANGE: New authentication system is not backward compatible with previous versions"
# This will trigger a major version bump (1.0.0 -> 2.0.0)
```

### Version Inheritance Flow

The typical version progression through environments:

1. Development (dev):
   ```bash
   git checkout dev
   git commit -m "feat: new feature"
   # Creates: 1.0.0-beta.1
   ```

2. Quality Assurance (qa):
   ```bash
   git checkout qa
   git merge dev
   # Creates: 1.0.0-qa.1
   ```

3. User Acceptance Testing (uat):
   ```bash
   git checkout uat
   git merge qa
   # Creates: 1.0.0-uat.1
   ```

4. Production (main):
   ```bash
   git checkout main
   git merge uat
   # Creates: 1.0.0
   ```

### Hotfix Process

For emergency fixes:

1. Create hotfix:
   ```bash
   git checkout hotfix
   git commit -m "fix: critical security issue"
   # Creates: 1.0.1-hotfix.1
   ```

2. After testing, merge to main:
   ```bash
   git checkout main
   git merge hotfix
   # Creates: 1.0.1
   ```

3. Sync back to other environments:
   ```bash
   git checkout dev
   git merge main
   # Updates dev with the hotfix
   ```

### Version Files and Artifacts

After each release, the following will be updated:

1. `package.json` - Version number updated
2. `CHANGELOG.md` - Release notes added
3. Git tag created (e.g., v1.0.0)
4. GitHub release created
5. Release artifacts generated in 'dist' directory

### Troubleshooting Version Issues

1. Check current version:
   ```bash
   npm version
   # or
   cat package.json | grep version
   ```

2. List all tags:
   ```bash
   git tag --list
   ```

3. View version history:
   ```bash
   git log --pretty=format:"%h %d %s" --graph
   ```