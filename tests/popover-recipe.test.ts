import { describe, expect, it } from 'vitest'
import {
  getPopoverArrowClasses,
  getPopoverBodyClasses,
  getPopoverClasses,
  getPopoverHeaderClasses
} from '@phcdevworks/spectre-ui'
import { expectRecipeClassesStyled } from './support/component-css'

const PLACEMENTS = ['top', 'bottom', 'left', 'right'] as const

describe('getPopoverClasses', () => {
  it('defaults to the top placement, closed', () => {
    expect(getPopoverClasses()).toBe('sp-popover sp-popover--top')
  })

  it('supports every placement and the open flag', () => {
    for (const placement of PLACEMENTS) {
      expect(getPopoverClasses({ placement, open: true })).toBe(
        `sp-popover sp-popover--${placement} sp-popover--open`
      )
    }
  })

  it('returns the sub-element classes', () => {
    expect(getPopoverHeaderClasses()).toBe('sp-popover__header')
    expect(getPopoverBodyClasses()).toBe('sp-popover__body')
    expect(getPopoverArrowClasses()).toBe('sp-popover__arrow')
  })
})

describe('popover CSS contract', () => {
  it('styles every class the recipes emit', () => {
    expectRecipeClassesStyled([
      ...PLACEMENTS.map((placement) =>
        getPopoverClasses({ placement, open: true })
      ),
      getPopoverHeaderClasses(),
      getPopoverBodyClasses(),
      getPopoverArrowClasses()
    ])
  })
})
