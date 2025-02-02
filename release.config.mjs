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
      prerelease: 'beta'
    },
    {
      name: 'qa',
      channel: 'qa',
      prerelease: 'qa'
    },
    {
      name: 'uat',
      channel: 'uat',
      prerelease: 'uat'
    },
    {
      name: 'hotfix/*',
      channel: 'hotfix',
      prerelease: 'hotfix'
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
    ['@semantic-release/release-notes-generator', {
      preset: 'angular'
    }],
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