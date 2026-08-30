import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const cssPath = path.join(__dirname, '..', 'dist', 'utilities.css')
const css = fs.readFileSync(cssPath, 'utf8')

describe('link utility', () => {
  it('ships a token-backed .sp-link class with hover/active/visited states', () => {
    expect(css).toContain('.sp-link {')
    expect(css).toContain('color: var(--sp-link-default)')
    expect(css).toContain('.sp-link:hover')
    expect(css).toContain('color: var(--sp-link-hover)')
    expect(css).toContain('.sp-link:active')
    expect(css).toContain('color: var(--sp-link-active)')
    expect(css).toContain('.sp-link:visited')
    expect(css).toContain('color: var(--sp-link-visited)')
  })

  // Regression for TODO.md "Requested by Downstream" / "On-dark/inverse
  // surface role": a link placed on a surface.inverse-backed background
  // needs its own default/hover pair, mirroring the page-mode pair above.
  it('ships a token-backed .sp-link--on-inverse class with a hover state', () => {
    expect(css).toContain('.sp-link--on-inverse {')
    expect(css).toContain('color: var(--sp-link-on-inverse)')
    expect(css).toContain('.sp-link--on-inverse:hover')
    expect(css).toContain('color: var(--sp-link-on-inverse-hover)')
  })
})

describe('interactive surface state utilities', () => {
  it('ships .sp-surface--hover backed by --sp-surface-hover', () => {
    expect(css).toContain('.sp-surface--hover:hover')
    expect(css).toContain('background-color: var(--sp-surface-hover)')
  })

  it('ships .sp-surface--selected backed by --sp-surface-selected', () => {
    expect(css).toContain('.sp-surface--selected {')
    expect(css).toContain('background-color: var(--sp-surface-selected)')
  })

  it('ships .sp-surface--active backed by --sp-surface-active', () => {
    expect(css).toContain('.sp-surface--active:active')
    expect(css).toContain('background-color: var(--sp-surface-active)')
  })

  // Regression: the on-dark/inverse foreground treatments
  // (.sp-text--on-inverse, .sp-link--on-inverse, the inverse Badge/Button
  // variants) all assume something already painted an inverse background —
  // this is that background utility, sourced from the same
  // --sp-surface-inverse token. See CHANGELOG.md "On-dark/inverse surface
  // role".
  it('ships .sp-surface--inverse backed by --sp-surface-inverse', () => {
    expect(css).toContain('.sp-surface--inverse {')
    expect(css).toContain('background-color: var(--sp-surface-inverse)')
  })
})

describe('divider utility', () => {
  it('ships a token-backed .sp-divider class', () => {
    expect(css).toContain('.sp-divider {')
    expect(css).toContain('border-top: var(--sp-component-border-width) solid var(--sp-surface-divider)')
  })
})
