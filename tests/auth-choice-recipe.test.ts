import { describe, expect, it } from 'vitest'
import {
  getChoiceCardClasses,
  getExternalAuthButtonClasses,
  getExternalAuthButtonIconClasses
} from '@phcdevworks/spectre-ui'
import {
  componentsCss,
  expectRecipeClassesStyled,
  expectTokenizedClassString
} from './support/component-css'

describe('getExternalAuthButtonClasses', () => {
  it('returns the base class with no options', () => {
    expect(getExternalAuthButtonClasses()).toBe('sp-external-auth-btn')
    expect(getExternalAuthButtonIconClasses()).toBe('sp-external-auth-btn__icon')
  })

  it('supports every flag', () => {
    const result = getExternalAuthButtonClasses({
      fullWidth: true,
      disabled: true,
      loading: true,
      hovered: true,
      focused: true,
      active: true
    })
    expect(result).toContain('sp-external-auth-btn--full')
    expectTokenizedClassString(result)
  })

  it('styles every class the recipes emit', () => {
    expectRecipeClassesStyled([
      getExternalAuthButtonClasses({
        fullWidth: true,
        disabled: true,
        loading: true,
        hovered: true,
        focused: true,
        active: true
      }),
      getExternalAuthButtonIconClasses()
    ])
  })
})

describe('getChoiceCardClasses', () => {
  it('returns the base class with no options', () => {
    expect(getChoiceCardClasses()).toBe('sp-choice-card')
  })

  it('supports every forced state', () => {
    const result = getChoiceCardClasses({
      selected: true,
      disabled: true,
      hovered: true,
      focused: true
    })
    expect(result).toContain('sp-choice-card--selected')
    expectTokenizedClassString(result)
  })

  it('styles every class the recipe emits and follows a wrapped native input', () => {
    expectRecipeClassesStyled([
      getChoiceCardClasses({
        selected: true,
        disabled: true,
        hovered: true,
        focused: true
      })
    ])
    expect(componentsCss).toContain('.sp-choice-card:has(:checked)')
    expect(componentsCss).toContain('.sp-choice-card:has(:disabled)')
  })
})
