import { describe, expect, it } from 'vitest'
import { getButtonClasses } from '@phcdevworks/spectre-ui'
import {
  componentsCss,
  expectRecipeClassesStyled
} from './support/component-css'

const NEW_VARIANTS = ['warning', 'link', 'light', 'dark'] as const

describe('button warning/link/light/dark variants', () => {
  it('emits a modifier for each new variant', () => {
    for (const variant of NEW_VARIANTS) {
      expect(getButtonClasses({ variant })).toContain(`sp-btn--${variant}`)
    }
  })

  it('styles each new variant and its interaction states', () => {
    expectRecipeClassesStyled(
      NEW_VARIANTS.map((variant) => getButtonClasses({ variant }))
    )

    for (const variant of NEW_VARIANTS) {
      for (const state of [':hover', ':active', ':disabled', ':focus-visible']) {
        expect(componentsCss).toContain(`.sp-btn--${variant}${state}`)
      }
    }
  })

  it('sources every link state background from its published token', () => {
    for (const state of ['hover', 'active', 'disabled']) {
      expect(componentsCss).toContain(
        `--sp-component-button-link-bg-${state}: var(--sp-button-link-bg${state});`
      )
    }
  })

  it('splits native focus-visible from the recipe-forced focus ring', () => {
    expect(componentsCss).toContain(
      '--sp-component-button-primary-focus-ring: var(--sp-button-primary-focusring);'
    )
    expect(componentsCss).toMatch(
      /\.sp-btn--primary\.sp-btn--focus,\s*\.sp-btn--primary\.is-focus \{\s*box-shadow: [^;]*--sp-component-button-primary-focus-ring\);/
    )
  })
})
