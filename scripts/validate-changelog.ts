import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const CLASSIFICATION_PREFIX = 'Contract change type:'
const ALLOWED = ['additive', 'semantic change', 'breaking']

const repoRoot = path.resolve(import.meta.dirname, '..')
const changelogPath = path.join(repoRoot, 'CHANGELOG.md')

const changelog = fs.readFileSync(changelogPath, 'utf8')
const errors: string[] = []

if (!changelog.startsWith('# Changelog')) {
  errors.push('CHANGELOG.md must start with "# Changelog"')
}

if (!changelog.includes('## [Unreleased]')) {
  errors.push('CHANGELOG.md must contain an ## [Unreleased] section')
}

const unreleasedSection = changelog.split('## [Unreleased]')[1]?.split('\n## [')[0] ?? ''
const hasUnreleasedContent = unreleasedSection.trim().length > 0

if (hasUnreleasedContent) {
  const classificationRe = new RegExp(
    `${CLASSIFICATION_PREFIX}\\s*(${ALLOWED.join('|')})`,
    'i'
  )
  if (!classificationRe.test(unreleasedSection)) {
    errors.push(
      [
        'Unreleased section has content but is missing a valid contract change classification.',
        `Expected a line matching: ${CLASSIFICATION_PREFIX} <${ALLOWED.join(' | ')}>`,
      ].join('\n')
    )
  }
}

const releasedSections = changelog.match(/^## \[[\d.]+\][^\n]*/gm) ?? []
for (const section of releasedSections) {
  if (!/^## \[\d+\.\d+\.\d+\] - \d{4}-\d{2}-\d{2}$/.test(section)) {
    errors.push(`Released section has invalid format: "${section}"`)
  }
}

if (errors.length > 0) {
  console.error('Changelog validation failed:\n' + errors.map((e) => `  - ${e}`).join('\n'))
  process.exit(1)
}

console.log(
  hasUnreleasedContent
    ? 'Changelog valid. Unreleased section has content with a valid classification.'
    : 'Changelog valid. No unreleased changes.'
)
