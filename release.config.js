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
        { type: 'feat', release: 'minor' },     // New features trigger minor release
        { type: 'fix', release: 'patch' },      // Bug fixes trigger patch release
        { type: 'perf', release: 'patch' },     // Performance improvements trigger patch release
        { type: 'docs', release: 'patch' },     // Documentation changes trigger patch release
        { type: 'style', release: 'patch' },    // Style changes trigger patch release
        { type: 'refactor', release: 'patch' }, // Code refactoring triggers patch release
        { type: 'test', release: 'patch' },     // Adding tests triggers patch release
        { type: 'build', release: 'patch' },    // Build changes trigger patch release
        { type: 'ci', release: 'patch' },       // CI changes trigger patch release
        { breaking: true, release: 'major' },    // Breaking changes trigger major release
        { type: 'revert', release: 'patch' }    // Reverts trigger patch release
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
      pkgRoot: '.'
    }],
    ['@semantic-release/git', {
      assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
      message: 'chore(release): v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }],
    ['@semantic-release/github', {
      assets: [],
      successComment: '🎉 This ${issue.pull_request ? "PR is included" : "issue is fixed"} in version ${nextRelease.version}',
      failComment: "The release failed due to an error. Please check the workflow logs.",
      failTitle: "❌ Release Failed",
      labels: ["released"],
      releasedLabels: ["released"]
    }]
  ],
  preset: 'angular',
  tagFormat: 'v${version}'
}