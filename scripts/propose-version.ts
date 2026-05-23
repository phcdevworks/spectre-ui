import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(__dirname, '..')
const changelogPath = join(repoRoot, 'CHANGELOG.md')
const packagePath = join(repoRoot, 'package.json')

const CLASSIFICATION_PREFIX = 'Contract change type:'
const ALLOWED = ['additive', 'semantic change', 'breaking'] as const

type Classification = (typeof ALLOWED)[number]

interface PackageJsonWithVersion {
  version: string
}

function parseClassification(unreleasedSection: string): Classification | null {
  const classificationPattern = new RegExp(
    `${CLASSIFICATION_PREFIX}\\s*(${ALLOWED.join('|')})`,
    'i'
  )
  const match = unreleasedSection.match(classificationPattern)

  return (match?.[1].toLowerCase() as Classification | undefined) ?? null
}

const changelog = readFileSync(changelogPath, 'utf8')
const unreleasedSection = changelog.split('## [Unreleased]')[1]?.split('\n## [')[0] ?? ''

if (unreleasedSection.trim().length === 0) {
  console.log('No unreleased changes. No version bump needed.')
  process.exit(0)
}

const classification = parseClassification(unreleasedSection)

if (!classification) {
  throw new Error('Missing contract change classification — run npm run validate:changelog for details.')
}

const pkg = JSON.parse(
  readFileSync(packagePath, 'utf8')
) as PackageJsonWithVersion
const current = pkg.version
const [majorStr, minorStr, patchStr] = current.split('.')
const major = parseInt(majorStr, 10)
const minor = parseInt(minorStr, 10)
const patch = parseInt(patchStr, 10)

let proposed: string
let bumpType: 'major' | 'minor' | 'patch'

if (classification === 'breaking') {
  proposed = `${major + 1}.0.0`
  bumpType = 'major'
} else if (classification === 'additive' || classification === 'semantic change') {
  proposed = `${major}.${minor + 1}.0`
  bumpType = 'minor'
} else {
  proposed = `${major}.${minor}.${patch + 1}`
  bumpType = 'patch'
}

console.log(`Current version : ${current}`)
console.log(`Classification  : ${classification}`)
console.log(`Bump type       : ${bumpType}`)
console.log(`Proposed version: ${proposed}`)
