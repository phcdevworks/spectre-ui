import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  getChartColorClasses,
  getDividerClasses,
  getElevationClasses,
  getLinkClasses,
  getMotionClasses,
  getSurfaceClasses,
  getTextClasses,
  type ChartColor
} from '@phcdevworks/spectre-ui'

// Framework adapters (spectre-ui-astro, spectre-components) can only wrap
// recipes, so every token-backed class family must be reachable through one.
// Each case asserts the recipe output and that the class exists in the CSS.

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const stylesDir = path.join(__dirname, '..', 'src', 'styles')
const css = fs
  .readdirSync(stylesDir)
  .filter((fileName) => fileName.endsWith('.css'))
  .map((fileName) => fs.readFileSync(path.join(stylesDir, fileName), 'utf8'))
  .join('\n')

const expectClassesInCss = (classes: string): void => {
  for (const name of classes.split(' ')) {
    expect(css, `.${name} must exist in src/styles`).toMatch(
      new RegExp(`\\.${name.replace(/[-]/g, '\\-')}[\\s{:.,]`)
    )
  }
}

describe('text typography axes', () => {
  it('reaches tracking, decoration, offset, tabular numerals, and balance', () => {
    const classes = getTextClasses({
      tracking: 'wide',
      decoration: 'thick',
      underlineOffset: 'lg',
      tabularNums: true,
      balance: true
    })
    expect(classes).toBe(
      'sp-text sp-text--md sp-text--default sp-tracking-wide sp-decoration-thick sp-underline-offset-lg sp-tabular-nums sp-text-balance'
    )
    expectClassesInCss(classes)
  })

  it('reaches every published tracking step', () => {
    for (const step of ['tightest', 'tighter', 'tight', 'normal', 'wide', 'wider', 'widest'] as const) {
      expectClassesInCss(getTextClasses({ tracking: step }))
    }
  })
})

describe('getLinkClasses', () => {
  it('emits the link role and its on-inverse tone', () => {
    expect(getLinkClasses()).toBe('sp-link')
    expect(getLinkClasses({ tone: 'onInverse', decoration: 'base', underlineOffset: 'sm' })).toBe(
      'sp-link sp-link--on-inverse sp-decoration-base sp-underline-offset-sm'
    )
    expectClassesInCss(getLinkClasses({ tone: 'onInverse', decoration: 'base', underlineOffset: 'sm' }))
  })
})

describe('getSurfaceClasses', () => {
  it('reaches every surface role and interaction state', () => {
    for (const surface of ['page', 'card', 'subtle', 'overlay', 'input', 'inverse', 'hero'] as const) {
      expectClassesInCss(getSurfaceClasses({ surface }))
    }
    expect(getSurfaceClasses({ surface: 'card', hover: true, selected: true, active: true })).toBe(
      'sp-bg-surface-card sp-surface--hover sp-surface--selected sp-surface--active'
    )
    expectClassesInCss(getSurfaceClasses({ hover: true, selected: true, active: true }))
  })
})

describe('getDividerClasses', () => {
  it('emits the divider rule', () => {
    expect(getDividerClasses()).toBe('sp-divider')
    expectClassesInCss(getDividerClasses())
  })
})

describe('getElevationClasses', () => {
  it('reaches every elevation level', () => {
    expect(getElevationClasses()).toBe('sp-elevation-flat')
    for (const level of ['flat', 'raised', 'overlay', 'modal'] as const) {
      expectClassesInCss(getElevationClasses({ level }))
    }
  })
})

describe('getChartColorClasses', () => {
  it('maps each property to its chart color utility', () => {
    expect(getChartColorClasses({ fill: 'series-1', stroke: 'axis' })).toBe(
      'sp-fill-chart-series-1 sp-stroke-chart-axis'
    )
    expect(getChartColorClasses()).toBe('')
  })

  it('reaches every published chart role on every property', () => {
    const tokensCss = fs.readFileSync(
      path.join(__dirname, '..', 'node_modules', '@phcdevworks', 'spectre-tokens', 'dist', 'index.css'),
      'utf8'
    )
    const roles = [...new Set(Array.from(tokensCss.matchAll(/--sp-chart-([a-z0-9-]+):/g), (m) => m[1]))]
    expect(roles.length).toBeGreaterThan(0)
    for (const role of roles) {
      const color = role as ChartColor
      expectClassesInCss(
        getChartColorClasses({ fill: color, stroke: color, bg: color, text: color, border: color })
      )
    }
  })
})

describe('getMotionClasses', () => {
  it('reaches animations, transitions, durations, and easings', () => {
    expect(getMotionClasses({ animation: 'fadeIn', transition: 'colors', duration: 'slow', easing: 'spring' })).toBe(
      'sp-animate-fade-in sp-transition-colors sp-duration-slow sp-ease-spring'
    )
    for (const animation of ['fadeIn', 'fadeOut', 'slideUp', 'slideDown', 'scaleIn', 'bounce', 'pulse', 'shake'] as const) {
      expectClassesInCss(getMotionClasses({ animation }))
    }
    for (const transition of ['all', 'colors', 'opacity', 'transform', 'none'] as const) {
      expectClassesInCss(getMotionClasses({ transition }))
    }
    for (const duration of ['instant', 'fast', 'base', 'moderate', 'relaxed', 'slow', 'slower', 'slowest', 'long', 'reduced'] as const) {
      expectClassesInCss(getMotionClasses({ duration }))
    }
    for (const easing of ['linear', 'in', 'out', 'inout', 'spring', 'overshoot'] as const) {
      expectClassesInCss(getMotionClasses({ easing }))
    }
  })
})
