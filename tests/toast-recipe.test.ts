import { describe, expect, it } from 'vitest'
import { getToastClasses, getToastIconClasses } from '@phcdevworks/spectre-ui'

const expectTokenizedClassString = (result: string) => {
  const tokens = result.split(/\s+/)
  expect(result).toBe(result.trim())
  expect(tokens).not.toContain('')
  expect(tokens.join(' ')).toBe(result)
  expect(new Set(tokens).size).toBe(tokens.length)
}

describe('getToastClasses', () => {
  it('returns the default info toast class', () => {
    const result = getToastClasses()
    expect(result).toBe('sp-toast sp-toast--info')
    expectTokenizedClassString(result)
  })

  it('supports the success, warning, and danger variants', () => {
    expect(getToastClasses({ variant: 'success' })).toContain('sp-toast--success')
    expect(getToastClasses({ variant: 'warning' })).toContain('sp-toast--warning')
    expect(getToastClasses({ variant: 'danger' })).toContain('sp-toast--danger')
  })

  it('supports the dismissed and fullWidth flags', () => {
    expect(getToastClasses({ dismissed: true })).toContain('sp-toast--dismissed')
    expect(getToastClasses({ fullWidth: true })).toContain('sp-toast--full')
  })

  it('creates trimmed, space-delimited class strings for combined options', () => {
    const result = getToastClasses({
      variant: 'success',
      dismissed: true,
      fullWidth: true,
    })
    expectTokenizedClassString(result)
  })
})

describe('getToastIconClasses', () => {
  it('returns the default info toast icon class', () => {
    const result = getToastIconClasses()
    expect(result).toBe('sp-toast__icon sp-toast__icon--info')
    expectTokenizedClassString(result)
  })

  it('supports the success, warning, and danger variants', () => {
    expect(getToastIconClasses({ variant: 'success' })).toBe(
      'sp-toast__icon sp-toast__icon--success'
    )
    expect(getToastIconClasses({ variant: 'warning' })).toBe(
      'sp-toast__icon sp-toast__icon--warning'
    )
    expect(getToastIconClasses({ variant: 'danger' })).toBe(
      'sp-toast__icon sp-toast__icon--danger'
    )
  })
})
