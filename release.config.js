export default {
  preset: 'angular',
  branches: [
    'main',
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
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    ['@semantic-release/npm', {
      npmPublish: false,
    }],
    '@semantic-release/git',
    '@semantic-release/github'
  ]
}