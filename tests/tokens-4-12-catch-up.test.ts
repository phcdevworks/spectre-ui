import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  getContainerClasses,
  getFooterClasses,
  getGridClasses,
  getSectionClasses,
  getSkeletonClasses,
  getStackClasses
} from '@phcdevworks/spectre-ui'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const stylesDir = path.join(__dirname, '..', 'src', 'styles')
const readStyles = (fileName: string): string =>
  fs.readFileSync(path.join(stylesDir, fileName), 'utf8')

const componentsCss = readStyles('components.css')
const utilitiesCss = readStyles('utilities.css')
const generatedCss = readStyles('utilities.generated.css')
const baseCss = readStyles('base.css')

const LARGE_STEPS = ['xl', '2xl', '3xl', '4xl'] as const

describe('layout xl–4xl steps', () => {
  it('emits section spacing and gap classes backed by the layout tokens', () => {
    for (const step of LARGE_STEPS) {
      expect(getSectionClasses({ spacing: step, gap: step })).toBe(
        `sp-section sp-section--spacing-${step} sp-section--gap-${step}`
      )
      expect(utilitiesCss).toContain(
        `padding-top: var(--sp-layout-section-padding-${step});`
      )
      expect(utilitiesCss).toContain(`gap: var(--sp-layout-section-gap-${step});`)
    }
  })

  it('emits stack, grid, and container classes for every large step', () => {
    for (const step of LARGE_STEPS) {
      expect(getStackClasses({ gap: step })).toBe(`sp-stack sp-stack--gap-${step}`)
      expect(getGridClasses({ gap: step, columnGap: step, rowGap: step })).toContain(
        `sp-grid--gap-${step} sp-grid--column-gap-${step} sp-grid--row-gap-${step}`
      )
      expect(getContainerClasses({ padding: step })).toBe(
        `sp-container sp-container--padding-${step}`
      )
      for (const selector of [
        `.sp-stack--gap-${step}`,
        `.sp-grid--gap-${step}`,
        `.sp-grid--column-gap-${step}`,
        `.sp-grid--row-gap-${step}`,
        `.sp-container--padding-${step}`
      ]) {
        expect(utilitiesCss).toContain(`${selector} {`)
      }
    }
  })

  it('keeps section steps in @layer components so sp-py-* still wins', () => {
    const componentsLayer = utilitiesCss.slice(0, utilitiesCss.indexOf('@layer utilities {'))
    expect(componentsLayer).toContain('.sp-section--spacing-4xl {')
    expect(componentsLayer).toContain('.sp-section--hero-lg {')
  })
})

describe('section hero option', () => {
  it('replaces symmetric spacing with the asymmetric hero pair', () => {
    expect(getSectionClasses({ hero: 'md' })).toBe('sp-section sp-section--hero-md')
    expect(getSectionClasses({ hero: 'lg', spacing: 'sm' })).toBe(
      'sp-section sp-section--hero-lg'
    )
  })

  it('binds each hero size to its top and bottom tokens', () => {
    for (const size of ['sm', 'md', 'lg']) {
      expect(utilitiesCss).toContain(
        `padding-top: var(--sp-layout-hero-padding-top-${size});`
      )
      expect(utilitiesCss).toContain(
        `padding-bottom: var(--sp-layout-hero-padding-bottom-${size});`
      )
    }
  })
})

describe('footer appearance option', () => {
  it('keeps dark as the unchanged default', () => {
    expect(getFooterClasses()).toBe('sp-footer')
    expect(getFooterClasses({ appearance: 'dark' })).toBe('sp-footer')
  })

  it('emits light and system modifiers', () => {
    expect(getFooterClasses({ appearance: 'light' })).toBe('sp-footer sp-footer--light')
    expect(getFooterClasses({ appearance: 'system' })).toBe('sp-footer sp-footer--system')
  })

  it('switches every footer role and accent color to the light palette', () => {
    const roles = ['bg', 'text', 'heading', 'muted', 'link', 'link-hover', 'border', 'divider', 'chip-bg']
    const accents = ['neutral', 'brand', 'info', 'success', 'warning', 'danger', 'cta']
    const lightBlock = componentsCss.slice(
      componentsCss.indexOf('.sp-footer--light {'),
      componentsCss.indexOf('.sp-footer--system {')
    )
    for (const role of roles) {
      expect(lightBlock).toContain(
        `--sp-component-footer-${role}: var(--sp-footer-light-${role});`
      )
    }
    for (const accent of accents) {
      expect(lightBlock).toContain(
        `--sp-component-footer-accent-${accent}: var(--sp-footer-light-accent-${accent});`
      )
      expect(componentsCss).toContain(
        `--sp-component-footer-accent-color: var(--sp-component-footer-accent-${accent});`
      )
    }
    expect(componentsCss).toMatch(
      /@media \(prefers-color-scheme: light\) \{\s*\.sp-footer--system \{/
    )
  })
})

describe('element-scoped color modes', () => {
  it('declares component variables on every themed element, not only :root', () => {
    expect(componentsCss).toContain(':where(:root, [data-spectre-theme]) {')
    expect(componentsCss).toContain(':where([data-spectre-theme="dark"]) {')
    expect(componentsCss).toMatch(
      /@media \(prefers-color-scheme: dark\) \{\s*:where\(\[data-spectre-theme="system"\]\) \{/
    )
    expect(componentsCss).not.toContain(':where(:root[data-spectre-theme="dark"])')
  })

  it('re-declares inherited caret and scrollbar colors on themed elements', () => {
    expect(baseCss).toContain(':where(html, [data-spectre-theme]) {')
    expect(baseCss).toContain('caret-color: var(--sp-caret-color);')
    expect(baseCss).toContain(
      'scrollbar-color: var(--sp-scrollbar-thumb) var(--sp-scrollbar-track);'
    )
    expect(baseCss).toContain('background-color: var(--sp-selection-bg);')
  })
})

describe('control sizing', () => {
  it('sizes buttons, inputs, and selects from control tokens per size', () => {
    for (const component of ['btn', 'input', 'select']) {
      for (const size of ['sm', 'md', 'lg']) {
        const start = componentsCss.indexOf(`.sp-${component}--${size} {`)
        const block = componentsCss.slice(start, componentsCss.indexOf('}', start))
        expect(block).toContain(`--sp-component-control-height: var(--sp-control-${size}-height);`)
        expect(block).toContain(`var(--sp-control-${size}-padding-inline)`)
      }
    }
  })
})

describe('getSkeletonClasses', () => {
  it('defaults to a static text line', () => {
    expect(getSkeletonClasses()).toBe('sp-skeleton sp-skeleton--text')
  })

  it('emits shape and animation modifiers', () => {
    expect(getSkeletonClasses({ shape: 'circle', animated: true })).toBe(
      'sp-skeleton sp-skeleton--circle sp-skeleton--animated'
    )
  })

  it('stops the shimmer under reduced motion', () => {
    expect(componentsCss).toMatch(
      /@media \(prefers-reduced-motion: reduce\) \{\s*\.sp-skeleton--animated \{\s*animation: none;/
    )
  })
})

describe('generated chart and elevation utilities', () => {
  it('emits fill and stroke utilities for chart roles', () => {
    expect(generatedCss).toContain('.sp-fill-chart-series-1 {')
    expect(generatedCss).toContain('stroke: var(--sp-chart-diverging-7);')
    expect(generatedCss.match(/\.sp-bg-chart-bg \{/g)).toHaveLength(1)
  })

  it('pairs shadow, surface, and z-index in each elevation level', () => {
    for (const level of ['flat', 'raised', 'overlay', 'modal']) {
      expect(generatedCss).toContain(`.sp-elevation-${level} {`)
      expect(generatedCss).toContain(`z-index: var(--sp-elevation-${level}-z-index);`)
    }
  })
})
