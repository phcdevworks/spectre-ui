import { describe, expect, it } from 'vitest'
import {
  getListGroupClasses,
  getListGroupItemClasses,
  getListGroupItemHeadingClasses,
  getListGroupItemTextClasses
} from '@phcdevworks/spectre-ui'
import {
  expectRecipeClassesStyled,
  expectTokenizedClassString
} from './support/component-css'

const ACCENT_EDGES = ['top', 'right', 'bottom', 'left'] as const
const ACCENT_COLORS = [
  'neutral',
  'brand',
  'info',
  'success',
  'warning',
  'danger',
  'cta'
] as const

describe('getListGroupClasses', () => {
  it('returns the base class with no options', () => {
    expect(getListGroupClasses()).toBe('sp-list-group')
  })

  it('supports the flush and horizontal flags', () => {
    expect(getListGroupClasses({ flush: true, horizontal: true })).toBe(
      'sp-list-group sp-list-group--flush sp-list-group--horizontal'
    )
  })

  it('defaults the accent color to brand when only an edge is set', () => {
    expect(getListGroupClasses({ accent: 'left' })).toBe(
      'sp-list-group sp-list-group--accent-left sp-list-group--accent-brand'
    )
  })
})

describe('getListGroupItemClasses', () => {
  it('adds state modifiers only when requested', () => {
    expect(getListGroupItemClasses()).toBe('sp-list-group__item')
    const result = getListGroupItemClasses({
      interactive: true,
      active: true,
      selected: true,
      disabled: true,
      hovered: true,
      focused: true
    })
    expect(result).toContain('sp-list-group__item--selected')
    expectTokenizedClassString(result)
  })
})

describe('list group CSS contract', () => {
  it('styles every class the recipes emit', () => {
    expectRecipeClassesStyled([
      getListGroupClasses({ flush: true, horizontal: true }),
      ...ACCENT_EDGES.flatMap((accent) =>
        ACCENT_COLORS.map((accentColor) =>
          getListGroupClasses({ accent, accentColor })
        )
      ),
      getListGroupItemClasses({
        interactive: true,
        active: true,
        selected: true,
        disabled: true,
        hovered: true,
        focused: true
      }),
      getListGroupItemHeadingClasses(),
      getListGroupItemTextClasses()
    ])
  })
})
