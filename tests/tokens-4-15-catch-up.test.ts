import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import postcss from 'postcss'
import { describe, expect, it } from 'vitest'
import {
  getButtonClasses,
  getFooterClasses,
  getQuoteClasses,
  getStatClasses
} from '@phcdevworks/spectre-ui'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const componentsRoot = postcss.parse(
  fs.readFileSync(
    path.join(__dirname, '..', 'src', 'styles', 'components.css'),
    'utf8'
  )
)

const declsFor = (selector: string): Record<string, string> => {
  const decls: Record<string, string> = {}
  let found = false
  componentsRoot.walkRules((rule) => {
    if (!rule.selectors.map((s) => s.trim()).includes(selector)) return
    found = true
    rule.walkDecls((decl) => {
      decls[decl.prop] = decl.value
    })
  })
  expect(found, `no rule for ${selector}`).toBe(true)
  return decls
}

// spectre-tokens 4.15.0 `action.*`: the theme-selectable action colour.
describe('action button variant', () => {
  it('emits sp-btn--action', () => {
    expect(getButtonClasses({ variant: 'action' })).toBe(
      'sp-btn sp-btn--action sp-btn--md'
    )
  })

  it('paints every state from the action roles', () => {
    expect(declsFor('.sp-btn--action')).toEqual({
      'background-color': 'var(--sp-action-bg)',
      color: 'var(--sp-action-text)'
    })
    expect(declsFor('.sp-btn--action:hover')['background-color']).toBe(
      'var(--sp-action-bg-hover)'
    )
    expect(declsFor('.sp-btn--action:active')['background-color']).toBe(
      'var(--sp-action-bg-active)'
    )
    expect(declsFor('.sp-btn--action:focus-visible')['box-shadow']).toContain(
      'var(--sp-action-focus-ring)'
    )
  })
})

describe('action stat unit tone', () => {
  it('emits the unit tone only when it is not the accent default', () => {
    expect(getStatClasses()).toBe('sp-stat sp-stat--md')
    expect(getStatClasses({ unitTone: 'action' })).toBe(
      'sp-stat sp-stat--md sp-stat--unit-action'
    )
    expect(getStatClasses({ unitTone: 'action', surface: 'surface' })).toBe(
      'sp-stat sp-stat--md sp-stat--on-surface sp-stat--unit-action'
    )
  })

  it('uses action.onPage, action.onSurface, and keeps the inverse accent', () => {
    expect(declsFor('.sp-stat--unit-action')).toEqual({
      '--sp-component-stat-unit': 'var(--sp-action-on-page)'
    })
    expect(declsFor('.sp-stat--on-surface.sp-stat--unit-action')).toEqual({
      '--sp-component-stat-unit': 'var(--sp-action-on-surface)'
    })
    expect(declsFor('.sp-stat--on-inverse.sp-stat--unit-action')).toEqual({
      '--sp-component-stat-unit': 'var(--sp-text-on-inverse-accent)'
    })
  })
})

describe('action quote rail tone', () => {
  it('emits the action tone with the rail', () => {
    expect(getQuoteClasses({ accentColor: 'action' })).toBe(
      'sp-quote sp-quote--md sp-quote--accent-edge sp-quote--accent-action'
    )
  })

  it('colours the rail and mark from action.rail', () => {
    expect(declsFor('.sp-quote--accent-action')).toEqual({
      '--sp-component-quote-accent-color': 'var(--sp-action-rail)',
      '--sp-component-quote-mark-color': 'var(--sp-action-rail)'
    })
  })
})

// 4.15.0 makes --sp-heading-* and --sp-display-* mobile first. Presets must
// read the role so they shrink with it, not pin a font-scale step.
describe('heading and display presets follow the adaptive roles', () => {
  for (const level of [1, 2, 3, 4, 5, 6]) {
    it(`.sp-heading--h${level} reads --sp-heading-h${level}-size`, () => {
      expect(declsFor(`.sp-heading--h${level}`)['font-size']).toBe(
        `var(--sp-heading-h${level}-size)`
      )
    })
    it(`.sp-display--${level} reads --sp-display-${level}-size`, () => {
      expect(declsFor(`.sp-display--${level}`)['font-size']).toBe(
        `var(--sp-display-${level}-size)`
      )
    })
  }
})

describe('action footer surface', () => {
  it('emits the action surface', () => {
    expect(getFooterClasses({ surface: 'action' })).toBe(
      'sp-footer sp-footer--surface-action'
    )
  })

  it('paints action.bg and puts every text role on action.text', () => {
    const decls = declsFor('.sp-footer--surface-action')
    expect(decls['--sp-component-footer-bg']).toBe('var(--sp-action-bg)')
    for (const role of ['text', 'heading', 'muted', 'link', 'link-hover']) {
      expect(decls[`--sp-component-footer-${role}`]).toBe('var(--sp-action-text)')
    }
    expect(declsFor('.sp-footer--surface-action .sp-footer__link:hover')).toEqual(
      { 'text-decoration': 'underline' }
    )
  })
})
