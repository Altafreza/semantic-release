export default {
  branches: [
    'main',  // Production Stable Release
    {
      name: 'develop',
      channel: 'beta',
      prerelease: 'beta'  // Will create versions like 1.0.0-beta.1
    },
    {
      name: 'qa',
      channel: 'qa',
      prerelease: 'qa'  // Will create versions like 1.0.0-qa.1
    },
    {
      name: 'uat',
      channel: 'uat',
      prerelease: 'uat'  // Will create versions like 1.0.0-uat.1
    },
    {
      name: 'hotfix',
      channel: 'hotfix',
      prerelease: 'hotfix' // Will create versions like 1.0.1-hotfix.1
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
        { breaking: true, release: 'major' },
        { type: 'revert', release: 'patch' }
      ]
    }],
    '@semantic-release/release-notes-generator',
    ['@semantic-release/changelog', {
      changelogFile: 'CHANGELOG.md',
      changelogTitle: '# Semantic Release Changelog'
    }],
    ['@semantic-release/npm', {
      npmPublish: false,
      pkgRoot: '.'
    }],
    ['@semantic-release/git', {
      assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }]
  ],
  tagFormat: '${version}'
}