import { describe, expect, it } from 'vitest'
import {
  getNavClasses,
  getNavLinkClasses,
  getNavLinksClasses,
} from '@phcdevworks/spectre-ui'

const expectTokenizedClassString = (result: string) => {
  const tokens = result.split(/\s+/)
  expect(result).toBe(result.trim())
  expect(tokens).not.toContain('')
  expect(tokens.join(' ')).toBe(result)
  expect(new Set(tokens).size).toBe(tokens.length)
}

describe('getNavClasses', () => {
  it('returns the default nav class', () => {
    const result = getNavClasses()
    expect(result).toBe('sp-nav')
    expectTokenizedClassString(result)
  })

  it('supports the bordered, sticky, and fullWidth flags', () => {
    expect(getNavClasses({ bordered: true })).toContain('sp-nav--bordered')
    expect(getNavClasses({ sticky: true })).toContain('sp-nav--sticky')
    expect(getNavClasses({ fullWidth: true })).toContain('sp-nav--full')
  })

  it('creates trimmed, space-delimited class strings for combined options', () => {
    const result = getNavClasses({ bordered: true, sticky: true, fullWidth: true })
    expectTokenizedClassString(result)
  })
})

describe('getNavLinksClasses', () => {
  it('returns the nav links container class', () => {
    expect(getNavLinksClasses()).toBe('sp-nav__links')
  })
})

describe('getNavLinkClasses', () => {
  it('returns the default nav link class', () => {
    const result = getNavLinkClasses()
    expect(result).toBe('sp-nav__link')
    expectTokenizedClassString(result)
  })

  it('supports the active and disabled states', () => {
    expect(getNavLinkClasses({ active: true })).toContain('sp-nav__link--active')
    expect(getNavLinkClasses({ disabled: true })).toContain('sp-nav__link--disabled')
  })

  it('supports forced-state flags', () => {
    const states = [
      { key: 'hovered' as const, className: 'sp-nav__link--hover is-hover' },
      { key: 'focused' as const, className: 'sp-nav__link--focus is-focus' },
    ]

    states.forEach(({ key, className }) => {
      const result = getNavLinkClasses({ [key]: true })
      expect(result).toContain(className)
      expectTokenizedClassString(result)
    })
  })

  it('creates trimmed, space-delimited class strings for combined options', () => {
    const result = getNavLinkClasses({ active: true, focused: true })
    expectTokenizedClassString(result)
  })
})
