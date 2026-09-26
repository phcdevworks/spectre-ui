import { describe, expect, it } from 'vitest'
import { getFileInputClasses } from '@phcdevworks/spectre-ui'
import {
  componentsCss,
  expectRecipeClassesStyled,
  expectTokenizedClassString
} from './support/component-css'

const SIZES = ['sm', 'md', 'lg'] as const
const STATES = ['default', 'invalid', 'success'] as const

describe('getFileInputClasses', () => {
  it('defaults to the md size and default state', () => {
    expect(getFileInputClasses()).toBe('sp-file-input sp-file-input--md')
  })

  it('maps non-default states to modifiers', () => {
    expect(getFileInputClasses({ state: 'invalid' })).toContain(
      'sp-file-input--invalid'
    )
    expect(getFileInputClasses({ state: 'success' })).toContain(
      'sp-file-input--success'
    )
  })

  it('supports every flag', () => {
    const result = getFileInputClasses({
      size: 'lg',
      fullWidth: true,
      disabled: true,
      focused: true
    })
    expect(result).toContain('sp-file-input--full')
    expectTokenizedClassString(result)
  })
})

describe('file input CSS contract', () => {
  it('styles every class the recipe emits', () => {
    expectRecipeClassesStyled(
      SIZES.flatMap((size) =>
        STATES.map((state) =>
          getFileInputClasses({
            size,
            state,
            fullWidth: true,
            disabled: true,
            focused: true
          })
        )
      )
    )
  })

  it('styles the native browse button', () => {
    expect(componentsCss).toContain('.sp-file-input::file-selector-button')
  })
})
