import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  getButtonClasses,
  getCardClasses,
  getProseClasses,
  getQuoteAttributionClasses,
  getQuoteAttributionNameClasses,
  getQuoteAttributionRoleClasses,
  getQuoteClasses,
  getQuoteTextClasses,
  getSectionHeadClasses,
  getSectionHeadLeadClasses,
  getSectionHeadTitleClasses,
  getStatClasses,
  getStatFigureClasses,
  getStatLabelClasses,
  getStatUnitClasses,
  getStepperStepClasses,
  getTestimonialClasses,
  getTextClasses
} from '@phcdevworks/spectre-ui'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const stylesDir = path.join(__dirname, '..', 'src', 'styles')
const readStyles = (fileName: string): string =>
  fs.readFileSync(path.join(stylesDir, fileName), 'utf8')

const componentsCss = readStyles('components.css')
const utilitiesCss = readStyles('utilities.css')
const generatedCss = readStyles('utilities.generated.css')
const baseCss = readStyles('base.css')

describe('text leading and accent roles', () => {
  it('emits a leading class backed by the named --sp-leading-* scale', () => {
    for (const step of ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose']) {
      expect(getTextClasses({ leading: step as 'tight' })).toBe(
        `sp-text sp-text--md sp-text--default sp-text--leading-${step}`
      )
      expect(componentsCss).toContain(
        `.sp-text--leading-${step} {\n    line-height: var(--sp-leading-${step});`
      )
    }
    expect(getTextClasses()).not.toContain('leading')
  })

  it('declares leading after the size presets so it wins on source order', () => {
    expect(componentsCss.indexOf('.sp-text--leading-none')).toBeGreaterThan(
      componentsCss.indexOf('.sp-text--6xl {')
    )
  })

  it('maps the accent variants to the text.on*.accent roles', () => {
    const roles = {
      accent: ['sp-text--accent', '--sp-text-on-page-accent'],
      onSurfaceAccent: ['sp-text--on-surface-accent', '--sp-text-on-surface-accent'],
      onInverseBrand: ['sp-text--on-inverse-brand', '--sp-text-on-inverse-brand'],
      onInverseAccent: ['sp-text--on-inverse-accent', '--sp-text-on-inverse-accent']
    } as const
    for (const [variant, [className, token]] of Object.entries(roles)) {
      expect(getTextClasses({ variant: variant as 'accent' })).toContain(className)
      expect(componentsCss).toContain(`.${className} {\n    color: var(${token});`)
    }
  })
})

describe('accent outline button', () => {
  it('emits sp-btn--accent-outline from the accentOutline roles', () => {
    expect(getButtonClasses({ variant: 'accentOutline' })).toBe(
      'sp-btn sp-btn--accent-outline sp-btn--md'
    )
    for (const role of [
      'bg',
      'bghover',
      'bgactive',
      'bgdisabled',
      'text',
      'textdisabled',
      'border',
      'borderdisabled',
      'focusring',
      'focusvisible'
    ]) {
      expect(componentsCss).toContain(`var(--sp-button-accentoutline-${role})`)
    }
    for (const state of [':hover', ':active', ':disabled', ':focus-visible']) {
      expect(componentsCss).toContain(`.sp-btn--accent-outline${state}`)
    }
  })
})

describe('stepper tone', () => {
  it('omits the tone class by default', () => {
    expect(getStepperStepClasses({ state: 'active' })).toBe(
      'sp-stepper__step sp-stepper__step--active'
    )
  })

  it('re-points active and done colours at the tone roles', () => {
    for (const tone of ['brand', 'accent'] as const) {
      expect(getStepperStepClasses({ state: 'done', tone })).toBe(
        `sp-stepper__step sp-stepper__step--done sp-stepper__step--tone-${tone}`
      )
      for (const state of ['active', 'done']) {
        expect(componentsCss).toContain(
          `.sp-stepper__step--tone-${tone}.sp-stepper__step--${state}`
        )
        expect(componentsCss).toContain(`var(--sp-stepper-tone-${tone}-${state}-bg)`)
        expect(componentsCss).toContain(`var(--sp-stepper-tone-${tone}-${state}-text)`)
      }
    }
  })
})

describe('accent rail tone', () => {
  it('accepts accent on the card and testimonial rails', () => {
    expect(getCardClasses({ accent: 'top', accentColor: 'accent' })).toContain(
      'sp-card--accent-accent'
    )
    expect(getTestimonialClasses({ accent: 'left', accentColor: 'accent' })).toContain(
      'sp-testimonial--accent-accent'
    )
  })

  it('consumes the accent tone of every component rail', () => {
    for (const token of [
      '--sp-component-card-accent-accent',
      '--sp-badge-accent-accent',
      '--sp-testimonial-accent-accent',
      '--sp-pricing-card-accent-accent',
      '--sp-nav-accent-accent',
      '--sp-footer-accent-accent',
      '--sp-footer-light-accent-accent',
      '--sp-modal-accent-accent',
      '--sp-toast-accent-accent',
      '--sp-tooltip-accent-accent',
      '--sp-dropdown-accent-accent',
      '--sp-list-group-accent-accent'
    ]) {
      expect(componentsCss).toContain(`var(${token})`)
    }
  })
})

describe('quote recipe', () => {
  it('defaults to a medium plain quote with an accent-toned edge', () => {
    expect(getQuoteClasses()).toBe(
      'sp-quote sp-quote--md sp-quote--accent-edge sp-quote--accent-accent'
    )
  })

  it('emits size, surface, mark, tone, and alignment classes', () => {
    expect(
      getQuoteClasses({
        size: 'xl',
        surface: 'inverse',
        accent: 'mark',
        accentColor: 'brand',
        align: 'center'
      })
    ).toBe(
      'sp-quote sp-quote--xl sp-quote--surface-inverse sp-quote--accent-mark sp-quote--accent-brand sp-quote--center'
    )
  })

  it('drops the accent classes for accent none', () => {
    expect(getQuoteClasses({ accent: 'none', accentColor: 'danger' })).toBe(
      'sp-quote sp-quote--md'
    )
  })

  it('exposes the text and attribution parts', () => {
    expect(getQuoteTextClasses()).toBe('sp-quote__text')
    expect(getQuoteAttributionClasses()).toBe('sp-quote__attribution')
    expect(getQuoteAttributionClasses({ avatar: true })).toBe(
      'sp-quote__attribution sp-quote__attribution--avatar'
    )
    expect(getQuoteAttributionNameClasses()).toBe('sp-quote__name')
    expect(getQuoteAttributionRoleClasses()).toBe('sp-quote__role')
  })

  it('styles every part from the component.quote contract', () => {
    for (const token of [
      '--sp-quote-text',
      '--sp-quote-attribution-name',
      '--sp-quote-attribution-role',
      '--sp-quote-mark',
      '--sp-quote-border',
      '--sp-quote-accent-thickness',
      '--sp-text-on-inverse-default',
      '--sp-text-on-inverse-muted',
      '--sp-text-on-inverse-accent'
    ]) {
      expect(componentsCss).toContain(`var(${token})`)
    }
    for (const tone of [
      'neutral',
      'brand',
      'info',
      'success',
      'warning',
      'danger',
      'cta',
      'accent'
    ]) {
      expect(componentsCss).toContain(`.sp-quote--accent-${tone} {`)
    }
  })

  it('declares tone modifiers after surface modifiers so an explicit tone wins', () => {
    expect(componentsCss.indexOf('.sp-quote--accent-brand {')).toBeGreaterThan(
      componentsCss.indexOf('.sp-quote--surface-inverse {')
    )
  })
})

describe('stat recipe', () => {
  it('defaults to a medium, start-aligned stat on the page', () => {
    expect(getStatClasses()).toBe('sp-stat sp-stat--md')
  })

  it('emits size, alignment, and surface classes', () => {
    expect(getStatClasses({ size: 'xl', align: 'center', surface: 'inverse' })).toBe(
      'sp-stat sp-stat--xl sp-stat--align-center sp-stat--on-inverse'
    )
  })

  it('exposes figure, unit, and label parts', () => {
    expect(getStatFigureClasses()).toBe('sp-stat__figure')
    expect(getStatUnitClasses()).toBe('sp-stat__unit')
    expect(getStatLabelClasses()).toBe('sp-stat__label')
  })

  it('colours the unit with the accent role of each surface', () => {
    for (const surface of ['page', 'surface', 'inverse']) {
      expect(componentsCss).toContain(
        `--sp-component-stat-unit: var(--sp-text-on-${surface}-accent);`
      )
    }
  })
})

describe('section head recipe', () => {
  it('defaults to the stacked layout', () => {
    expect(getSectionHeadClasses()).toBe('sp-section-head sp-section-head--stacked')
    expect(getSectionHeadClasses({ align: 'center' })).toBe(
      'sp-section-head sp-section-head--stacked sp-section-head--center'
    )
  })

  it('emits the split layout and ignores align there', () => {
    expect(getSectionHeadClasses({ layout: 'split', align: 'center' })).toBe(
      'sp-section-head sp-section-head--split'
    )
    expect(getSectionHeadTitleClasses()).toBe('sp-section-head__title')
    expect(getSectionHeadLeadClasses()).toBe('sp-section-head__lead')
  })

  it('splits on a twelve-column grid from the lg breakpoint', () => {
    const lgBlock = utilitiesCss.slice(
      utilitiesCss.indexOf('@media (min-width: 1024px) {\n    .sp-section-head--split')
    )
    expect(lgBlock).toContain('grid-template-columns: repeat(12, minmax(0, 1fr));')
    expect(lgBlock).toContain('grid-column: 1 / span 6;')
    expect(lgBlock).toContain('grid-column: 7 / span 6;')
  })
})

describe('Phase 17 element coverage', () => {
  it('replaces the space-based underline offset and preset-derived weights', () => {
    expect(componentsCss).not.toContain('text-underline-offset: var(--sp-space-2)')
    expect(componentsCss).toContain(
      'text-underline-offset: var(--sp-text-decoration-offset-sm)'
    )
    // Only the text size presets themselves still read a preset weight.
    const presetWeightUses = componentsCss.match(/var\(--sp-font-[a-z0-9]+-weight\)/g) ?? []
    expect(presetWeightUses).toHaveLength(10)
  })

  it('resolves the generated weight utilities through the named scale', () => {
    expect(generatedCss).toContain('.sp-font-700 {\n    font-weight: var(--sp-font-weight-bold);')
  })

  it('styles base elements from the Phase 17 tokens', () => {
    for (const fragment of [
      'font-weight: var(--sp-font-weight-bold)',
      'abbr[title]',
      '::spelling-error',
      'var(--sp-proofing-spelling)',
      '::grammar-error',
      'var(--sp-proofing-grammar)',
      'var(--sp-link-underline-hover)',
      'meter::-webkit-meter-optimum-value',
      'meter:-moz-meter-sub-sub-optimum::-moz-meter-bar',
      'var(--sp-meter-track)',
      'var(--sp-meter-fill-critical)'
    ]) {
      expect(baseCss).toContain(fragment)
    }
  })

  it('maps every code syntax role to Prism and highlight.js classes', () => {
    for (const role of [
      'keyword',
      'string',
      'number',
      'comment',
      'function',
      'variable',
      'type',
      'operator',
      'punctuation',
      'tag',
      'attribute'
    ]) {
      expect(baseCss).toContain(`color: var(--sp-code-syntax-${role});`)
    }
  })

  it('styles prose edit marks, markers, definition lists, and captions', () => {
    for (const selector of [
      '.sp-prose del',
      '.sp-prose ins',
      '.sp-prose s',
      '.sp-prose li::marker',
      '.sp-prose--accent-markers li::marker',
      '.sp-prose dt',
      '.sp-prose dd',
      '.sp-prose figcaption',
      '.sp-prose caption'
    ]) {
      expect(utilitiesCss).toContain(`${selector} {`)
    }
    expect(getProseClasses({ accentMarkers: true })).toBe(
      'sp-prose sp-prose--accent-markers'
    )
    expect(getProseClasses()).toBe('sp-prose')
  })

  it('spaces prose with the layout.prose.flow steps', () => {
    for (const step of [
      'paragraph',
      'list',
      'list-item',
      'blockquote',
      'figure',
      'heading',
      'heading-after',
      'hr'
    ]) {
      expect(utilitiesCss).toContain(`var(--sp-layout-prose-flow-${step})`)
    }
  })

  it('styles table captions and footers and select options', () => {
    for (const token of [
      '--sp-table-caption-text',
      '--sp-table-footer-bg',
      '--sp-table-footer-text',
      '--sp-select-option-hover-bg',
      '--sp-select-option-selected-bg',
      '--sp-select-option-selected-text',
      '--sp-select-option-disabled-text',
      '--sp-select-optgroup-label-text'
    ]) {
      expect(componentsCss).toContain(`var(${token})`)
    }
  })

  it('ships text-decoration utilities for every thickness and offset step', () => {
    for (const step of ['thin', 'base', 'thick']) {
      expect(utilitiesCss).toContain(
        `.sp-decoration-${step} {\n    text-decoration-thickness: var(--sp-text-decoration-thickness-${step});`
      )
    }
    for (const step of ['sm', 'md', 'lg']) {
      expect(utilitiesCss).toContain(
        `.sp-underline-offset-${step} {\n    text-underline-offset: var(--sp-text-decoration-offset-${step});`
      )
    }
  })
})
