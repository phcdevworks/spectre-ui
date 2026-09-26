import { describe, expect, it } from 'vitest'
import { getSpinnerClasses } from '@phcdevworks/spectre-ui'
import {
  componentsCss,
  expectRecipeClassesStyled
} from './support/component-css'

describe('spinner loading-indicator alignment', () => {
  it('supports the inverse variant for on-dark surfaces', () => {
    expect(getSpinnerClasses({ variant: 'inverse' })).toContain(
      'sp-spinner--inverse'
    )
    expectRecipeClassesStyled([getSpinnerClasses({ variant: 'inverse' })])
  })

  it('sources semantic arcs from the component.loadingIndicator tokens', () => {
    const mapping = {
      primary: 'brand',
      secondary: 'muted',
      neutral: 'default',
      info: 'info',
      success: 'success',
      warning: 'warning',
      danger: 'danger',
      inverse: 'inverse'
    }

    for (const [variant, role] of Object.entries(mapping)) {
      expect(componentsCss).toContain(
        `--sp-component-spinner-${variant}-arc: var(--sp-loading-indicator-${role});`
      )
    }
  })
})
