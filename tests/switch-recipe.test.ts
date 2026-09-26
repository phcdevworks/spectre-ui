import { describe, expect, it } from 'vitest'
import { getSwitchClasses } from '@phcdevworks/spectre-ui'
import {
  componentsCss,
  expectRecipeClassesStyled,
  expectTokenizedClassString
} from './support/component-css'

const SIZES = ['sm', 'md', 'lg'] as const

describe('getSwitchClasses', () => {
  it('defaults to the md size with no state modifiers', () => {
    expect(getSwitchClasses()).toBe('sp-switch sp-switch--md')
  })

  it('supports every size and forced state', () => {
    for (const size of SIZES) {
      const result = getSwitchClasses({
        size,
        checked: true,
        disabled: true,
        focused: true
      })
      expect(result).toContain(`sp-switch--${size}`)
      expect(result).toContain('sp-switch--checked')
      expectTokenizedClassString(result)
    }
  })
})

describe('switch CSS contract', () => {
  it('styles every class the recipe emits', () => {
    expectRecipeClassesStyled(
      SIZES.map((size) =>
        getSwitchClasses({ size, checked: true, disabled: true, focused: true })
      )
    )
  })

  it('follows native checked and disabled state without flags', () => {
    expect(componentsCss).toContain('.sp-switch:checked')
    expect(componentsCss).toContain('.sp-switch:disabled')
  })
})
