import { describe, expect, it } from 'vitest'
import {
  getInputGroupAddonClasses,
  getInputGroupClasses
} from '@phcdevworks/spectre-ui'
import { expectRecipeClassesStyled } from './support/component-css'

describe('input group recipes', () => {
  it('returns the group class and disabled modifier', () => {
    expect(getInputGroupClasses()).toBe('sp-input-group')
    expect(getInputGroupClasses({ disabled: true })).toBe(
      'sp-input-group sp-input-group--disabled'
    )
  })

  it('returns the addon class', () => {
    expect(getInputGroupAddonClasses()).toBe('sp-input-group__addon')
  })

  it('styles every class the recipes emit', () => {
    expectRecipeClassesStyled([
      getInputGroupClasses({ disabled: true }),
      getInputGroupAddonClasses()
    ])
  })
})
