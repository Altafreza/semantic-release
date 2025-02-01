export default {
    branches: [
      { name: "main" },  // Production Stable Release
      { name: "dev", channel: "beta", prerelease: "beta" },  // Development (Beta)
      { name: "qa", channel: "qa", prerelease: "qa" },  // QA Release
      { name: "uat", channel: "uat", prerelease: "uat" },  // UAT Release
      { name: "hotfix", prerelease: "hotfix" }  // Hotfixes
    ],
    plugins: [
      ["@semantic-release/commit-analyzer", {
        "preset": "angular",
        "releaseRules": [
          { "breaking": true, "release": "major" },
          { "type": "feat", "release": "minor" },
          { "type": "fix", "release": "patch" },
          { "type": "docs", "scope": "README", "release": "patch" },
          { "type": "refactor", "release": "patch" },
          { "type": "style", "release": "patch" },
          { "type": "perf", "release": "patch" },
          { "type": "ci", "release": "patch" },
          { "type": "test", "release": "patch" },
          { "type": "build", "release": "patch" },
          { "scope": "no-release", "release": false }
        ],
        "parserOpts": {
          "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES"]
        }
      }],
      ["@semantic-release/release-notes-generator", {
        "preset": "angular",
        "parserOpts": {
          "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES"]
        },
        "writerOpts": {
          "commitsSort": ["subject", "scope"],
          "commitGroupsSort": ["feat", "fix", "perf", "refactor"]
        }
      }],
      ["@semantic-release/changelog", {
        "changelogFile": "CHANGELOG.md",
        "changelogTitle": "# Semantic Release Changelog"
      }],
      ["@semantic-release/npm", {
        "npmPublish": false
      }],
      ["@semantic-release/github", {
        "assets": ["dist/**/*.{js,css}", "CHANGELOG.md", "package.json"],
        "successComment": "🎉 This ${issue.pull_request ? 'PR is included' : 'issue is fixed'} in version ${nextRelease.version}",
        "failComment": "The release failed due to an error. Please check the workflow logs.",
        "failTitle": "❌ Release Failed",
        "labels": ["released"],
        "addReleases": "bottom",
        "releasedLabels": ["released"]
      }],
      ["@semantic-release/git", {
        "assets": ["package.json", "CHANGELOG.md", "dist/**/*.{js,css}"],
        "message": "chore(release): 🔖 ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }]
    ],
    "preset": "angular"
  };