import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  getFooterClasses,
  getLogoCloudClasses,
  getLogoCloudItemClasses,
  getSectionClasses,
  getTextClasses
} from '@phcdevworks/spectre-ui'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const stylesDir = path.join(__dirname, '..', 'src', 'styles')
const readStyles = (fileName: string): string =>
  fs.readFileSync(path.join(stylesDir, fileName), 'utf8')

const componentsCss = readStyles('components.css')
const utilitiesCss = readStyles('utilities.css')
const generatedCss = readStyles('utilities.generated.css')

describe('footer surface option', () => {
  it('emits a surface modifier alongside the appearance', () => {
    expect(getFooterClasses({ surface: 'subtle', appearance: 'light' })).toBe(
      'sp-footer sp-footer--light sp-footer--surface-subtle'
    )
    expect(getFooterClasses({ surface: 'hero' })).toBe('sp-footer sp-footer--surface-hero')
  })

  it('re-points only the footer background, after the appearance blocks', () => {
    for (const role of ['page', 'card', 'subtle', 'inverse', 'hero']) {
      expect(componentsCss).toContain(
        `.sp-footer--surface-${role} {\n    --sp-component-footer-bg: var(--sp-surface-${role});\n  }`
      )
    }
    expect(componentsCss.indexOf('.sp-footer--surface-page {')).toBeGreaterThan(
      componentsCss.indexOf('.sp-footer--system {')
    )
    expect(componentsCss).toContain('background: var(--sp-component-footer-bg);')
  })
})

describe('text weight option', () => {
  it('emits the token-derived sp-font-{weight} utility', () => {
    expect(getTextClasses({ weight: 600 })).toBe(
      'sp-text sp-text--md sp-text--default sp-font-600'
    )
    expect(getTextClasses()).not.toContain('sp-font-')
  })

  it('only offers weights the generated utilities provide', () => {
    for (const weight of [400, 500, 600, 700, 800, 900]) {
      expect(generatedCss).toContain(`.sp-font-${weight} {`)
    }
  })
})

describe('section attached option', () => {
  it('drops the top padding in the section spacing layer', () => {
    expect(getSectionClasses({ attached: true })).toBe('sp-section sp-section--attached')
    const componentsLayer = utilitiesCss.slice(0, utilitiesCss.indexOf('@layer utilities {'))
    expect(componentsLayer).toContain('.sp-section--attached {\n    padding-top: 0;\n  }')
    expect(componentsLayer.indexOf('.sp-section--attached {')).toBeGreaterThan(
      componentsLayer.indexOf('.sp-section--hero-lg {')
    )
  })
})

describe('getLogoCloudClasses', () => {
  it('defaults to md tiles on the subtle fill', () => {
    expect(getLogoCloudClasses()).toBe(
      'sp-logo-cloud sp-logo-cloud--md sp-logo-cloud--fill-subtle'
    )
    expect(getLogoCloudItemClasses()).toBe('sp-logo-cloud__item')
  })

  it('emits size, fill, and muted modifiers', () => {
    expect(getLogoCloudClasses({ size: 'lg', fill: 'none', muted: true })).toBe(
      'sp-logo-cloud sp-logo-cloud--lg sp-logo-cloud--fill-none sp-logo-cloud--muted'
    )
  })

  it('keeps marks in full color for contrast and forced-color preferences', () => {
    expect(componentsCss).toMatch(
      /@media \(prefers-contrast: more\), \(forced-colors: active\) \{\s*\.sp-logo-cloud--muted \.sp-logo-cloud__item > :where\(img, svg\) \{\s*filter: none;/
    )
  })
})

describe('utility gaps', () => {
  it('ships balanced wrap and tabular numerals', () => {
    expect(utilitiesCss).toContain('.sp-text-balance {\n    text-wrap: balance;')
    expect(utilitiesCss).toContain('.sp-tabular-nums {\n    font-variant-numeric: tabular-nums;')
  })

  it('ships per-breakpoint grid column counts', () => {
    for (const bp of ['md', 'lg']) {
      for (const n of ['1', '2', '3', '4', '6', '12']) {
        expect(utilitiesCss).toContain(
          `.sp-${bp}-grid-cols-${n} {\n      grid-template-columns: repeat(${n}, minmax(0, 1fr));`
        )
      }
    }
  })

  it('generates surface-role backgrounds and thick borders before the color utilities', () => {
    expect(generatedCss).toContain('.sp-bg-surface-subtle {\n    background-color: var(--sp-surface-subtle);')
    expect(generatedCss).toContain('.sp-bg-surface-hero {\n    background-image: var(--sp-surface-hero);')
    expect(generatedCss).toContain('border-width: var(--sp-border-width-thick);')
    expect(generatedCss.indexOf('.sp-border-thick {')).toBeLessThan(
      generatedCss.indexOf('.sp-border-color-brand-500 {')
    )
    expect(generatedCss).not.toMatch(/\.sp-(sm|md|lg|xl|2xl)-border-thick/)
  })
})
