import { describe, expect, it } from 'vitest'
import { getTagClasses } from '@phcdevworks/spectre-ui'

const expectTokenizedClassString = (result: string) => {
  const tokens = result.split(/\s+/)
  expect(result).toBe(result.trim())
  expect(tokens).not.toContain('')
  expect(tokens.join(' ')).toBe(result)
  expect(new Set(tokens).size).toBe(tokens.length)
}

describe('getTagClasses', () => {
  it('returns defaults for tags', () => {
    const result = getTagClasses()
    expect(result).toBe('sp-tag sp-tag--default')
    expectTokenizedClassString(result)
  })

  it('supports all tag variants', () => {
    const variants = [
      { variant: 'default' as const, className: 'sp-tag--default' },
      { variant: 'outline' as const, className: 'sp-tag--outline' },
    ]

    variants.forEach(({ variant, className }) => {
      const result = getTagClasses({ variant })
      expect(result).toContain(className)
      expect(result).toContain('sp-tag')
    })
  })

  it('supports dismissible state', () => {
    const result = getTagClasses({ dismissible: true })
    expect(result).toContain('sp-tag--dismissible')
    expectTokenizedClassString(result)
  })

  it('supports selected state', () => {
    const result = getTagClasses({ selected: true })
    expect(result).toContain('sp-tag--selected')
    expectTokenizedClassString(result)
  })

  it('supports boolean state flags', () => {
    const states = [
      { key: 'disabled' as const, className: 'sp-tag--disabled' },
      { key: 'loading' as const, className: 'sp-tag--loading' },
      { key: 'interactive' as const, className: 'sp-tag--interactive' },
      { key: 'fullWidth' as const, className: 'sp-tag--full' },
    ]

    states.forEach(({ key, className }) => {
      const result = getTagClasses({ [key]: true })
      expect(result).toContain(className)
      expectTokenizedClassString(result)
    })
  })

  it('supports forced-state flags', () => {
    const states = [
      { key: 'hovered' as const, className: 'sp-tag--hover is-hover' },
      { key: 'focused' as const, className: 'sp-tag--focus is-focus' },
      { key: 'active' as const, className: 'sp-tag--active is-active' },
    ]

    states.forEach(({ key, className }) => {
      const result = getTagClasses({ [key]: true })
      expect(result).toContain(className)
      expectTokenizedClassString(result)
    })
  })

  it('creates trimmed, space-delimited class strings for combined options', () => {
    const result = getTagClasses({ variant: 'outline', selected: true })
    expectTokenizedClassString(result)
  })
})
