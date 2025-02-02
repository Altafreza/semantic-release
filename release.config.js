export default {
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'main',
    {
      name: 'develop',
      prerelease: 'beta',
      channel: 'beta',
      prereleaseSuffix: 'beta'
    },
    {
      name: 'qa',
      prerelease: 'qa',
      channel: 'qa',
      prereleaseSuffix: 'qa'
    },
    {
      name: 'uat',
      prerelease: 'uat',
      channel: 'uat',
      prereleaseSuffix: 'uat'
    },
    {
      name: 'hotfix',
      prerelease: 'hotfix',
      channel: 'hotfix',
      prereleaseSuffix: 'hotfix'
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
      npmPublish: false,
      tarballDir: 'dist'
    }],
    ['@semantic-release/git', {
      assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }],
    ['@semantic-release/github', {
      assets: 'dist/*.tgz'
    }]
  ],
  // Custom configuration for version inheritance
  tagFormat: '${version}',
  preset: 'angular',
  gitflow: true,
  // Version inheritance rules
  versionInheritance: {
    develop: 'main',
    qa: 'develop',
    uat: 'qa',
    hotfix: 'main'
  },
  // Version format by branch
  versionFormat: {
    develop: '${version}-beta.${prerelease}',
    qa: '${version}-qa.${prerelease}',
    uat: '${version}-uat.${prerelease}',
    hotfix: '${version}-hotfix.${prerelease}'
  },
  // Success hooks for version propagation
  success: [
    '@semantic-release/github',
    {
      successFile: '.version',
      assets: ['CHANGELOG.md', 'package.json']
    }
  ],
  // Fail hooks for rollback
  fail: [
    '@semantic-release/github',
    {
      failComment: true
    }
  ]
}