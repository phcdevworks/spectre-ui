import { describe, expect, it } from 'vitest'
import {
  getStepperClasses,
  getStepperIndicatorClasses,
  getStepperLabelClasses,
  getStepperStepClasses
} from '@phcdevworks/spectre-ui'
import { expectRecipeClassesStyled } from './support/component-css'

const STATES = ['pending', 'active', 'done'] as const

describe('getStepperClasses', () => {
  it('defaults to the horizontal orientation', () => {
    expect(getStepperClasses()).toBe('sp-stepper sp-stepper--horizontal')
    expect(getStepperClasses({ orientation: 'vertical' })).toBe(
      'sp-stepper sp-stepper--vertical'
    )
  })
})

describe('stepper sub-elements', () => {
  it('defaults a step to the pending state', () => {
    expect(getStepperStepClasses()).toBe(
      'sp-stepper__step sp-stepper__step--pending'
    )
  })

  it('supports every step state', () => {
    for (const state of STATES) {
      expect(getStepperStepClasses({ state })).toBe(
        `sp-stepper__step sp-stepper__step--${state}`
      )
    }
  })

  it('returns the indicator and label classes', () => {
    expect(getStepperIndicatorClasses()).toBe('sp-stepper__indicator')
    expect(getStepperLabelClasses()).toBe('sp-stepper__label')
  })
})

describe('stepper CSS contract', () => {
  it('styles every class the recipes emit', () => {
    expectRecipeClassesStyled([
      getStepperClasses({ orientation: 'horizontal' }),
      getStepperClasses({ orientation: 'vertical' }),
      ...STATES.map((state) => getStepperStepClasses({ state })),
      getStepperIndicatorClasses(),
      getStepperLabelClasses()
    ])
  })
})
