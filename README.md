# Semantic Release Setup Guide

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [GitHub Token Setup](#github-token-setup)
- [Configuration](#configuration)
- [Usage](#usage)
- [Commit Message Format](#commit-message-format)

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