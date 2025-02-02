/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: [
    'main',
    {
      name: 'develop',
      prerelease: true,
      channel: 'beta'
    },
    {
      name: 'qa',
      prerelease: true,
      channel: 'qa'
    },
    {
      name: 'uat',
      prerelease: true,
      channel: 'uat'
    },
    {
      name: 'hotfix/*',
      prerelease: '${name.replace(/^hotfix\\//, "")}',
      channel: 'hotfix'
    }
  ],
  tagFormat: '${version}-${prerelease.name}',
  plugins: [
    ['@semantic-release/commit-analyzer', {
      preset: 'angular',
      releaseRules: [
        { type: 'docs', release: 'patch' },
        { type: 'refactor', release: 'patch' },
        { type: 'style', release: 'patch' },
        { type: 'ci', release: 'patch' },
        { type: 'test', release: 'patch' }
      ]
    }],
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    ['@semantic-release/npm', { npmPublish: false }],
    ['@semantic-release/git', {
      assets: ['package.json', 'CHANGELOG.md'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }],
    '@semantic-release/github'
  ]
} 