import { describe, expect, it } from 'vitest'
import {
  getBreadcrumbClasses,
  getBreadcrumbItemClasses,
  getBreadcrumbLinkClasses,
  getBreadcrumbSeparatorClasses
} from '@phcdevworks/spectre-ui'
import { expectRecipeClassesStyled } from './support/component-css'

describe('getBreadcrumbClasses', () => {
  it('returns the base class and the custom separator opt-out', () => {
    expect(getBreadcrumbClasses()).toBe('sp-breadcrumb')
    expect(getBreadcrumbClasses({ customSeparator: true })).toBe(
      'sp-breadcrumb sp-breadcrumb--custom-separator'
    )
  })
})

describe('breadcrumb sub-elements', () => {
  it('marks the current item only when requested', () => {
    expect(getBreadcrumbItemClasses()).toBe('sp-breadcrumb__item')
    expect(getBreadcrumbItemClasses({ current: true })).toBe(
      'sp-breadcrumb__item sp-breadcrumb__item--current'
    )
    expect(getBreadcrumbLinkClasses()).toBe('sp-breadcrumb__link')
    expect(getBreadcrumbSeparatorClasses()).toBe('sp-breadcrumb__separator')
  })
})

describe('breadcrumb CSS contract', () => {
  it('styles every class the recipes emit', () => {
    expectRecipeClassesStyled([
      getBreadcrumbClasses({ customSeparator: true }),
      getBreadcrumbItemClasses({ current: true }),
      getBreadcrumbLinkClasses(),
      getBreadcrumbSeparatorClasses()
    ])
  })
})
