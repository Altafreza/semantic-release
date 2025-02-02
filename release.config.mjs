/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  preset: 'angular',
  tagFormat: '${version}',
  branches: [
    {
      name: 'main',
      channel: 'latest'
    },
    {
      name: 'develop',
      channel: 'beta',
      prerelease: true
    },
    {
      name: 'qa',
      channel: 'qa',
      prerelease: true
    },
    {
      name: 'uat',
      channel: 'uat',
      prerelease: true
    },
    {
      name: 'hotfix/*',
      channel: 'hotfix',
      prerelease: true
    }
  ],
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