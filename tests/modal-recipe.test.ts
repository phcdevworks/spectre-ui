import { describe, expect, it } from 'vitest'
import { getModalClasses, getModalOverlayClasses } from '@phcdevworks/spectre-ui'

const expectTokenizedClassString = (result: string) => {
  const tokens = result.split(/\s+/)
  expect(result).toBe(result.trim())
  expect(tokens).not.toContain('')
  expect(tokens.join(' ')).toBe(result)
  expect(new Set(tokens).size).toBe(tokens.length)
}

describe('getModalClasses', () => {
  it('returns the default modal class', () => {
    const result = getModalClasses()
    expect(result).toBe('sp-modal')
    expectTokenizedClassString(result)
  })

  it('supports the open and fullWidth flags', () => {
    expect(getModalClasses({ open: true })).toContain('sp-modal--open')
    expect(getModalClasses({ fullWidth: true })).toContain('sp-modal--full')
  })

  it('creates trimmed, space-delimited class strings for combined options', () => {
    const result = getModalClasses({ open: true, fullWidth: true })
    expectTokenizedClassString(result)
  })
})

describe('getModalOverlayClasses', () => {
  it('returns the default modal overlay class', () => {
    const result = getModalOverlayClasses()
    expect(result).toBe('sp-modal-overlay')
    expectTokenizedClassString(result)
  })

  it('supports the open flag', () => {
    expect(getModalOverlayClasses({ open: true })).toBe('sp-modal-overlay sp-modal-overlay--open')
  })
})
