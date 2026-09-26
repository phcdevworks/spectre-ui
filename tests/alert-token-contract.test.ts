import { describe, expect, it } from 'vitest'
import {
  getAlertClasses,
  getAlertDismissClasses,
  getAlertIconClasses
} from '@phcdevworks/spectre-ui'
import {
  componentsCss,
  expectRecipeClassesStyled
} from './support/component-css'

const ROLES = ['info', 'success', 'warning', 'danger', 'neutral', 'brand'] as const

describe('alert brand role and dismissible anatomy', () => {
  it('supports the brand variant and the dismissible flag', () => {
    expect(getAlertClasses({ variant: 'brand', dismissible: true })).toBe(
      'sp-alert sp-alert--brand sp-alert--md sp-alert--dismissible'
    )
    expect(getAlertIconClasses()).toBe('sp-alert__icon')
    expect(getAlertDismissClasses()).toBe('sp-alert__dismiss')
  })

  it('styles every class the recipes emit', () => {
    expectRecipeClassesStyled([
      ...ROLES.map((variant) => getAlertClasses({ variant, dismissible: true })),
      getAlertIconClasses(),
      getAlertDismissClasses()
    ])
  })

  it('sources every role from the mode-aware component.alert tokens', () => {
    for (const role of ROLES) {
      for (const field of ['bg', 'text', 'border', 'icon']) {
        expect(componentsCss).toContain(
          `--sp-component-alert-${role}-${field}: var(--sp-alert-${role}-${field});`
        )
      }
    }
  })
})
