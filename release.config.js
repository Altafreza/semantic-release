export default {
    branches: [
      { name: "main" },  // Production Stable Release
      { name: "develop", prerelease: "beta" },  // Development (Beta)
      { name: "qa", prerelease: "qa" },  // QA Release
      { name: "uat", prerelease: "uat" },  // UAT Release
      { name: "hotfix", prerelease: "hotfix" }  // Hotfixes
    ],
    plugins: [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      ["@semantic-release/changelog", { changelogFile: "CHANGELOG.md" }],
      "@semantic-release/github",
      ["@semantic-release/git", {
        assets: ["package.json", "CHANGELOG.md"],
        message: "chore(release): 🔖 ${nextRelease.version} [skip ci]"
      }]
    ]
  };
  