import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  getCheckboxClasses,
  getContainerClasses,
  getDisplayClasses,
  getHeadingClasses,
  getLeadClasses,
  getRadioClasses,
  getSectionClasses,
  getTextClasses
} from '@phcdevworks/spectre-ui'
import {
  componentsCss,
  expectRecipeClassesStyled
} from './support/component-css'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const readDist = (fileName: string): string =>
  fs.readFileSync(path.join(__dirname, '..', 'dist', fileName), 'utf8')
const utilitiesCss = readDist('utilities.css')
const baseCss = readDist('base.css')

const LEVELS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const
const SCALE = ['sm', 'md', 'lg'] as const

describe('getHeadingClasses', () => {
  it('defaults to the h2 preset', () => {
    expect(getHeadingClasses()).toBe('sp-heading sp-heading--h2')
  })

  it('applies every typography.heading preset field', () => {
    expectRecipeClassesStyled(LEVELS.map((level) => getHeadingClasses({ level })))
    for (const level of LEVELS) {
      for (const field of ['family', 'size', 'weight', 'line-height', 'letter-spacing']) {
        expect(componentsCss).toContain(`var(--sp-heading-${level}-${field})`)
      }
    }
  })
})

describe('display and lead presets', () => {
  it('defaults the display level to 1 and accepts every level', () => {
    expect(getDisplayClasses()).toBe('sp-display sp-display--1')
    for (const level of [1, 2, 3, 4, 5, 6] as const) {
      expect(getDisplayClasses({ level })).toBe(
        `sp-display sp-display--${level}`
      )
    }
    expect(() => getDisplayClasses({ level: 7 as never })).toThrow(
      '[spectre-ui] Unknown display level: 7'
    )
  })

  it('applies every typography.display and typography.lead field', () => {
    expectRecipeClassesStyled([
      ...([1, 2, 3, 4, 5, 6] as const).map((level) =>
        getDisplayClasses({ level })
      ),
      getLeadClasses()
    ])
    for (const field of ['family', 'size', 'weight', 'line-height', 'letter-spacing']) {
      for (let level = 1; level <= 6; level += 1) {
        expect(componentsCss).toContain(`var(--sp-display-${level}-${field})`)
      }
      expect(componentsCss).toContain(`var(--sp-lead-${field})`)
    }
  })
})

describe('on-surface text roles', () => {
  it('maps each onSurface variant to its text.onSurface token', () => {
    const roles = {
      onSurface: 'default',
      onSurfaceMuted: 'muted',
      onSurfaceSubtle: 'subtle',
      onSurfaceMeta: 'meta',
      onSurfaceBrand: 'brand'
    } as const

    for (const [variant, role] of Object.entries(roles)) {
      const result = getTextClasses({ variant: variant as keyof typeof roles })
      expectRecipeClassesStyled([result])
      expect(componentsCss).toContain(`var(--sp-text-on-surface-${role})`)
    }
  })
})

describe('layout spacing steps', () => {
  it('keeps the no-option section and container output unchanged', () => {
    expect(getSectionClasses()).toBe('sp-section')
    expect(getContainerClasses()).toBe('sp-container')
  })

  it('exposes every section padding/gap and container padding step', () => {
    for (const step of SCALE) {
      expect(getSectionClasses({ spacing: step, gap: step })).toBe(
        `sp-section sp-section--spacing-${step} sp-section--gap-${step}`
      )
      expect(getContainerClasses({ padding: step })).toBe(
        `sp-container sp-container--padding-${step}`
      )
      expect(utilitiesCss).toContain(`.sp-section--spacing-${step} {`)
      expect(utilitiesCss).toContain(`.sp-section--gap-${step} {`)
      expect(utilitiesCss).toContain(`.sp-container--padding-${step} {`)
    }
  })
})

describe('form control token alignment', () => {
  it('draws checked glyphs in the checkbox/radio text colors', () => {
    expect(getCheckboxClasses({ checked: true })).toContain(
      'sp-checkbox-indicator--checked'
    )
    expect(getRadioClasses({ checked: true })).toContain(
      'sp-radio-indicator--checked'
    )
    expect(componentsCss).toContain('.sp-checkbox-indicator--checked::after')
    expect(componentsCss).toContain('var(--sp-checkbox-text)')
    expect(componentsCss).toContain('.sp-radio-indicator--checked::after')
    expect(componentsCss).toContain('var(--sp-radio-text)')
  })

  it('backs inputs with the mode-aware form.default role', () => {
    expect(componentsCss).toContain(
      '--sp-component-input-role-bg: var(--sp-form-default-bg);'
    )
    expect(baseCss).toContain('color: var(--sp-form-default-text);')
    expect(baseCss).toContain('color: var(--sp-form-default-placeholder);')
  })
})

describe('utility and base token coverage', () => {
  it('generates opt-in semantic scale, motion, border, and icon utilities', () => {
    for (const selector of [
      '.sp-text-color-brand-500 {',
      '.sp-bg-color-neutral-100 {',
      '.sp-border-color-violet-600 {',
      '.sp-text-black {',
      '.sp-duration-slower {',
      '.sp-ease-spring {',
      '.sp-border-style-dashed {',
      '.sp-border-width-none {',
      '.sp-icon-3xl {',
      '.sp-text-integration-gunmetal-500 {',
      '.sp-surface--hero {',
      '.sp-surface--input {'
    ]) {
      expect(utilitiesCss).toContain(selector)
    }
  })

  it('swaps animation utilities for their reduced-motion counterparts', () => {
    expect(utilitiesCss).toMatch(
      /@media \(prefers-reduced-motion: reduce\)\s*\{\s*\.sp-animate-fade-in \{\s*animation: var\(--sp-animation-reduced-motion-fadein-keyframes\)/
    )
  })

  it('applies the body preset and accessibility floor in base', () => {
    expect(baseCss).toContain(
      'font-size: max(var(--sp-min-text-size), var(--sp-body-size));'
    )
    expect(baseCss).toContain('forced-color-adjust: var(--sp-forced-colors);')
  })
})
