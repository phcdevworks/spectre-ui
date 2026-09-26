import { describe, expect, it } from 'vitest'
import {
  getDropdownDividerClasses,
  getDropdownHeaderClasses,
  getDropdownItemClasses,
  getToastClasses,
  getToastIconClasses
} from '@phcdevworks/spectre-ui'
import {
  componentsCss,
  expectRecipeClassesStyled
} from './support/component-css'

describe('dropdown header, divider, and selected item', () => {
  it('returns the new anatomy classes and selected modifier', () => {
    expect(getDropdownHeaderClasses()).toBe('sp-dropdown__header')
    expect(getDropdownDividerClasses()).toBe('sp-dropdown__divider')
    expect(getDropdownItemClasses({ selected: true })).toBe(
      'sp-dropdown__item sp-dropdown__item--selected'
    )
  })

  it('styles the new classes from the published dropdown tokens', () => {
    expectRecipeClassesStyled([
      getDropdownHeaderClasses(),
      getDropdownDividerClasses(),
      getDropdownItemClasses({ selected: true, disabled: true })
    ])
    for (const token of [
      '--sp-dropdown-header',
      '--sp-dropdown-divider',
      '--sp-dropdown-item-selected-bg',
      '--sp-dropdown-item-selected-text',
      '--sp-dropdown-item-disabled-text'
    ]) {
      expect(componentsCss).toContain(`var(${token})`)
    }
  })
})

describe('toast neutral variant', () => {
  it('supports the neutral variant on the toast and its icon', () => {
    expect(getToastClasses({ variant: 'neutral' })).toContain('sp-toast--neutral')
    expect(getToastIconClasses({ variant: 'neutral' })).toBe(
      'sp-toast__icon sp-toast__icon--neutral'
    )
    expectRecipeClassesStyled([
      getToastClasses({ variant: 'neutral' }),
      getToastIconClasses({ variant: 'neutral' })
    ])
  })
})
