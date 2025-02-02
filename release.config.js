export default {
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'main',
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
      name: 'hotfix',
      channel: 'hotfix',
      prerelease: 'hotfix'
    }
  ],
  plugins: [
    ['@semantic-release/commit-analyzer', {
      preset: 'angular',
      releaseRules: [
        { type: 'feat', release: 'minor' },
        { type: 'fix', release: 'patch' },
        { type: 'perf', release: 'patch' },
        { type: 'docs', release: 'patch' },
        { type: 'style', release: 'patch' },
        { type: 'refactor', release: 'patch' },
        { type: 'test', release: 'patch' },
        { type: 'build', release: 'patch' },
        { type: 'ci', release: 'patch' },
        { breaking: true, release: 'major' }
      ],
      parserOpts: {
        noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES']
      }
    }],
    '@semantic-release/release-notes-generator',
    ['@semantic-release/changelog', {
      changelogFile: 'CHANGELOG.md',
      changelogTitle: '# Semantic Release Changelog'
    }],
    ['@semantic-release/npm', {
      npmPublish: false
    }],
    ['@semantic-release/git', {
      assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }],
    ['@semantic-release/github', {
      assets: ['CHANGELOG.md', 'package.json'],
      successComment: "Release version ${nextRelease.version} is now available",
      failComment: "The automated release failed. Please check the logs for more details."
    }]
  ],
  preset: 'angular'
}