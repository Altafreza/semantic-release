/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: [
    'main',
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
      name: 'hotfix/*',
      prerelease: '${name.replace(/^hotfix\\//, "")}',
      channel: 'hotfix'
    }
  ],
  plugins: [
    ['@semantic-release/commit-analyzer', {
      preset: 'angular',
      releaseRules: [
        { type: 'docs', release: 'patch' },
        { type: 'refactor', release: 'patch' },
        { type: 'style', release: 'patch' },
        { type: 'ci', release: 'patch' },
        { type: 'test', release: 'patch' }
      ],
      parserOpts: {
        noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING']
      }
    }],
    ['@semantic-release/release-notes-generator', {
      preset: 'angular',
      presetConfig: {
        types: [
          { type: 'feat', section: '✨ Features' },
          { type: 'fix', section: '🐛 Bug Fixes' },
          { type: 'perf', section: '⚡️ Performance Improvements' },
          { type: 'revert', section: '⏪️ Reverts' },
          { type: 'docs', section: '📝 Documentation' },
          { type: 'style', section: '💄 Styles' },
          { type: 'refactor', section: '♻️ Code Refactoring' },
          { type: 'test', section: '✅ Tests' },
          { type: 'build', section: '📦️ Build System' },
          { type: 'ci', section: '👷 CI/CD' }
        ]
      },
      writerOpts: {
        groupBy: 'type',
        commitGroupsSort: 'title',
        commitsSort: ['scope', 'subject'],
        noteGroupsSort: 'title',
        mainTemplate: '{{> header}}\n\n{{#each commitGroups}}\n{{#if title}}\n### {{title}}\n\n{{/if}}\n{{#each commits}}\n{{> commit root=@root}}\n{{/each}}\n{{/each}}\n\n{{> footer}}',
        headerPartial: '{{#if isPatch~}}\n  ##\n{{~else~}}\n  #\n{{~/if}} {{#if @root.linkCompare~}}\n  [{{version}}]({{@root.compareUrl}}) ({{date}})\n{{~else}}\n  {{version}} ({{date}})\n{{~/if}}\n',
        commitPartial: '* {{#if scope}}**{{scope}}:** {{/if}}{{#if subject}}{{subject}}{{else}}{{header}}{{/if}} ([{{shortHash}}]({{commitUrl}}))\n{{~!-- commit references --}}\n{{~#if references}}, closes{{~#each references}} {{#if @root.linkReferences}}[{{#if this.owner}}{{this.owner}}/{{/if}}{{this.repository}}#{{this.issue}}]({{this.url}}){{else}}{{#if this.owner}}{{this.owner}}/{{/if}}{{this.repository}}#{{this.issue}}{{/if}}{{/each}}{{/if}}\n',
        footerPartial: '{{#if noteGroups}}\n{{#each noteGroups}}\n\n### {{title}}\n\n{{#each notes}}\n* {{#if commit.scope}}**{{commit.scope}}:** {{/if}}{{text}}\n{{/each}}\n{{/each}}\n{{/if}}\n'
      }
    }],
    '@semantic-release/changelog',
    ['@semantic-release/npm', { npmPublish: false }],
    ['@semantic-release/git', {
      assets: ['package.json', 'CHANGELOG.md'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
    }],
    '@semantic-release/github'
  ]
} 