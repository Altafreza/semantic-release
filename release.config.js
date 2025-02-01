export default {
  branches: [
    'main',  // Production Stable Release
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
      name: 'hotfix',
      prerelease: 'hotfix',
      channel: 'hotfix'
    }
  ],
  tagFormat: '${version}',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    ['@semantic-release/git', {
      assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }]
  ]
}