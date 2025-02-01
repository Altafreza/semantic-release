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
    '@semantic-release/changelog',
    '@semantic-release/npm',
    '@semantic-release/git'
  ]
}