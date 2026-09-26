import { describe, expect, it } from 'vitest'
import {
  getProgressBarClasses,
  getProgressClasses,
  getProgressLabelClasses
} from '@phcdevworks/spectre-ui'
import { expectRecipeClassesStyled } from './support/component-css'

const SIZES = ['sm', 'md', 'lg'] as const
const VARIANTS = [
  'brand',
  'neutral',
  'info',
  'success',
  'warning',
  'danger'
] as const

describe('getProgressClasses', () => {
  it('defaults to the md track size', () => {
    expect(getProgressClasses()).toBe('sp-progress sp-progress--md')
  })

  it('supports every size', () => {
    for (const size of SIZES) {
      expect(getProgressClasses({ size })).toBe(
        `sp-progress sp-progress--${size}`
      )
    }
  })
})

describe('getProgressBarClasses', () => {
  it('defaults to the brand indicator', () => {
    expect(getProgressBarClasses()).toBe(
      'sp-progress__bar sp-progress__bar--brand'
    )
  })

  it('supports every indicator role and the indeterminate flag', () => {
    for (const variant of VARIANTS) {
      expect(getProgressBarClasses({ variant, indeterminate: true })).toBe(
        `sp-progress__bar sp-progress__bar--${variant} sp-progress__bar--indeterminate`
      )
    }
  })

  it('returns the label class', () => {
    expect(getProgressLabelClasses()).toBe('sp-progress__label')
  })
})

describe('progress CSS contract', () => {
  it('styles every class the recipes emit', () => {
    expectRecipeClassesStyled([
      ...SIZES.map((size) => getProgressClasses({ size })),
      ...VARIANTS.map((variant) =>
        getProgressBarClasses({ variant, indeterminate: true })
      ),
      getProgressLabelClasses()
    ])
  })
})
