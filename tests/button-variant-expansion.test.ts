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

  it('keeps the link variant background transparent on hover', () => {
    expect(componentsCss).toMatch(
      /\.sp-btn--link:hover \{\s*background-color: var\(--sp-component-button-link-bg\);/
    )
  })
})
