/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  preset: 'angular',
  branches: [
    'main',
    {
      name: 'develop',
      prerelease: 'beta',
      channel: 'beta'
    },
    {
      name: 'qa',
      prerelease: 'qa',
      channel: 'qa'
    },
    {
      name: 'uat',
      prerelease: 'uat',
      channel: 'uat'
    },
    {
      name: 'hotfix/*',
      prerelease: 'hotfix',
      channel: 'hotfix'
    }
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    ['@semantic-release/npm', {
      npmPublish: false,
    }],
    ['@semantic-release/git', {
      assets: ['package.json', 'CHANGELOG.md'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }],
    '@semantic-release/github'
  ]
} 