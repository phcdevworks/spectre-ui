import { describe, expect, it } from 'vitest'
import { getRangeClasses } from '@phcdevworks/spectre-ui'
import {
  componentsCss,
  expectRecipeClassesStyled
} from './support/component-css'

describe('getRangeClasses', () => {
  it('returns the base class with no options', () => {
    expect(getRangeClasses()).toBe('sp-range')
  })

  it('supports the forced disabled and focus states', () => {
    expect(getRangeClasses({ disabled: true, focused: true })).toBe(
      'sp-range sp-range--disabled sp-range--focus is-focus'
    )
  })
})

describe('range CSS contract', () => {
  it('styles every class the recipe emits', () => {
    expectRecipeClassesStyled([getRangeClasses({ disabled: true, focused: true })])
  })

  it('styles both engine track and thumb pseudo-elements', () => {
    for (const pseudo of [
      '::-webkit-slider-runnable-track',
      '::-webkit-slider-thumb',
      '::-moz-range-track',
      '::-moz-range-progress',
      '::-moz-range-thumb'
    ]) {
      expect(componentsCss).toContain(`.sp-range${pseudo}`)
    }
  })
})
