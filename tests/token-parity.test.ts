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
  '--sp-breakpoint-2xl': 'consumed by value in @media',
  // spectre-tokens' own @media (min-width: lg) block re-points the base
  // xl–4xl layout steps at these; recipes consume the base steps.
  '--sp-layout-responsive-lg-section-padding-xl': 'consumed through the token lg remap',
  '--sp-layout-responsive-lg-section-padding-2xl': 'consumed through the token lg remap',
  '--sp-layout-responsive-lg-section-padding-3xl': 'consumed through the token lg remap',
  '--sp-layout-responsive-lg-section-padding-4xl': 'consumed through the token lg remap',
  '--sp-layout-responsive-lg-section-gap-xl': 'consumed through the token lg remap',
  '--sp-layout-responsive-lg-section-gap-2xl': 'consumed through the token lg remap',
  '--sp-layout-responsive-lg-section-gap-3xl': 'consumed through the token lg remap',
  '--sp-layout-responsive-lg-section-gap-4xl': 'consumed through the token lg remap',
  '--sp-layout-responsive-lg-stack-gap-xl': 'consumed through the token lg remap',
  '--sp-layout-responsive-lg-stack-gap-2xl': 'consumed through the token lg remap',
  '--sp-layout-responsive-lg-stack-gap-3xl': 'consumed through the token lg remap',
  '--sp-layout-responsive-lg-stack-gap-4xl': 'consumed through the token lg remap',
  '--sp-layout-responsive-lg-container-padding-inline-xl': 'consumed through the token lg remap',
  '--sp-layout-responsive-lg-container-padding-inline-2xl': 'consumed through the token lg remap',
  '--sp-layout-responsive-lg-container-padding-inline-3xl': 'consumed through the token lg remap',
  '--sp-layout-responsive-lg-container-padding-inline-4xl': 'consumed through the token lg remap',
  // spectre-tokens' [data-spectre-density="compact"] block re-points the
  // default control steps at these; recipes consume the default steps.
  '--sp-control-compact-sm-height': 'consumed through the token density remap',
  '--sp-control-compact-sm-padding-inline': 'consumed through the token density remap',
  '--sp-control-compact-sm-icon-size': 'consumed through the token density remap',
  '--sp-control-compact-md-height': 'consumed through the token density remap',
  '--sp-control-compact-md-padding-inline': 'consumed through the token density remap',
  '--sp-control-compact-md-icon-size': 'consumed through the token density remap',
  '--sp-control-compact-lg-height': 'consumed through the token density remap',
  '--sp-control-compact-lg-padding-inline': 'consumed through the token density remap',
  '--sp-control-compact-lg-icon-size': 'consumed through the token density remap',
  // spectre-tokens' @media (min-width: md) block re-points the heading and
  // display roles at these; recipes consume the roles.
  '--sp-typography-responsive-md-heading-h1-size': 'consumed through the token md remap',
  '--sp-typography-responsive-md-heading-h1-line-height': 'consumed through the token md remap',
  '--sp-typography-responsive-md-heading-h2-size': 'consumed through the token md remap',
  '--sp-typography-responsive-md-heading-h2-line-height': 'consumed through the token md remap',
  '--sp-typography-responsive-md-heading-h3-size': 'consumed through the token md remap',
  '--sp-typography-responsive-md-heading-h3-line-height': 'consumed through the token md remap',
  '--sp-typography-responsive-md-heading-h4-size': 'consumed through the token md remap',
  '--sp-typography-responsive-md-heading-h4-line-height': 'consumed through the token md remap',
  '--sp-typography-responsive-md-heading-h5-size': 'consumed through the token md remap',
  '--sp-typography-responsive-md-heading-h5-line-height': 'consumed through the token md remap',
  '--sp-typography-responsive-md-display-1-size': 'consumed through the token md remap',
  '--sp-typography-responsive-md-display-1-line-height': 'consumed through the token md remap',
  '--sp-typography-responsive-md-display-2-size': 'consumed through the token md remap',
  '--sp-typography-responsive-md-display-2-line-height': 'consumed through the token md remap',
  '--sp-typography-responsive-md-display-3-size': 'consumed through the token md remap',
  '--sp-typography-responsive-md-display-3-line-height': 'consumed through the token md remap',
  // spectre-tokens' [data-spectre-action] blocks swap this ramp behind the
  // action.* roles; recipes consume the roles.
  '--sp-action-50': 'consumed through the token action roles',
  '--sp-action-100': 'consumed through the token action roles',
  '--sp-action-200': 'consumed through the token action roles',
  '--sp-action-300': 'consumed through the token action roles',
  '--sp-action-400': 'consumed through the token action roles',
  '--sp-action-500': 'consumed through the token action roles',
  '--sp-action-600': 'consumed through the token action roles',
  '--sp-action-700': 'consumed through the token action roles',
  '--sp-action-800': 'consumed through the token action roles',
  '--sp-action-900': 'consumed through the token action roles'
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
