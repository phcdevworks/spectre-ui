import { describe, expect, it } from 'vitest'
import {
  getPaginationClasses,
  getPaginationEllipsisClasses,
  getPaginationItemClasses
} from '@phcdevworks/spectre-ui'
import {
  expectRecipeClassesStyled,
  expectTokenizedClassString
} from './support/component-css'

const SIZES = ['sm', 'md', 'lg'] as const

describe('getPaginationClasses', () => {
  it('defaults to the md size', () => {
    expect(getPaginationClasses()).toBe('sp-pagination sp-pagination--md')
  })

  it('supports every size', () => {
    for (const size of SIZES) {
      expect(getPaginationClasses({ size })).toBe(
        `sp-pagination sp-pagination--${size}`
      )
    }
  })
})

describe('getPaginationItemClasses', () => {
  it('adds state modifiers only when requested', () => {
    expect(getPaginationItemClasses()).toBe('sp-pagination__item')
    const result = getPaginationItemClasses({
      active: true,
      disabled: true,
      hovered: true,
      focused: true
    })
    expect(result).toContain('sp-pagination__item--active')
    expect(result).toContain('sp-pagination__item--disabled')
    expectTokenizedClassString(result)
  })

  it('returns the ellipsis class', () => {
    expect(getPaginationEllipsisClasses()).toBe('sp-pagination__ellipsis')
  })
})

describe('pagination CSS contract', () => {
  it('styles every class the recipes emit', () => {
    expectRecipeClassesStyled([
      ...SIZES.map((size) => getPaginationClasses({ size })),
      getPaginationItemClasses({
        active: true,
        disabled: true,
        hovered: true,
        focused: true
      }),
      getPaginationEllipsisClasses()
    ])
  })
})
