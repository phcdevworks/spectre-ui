import { describe, expect, it } from 'vitest'
import {
  getTabsClasses,
  getTabsItemClasses,
  getTabsListClasses,
  getTabsPanelClasses
} from '@phcdevworks/spectre-ui'
import {
  expectRecipeClassesStyled,
  expectTokenizedClassString
} from './support/component-css'

describe('getTabsClasses', () => {
  it('defaults to the line variant', () => {
    expect(getTabsClasses()).toBe('sp-tabs sp-tabs--line')
  })

  it('supports the pill variant and layout flags', () => {
    const result = getTabsClasses({
      variant: 'pill',
      vertical: true,
      fullWidth: true
    })
    expect(result).toBe('sp-tabs sp-tabs--pill sp-tabs--vertical sp-tabs--full')
    expectTokenizedClassString(result)
  })

  it('rejects unknown variants outside production', () => {
    expect(() =>
      getTabsClasses({ variant: 'bogus' as never })
    ).toThrow('[spectre-ui] Unknown tabs variant: bogus')
  })
})

describe('tabs sub-elements', () => {
  it('returns the list and panel classes', () => {
    expect(getTabsListClasses()).toBe('sp-tabs__list')
    expect(getTabsPanelClasses()).toBe('sp-tabs__panel')
  })

  it('adds item state modifiers only when requested', () => {
    expect(getTabsItemClasses()).toBe('sp-tabs__item')
    const result = getTabsItemClasses({
      active: true,
      disabled: true,
      hovered: true,
      focused: true
    })
    expect(result).toContain('sp-tabs__item--active')
    expect(result).toContain('sp-tabs__item--disabled')
    expectTokenizedClassString(result)
  })
})

describe('tabs CSS contract', () => {
  it('styles every class the recipes emit', () => {
    expectRecipeClassesStyled([
      getTabsClasses({ variant: 'line', vertical: true, fullWidth: true }),
      getTabsClasses({ variant: 'pill' }),
      getTabsListClasses(),
      getTabsItemClasses({
        active: true,
        disabled: true,
        hovered: true,
        focused: true
      }),
      getTabsPanelClasses()
    ])
  })
})
