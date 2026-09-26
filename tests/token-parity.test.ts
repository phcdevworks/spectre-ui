import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.join(__dirname, '..')
const stylesDir = path.join(projectRoot, 'src', 'styles')

const tokensCss = fs.readFileSync(
  path.join(
    projectRoot,
    'node_modules',
    '@phcdevworks',
    'spectre-tokens',
    'dist',
    'index.css'
  ),
  'utf8'
)

const sourceCss = fs
  .readdirSync(stylesDir)
  .filter((fileName) => fileName.endsWith('.css'))
  .map((fileName) => fs.readFileSync(path.join(stylesDir, fileName), 'utf8'))
  .join('\n')

const publishedVars = new Set(
  Array.from(tokensCss.matchAll(/(--sp-[a-z0-9-]+):/g), (match) => match[1])
)
const referencedVars = new Set(sourceCss.match(/--sp-[a-z0-9-]+/g) ?? [])

// Published variables deliberately not referenced by name, each with the
// reason it cannot or must not be.
const INTENTIONALLY_UNREFERENCED: Record<string, string> = {
  // CSS does not allow var() in @media feature queries; the generated
  // responsive blocks consume these by value (checked below).
  '--sp-breakpoint-sm': 'consumed by value in @media',
  '--sp-breakpoint-xl': 'consumed by value in @media',
  '--sp-breakpoint-2xl': 'consumed by value in @media'
}

describe('spectre-tokens parity', () => {
  it('references every published token variable except the documented exceptions', () => {
    const unreferenced = [...publishedVars].filter(
      (name) => !referencedVars.has(name) && !(name in INTENTIONALLY_UNREFERENCED)
    )

    expect(
      unreferenced,
      `Published tokens with no spectre-ui consumer:\n${unreferenced.join('\n')}`
    ).toEqual([])
  })

  it('keeps the exception list free of stale entries', () => {
    const stale = Object.keys(INTENTIONALLY_UNREFERENCED).filter(
      (name) => !publishedVars.has(name) || referencedVars.has(name)
    )

    expect(stale).toEqual([])
  })

  it('consumes every breakpoint by value in a generated @media query', () => {
    for (const match of tokensCss.matchAll(/--sp-breakpoint-[a-z0-9]+:\s*([0-9]+px)/g)) {
      expect(sourceCss).toContain(`@media (min-width: ${match[1]})`)
    }
  })
})
