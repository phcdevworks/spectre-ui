import { describe, expect, it } from 'vitest'
import {
  getTableClasses,
  getTableRowClasses,
  getTableWrapperClasses
} from '@phcdevworks/spectre-ui'
import {
  expectRecipeClassesStyled,
  expectTokenizedClassString
} from './support/component-css'

const ROW_VARIANTS = [
  'neutral',
  'info',
  'success',
  'warning',
  'danger'
] as const

describe('getTableClasses', () => {
  it('defaults to the md size with no modifiers', () => {
    expect(getTableClasses()).toBe('sp-table sp-table--md')
  })

  it('supports the sm size and every flag', () => {
    const result = getTableClasses({
      size: 'sm',
      striped: true,
      hoverable: true,
      bordered: true
    })
    expect(result).toBe(
      'sp-table sp-table--sm sp-table--striped sp-table--hover sp-table--bordered'
    )
    expectTokenizedClassString(result)
  })
})

describe('getTableRowClasses', () => {
  it('renders a plain row when no variant is given', () => {
    expect(getTableRowClasses()).toBe('sp-table__row')
  })

  it('supports every contextual row variant and the selected flag', () => {
    for (const variant of ROW_VARIANTS) {
      expect(getTableRowClasses({ variant, selected: true })).toBe(
        `sp-table__row sp-table__row--${variant} sp-table__row--selected`
      )
    }
  })

  it('returns the wrapper class', () => {
    expect(getTableWrapperClasses()).toBe('sp-table-wrapper')
  })
})

describe('table CSS contract', () => {
  it('styles every class the recipes emit', () => {
    expectRecipeClassesStyled([
      getTableClasses({
        size: 'sm',
        striped: true,
        hoverable: true,
        bordered: true
      }),
      getTableClasses({ size: 'md' }),
      getTableWrapperClasses(),
      ...ROW_VARIANTS.map((variant) =>
        getTableRowClasses({ variant, selected: true })
      )
    ])
  })
})
