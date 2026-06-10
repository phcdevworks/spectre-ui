import { describe, expect, it } from 'vitest'
import {
  getDropdownClasses,
  getDropdownItemClasses,
  getDropdownMenuClasses,
} from '@phcdevworks/spectre-ui'

const expectTokenizedClassString = (result: string) => {
  const tokens = result.split(/\s+/)
  expect(result).toBe(result.trim())
  expect(tokens).not.toContain('')
  expect(tokens.join(' ')).toBe(result)
  expect(new Set(tokens).size).toBe(tokens.length)
}

describe('getDropdownClasses', () => {
  it('returns the default dropdown class', () => {
    const result = getDropdownClasses()
    expect(result).toBe('sp-dropdown')
    expectTokenizedClassString(result)
  })

  it('supports the fullWidth flag', () => {
    expect(getDropdownClasses({ fullWidth: true })).toContain('sp-dropdown--full')
  })
})

describe('getDropdownMenuClasses', () => {
  it('returns the default bottom-start menu class', () => {
    const result = getDropdownMenuClasses()
    expect(result).toBe('sp-dropdown__menu sp-dropdown__menu--bottom-start')
    expectTokenizedClassString(result)
  })

  it('supports the bottom-end, top-start, and top-end placements', () => {
    expect(getDropdownMenuClasses({ placement: 'bottom-end' })).toContain('sp-dropdown__menu--bottom-end')
    expect(getDropdownMenuClasses({ placement: 'top-start' })).toContain('sp-dropdown__menu--top-start')
    expect(getDropdownMenuClasses({ placement: 'top-end' })).toContain('sp-dropdown__menu--top-end')
  })

  it('supports the open flag', () => {
    expect(getDropdownMenuClasses({ open: true })).toContain('sp-dropdown__menu--open')
  })

  it('creates trimmed, space-delimited class strings for combined options', () => {
    const result = getDropdownMenuClasses({ placement: 'top-end', open: true })
    expectTokenizedClassString(result)
  })
})

describe('getDropdownItemClasses', () => {
  it('returns the default dropdown item class', () => {
    const result = getDropdownItemClasses()
    expect(result).toBe('sp-dropdown__item')
    expectTokenizedClassString(result)
  })

  it('supports the active and disabled states', () => {
    expect(getDropdownItemClasses({ active: true })).toContain('sp-dropdown__item--active')
    expect(getDropdownItemClasses({ disabled: true })).toContain('sp-dropdown__item--disabled')
  })

  it('supports forced-state flags', () => {
    const states = [
      { key: 'hovered' as const, className: 'sp-dropdown__item--hover is-hover' },
      { key: 'focused' as const, className: 'sp-dropdown__item--focus is-focus' },
    ]

    states.forEach(({ key, className }) => {
      const result = getDropdownItemClasses({ [key]: true })
      expect(result).toContain(className)
      expectTokenizedClassString(result)
    })
  })

  it('creates trimmed, space-delimited class strings for combined options', () => {
    const result = getDropdownItemClasses({ active: true, focused: true })
    expectTokenizedClassString(result)
  })
})
