import { describe, expect, it } from 'vitest'
import { getTooltipClasses } from '@phcdevworks/spectre-ui'

const expectTokenizedClassString = (result: string) => {
  const tokens = result.split(/\s+/)
  expect(result).toBe(result.trim())
  expect(tokens).not.toContain('')
  expect(tokens.join(' ')).toBe(result)
  expect(new Set(tokens).size).toBe(tokens.length)
}

describe('getTooltipClasses', () => {
  it('returns the default top-placement tooltip class', () => {
    const result = getTooltipClasses()
    expect(result).toBe('sp-tooltip sp-tooltip--top')
    expectTokenizedClassString(result)
  })

  it('supports the bottom, left, and right placements', () => {
    expect(getTooltipClasses({ placement: 'bottom' })).toContain('sp-tooltip--bottom')
    expect(getTooltipClasses({ placement: 'left' })).toContain('sp-tooltip--left')
    expect(getTooltipClasses({ placement: 'right' })).toContain('sp-tooltip--right')
  })

  it('supports the visible flag', () => {
    expect(getTooltipClasses({ visible: true })).toContain('sp-tooltip--visible')
  })

  it('creates trimmed, space-delimited class strings for combined options', () => {
    const result = getTooltipClasses({ placement: 'bottom', visible: true })
    expectTokenizedClassString(result)
  })
})
