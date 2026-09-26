import { describe, expect, it } from 'vitest'
import {
  getAccordionClasses,
  getAccordionHeaderClasses,
  getAccordionIconClasses,
  getAccordionItemClasses,
  getAccordionPanelClasses
} from '@phcdevworks/spectre-ui'
import {
  componentsCss,
  expectRecipeClassesStyled,
  expectTokenizedClassString
} from './support/component-css'

describe('getAccordionClasses', () => {
  it('returns the base class and the flush modifier', () => {
    expect(getAccordionClasses()).toBe('sp-accordion')
    expect(getAccordionClasses({ flush: true })).toBe(
      'sp-accordion sp-accordion--flush'
    )
  })
})

describe('accordion sub-elements', () => {
  it('adds expanded and disabled modifiers only when requested', () => {
    expect(getAccordionItemClasses()).toBe('sp-accordion__item')
    expect(getAccordionItemClasses({ expanded: true })).toBe(
      'sp-accordion__item sp-accordion__item--expanded'
    )
    expect(getAccordionIconClasses({ expanded: true })).toBe(
      'sp-accordion__icon sp-accordion__icon--expanded'
    )
    expect(getAccordionPanelClasses({ expanded: true })).toBe(
      'sp-accordion__panel sp-accordion__panel--expanded'
    )
  })

  it('supports every header state', () => {
    const result = getAccordionHeaderClasses({
      expanded: true,
      disabled: true,
      hovered: true,
      focused: true
    })
    expect(result).toContain('sp-accordion__header--expanded')
    expect(result).toContain('sp-accordion__header--focus')
    expectTokenizedClassString(result)
  })
})

describe('accordion CSS contract', () => {
  it('styles every class the recipes emit', () => {
    expectRecipeClassesStyled([
      getAccordionClasses({ flush: true }),
      getAccordionItemClasses({ expanded: true, disabled: true }),
      getAccordionHeaderClasses({
        expanded: true,
        disabled: true,
        hovered: true,
        focused: true
      }),
      getAccordionIconClasses({ expanded: true }),
      getAccordionPanelClasses({ expanded: true })
    ])
  })

  it('expands natively from a <details open> item', () => {
    expect(componentsCss).toContain(
      '.sp-accordion__item[open] > .sp-accordion__panel'
    )
  })
})
