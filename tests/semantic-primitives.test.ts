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
})

describe('divider utility', () => {
  it('ships a token-backed .sp-divider class', () => {
    expect(css).toContain('.sp-divider {')
    expect(css).toContain('border-top: var(--sp-component-border-width) solid var(--sp-surface-divider)')
  })
})
