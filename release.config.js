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
  tagFormat: '${version}',
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
<<<<<<< HEAD
    ['@semantic-release/changelog', {
      changelogFile: 'CHANGELOG.md',
      changelogTitle: '# Semantic Release Changelog'
    }],
    ['@semantic-release/npm', {
      npmPublish: false,
      pkgRoot: '.'
    }],
    ['@semantic-release/git', {
      assets: ['package.json', 'CHANGELOG.md'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
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
  tagFormat: '${version}',
  generateNotes: {
    preset: 'angular',
    writerOpts: {
      commitsSort: ['subject', 'scope']
    }
  }
=======
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git'
  ]
>>>>>>> develop
}