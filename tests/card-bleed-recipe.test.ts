import { describe, expect, it } from 'vitest'
import { getCardBleedClasses } from '@phcdevworks/spectre-ui'

const expectTokenizedClassString = (result: string) => {
  const tokens = result.split(/\s+/)

  expect(result).toBe(result.trim())
  expect(tokens).not.toContain('')
  expect(tokens.join(' ')).toBe(result)
  expect(new Set(tokens).size).toBe(tokens.length)
}

describe('getCardBleedClasses', () => {
  it('is neutral when the caller omits edges and padded', () => {
    const result = getCardBleedClasses()

    expect(result).toBe('sp-card__bleed')
    expectTokenizedClassString(result)
  })

  it('adds a single edge class', () => {
    const result = getCardBleedClasses({ edges: 'top' })

    expect(result).toBe('sp-card__bleed sp-card__bleed--top')
  })

  it('accepts an array of edges and orders them deterministically regardless of input order', () => {
    const result = getCardBleedClasses({ edges: ['left', 'top'] })

    expect(result).toBe(
      'sp-card__bleed sp-card__bleed--top sp-card__bleed--left'
    )
  })

  it('dedupes repeated edges', () => {
    const result = getCardBleedClasses({ edges: ['top', 'top'] })

    expect(result).toBe('sp-card__bleed sp-card__bleed--top')
  })

  it('expands "all" to every edge in canonical order', () => {
    const result = getCardBleedClasses({ edges: 'all' })

    expect(result).toBe(
      'sp-card__bleed sp-card__bleed--top sp-card__bleed--right sp-card__bleed--bottom sp-card__bleed--left'
    )
  })

  it('maps the padded size scale to its own class, with sm/lg getting explicit classes and md/true sharing the legacy alias', () => {
    expect(getCardBleedClasses({ padded: 'sm' })).toContain(
      'sp-card__bleed--padded-sm'
    )
    expect(getCardBleedClasses({ padded: 'lg' })).toContain(
      'sp-card__bleed--padded-lg'
    )
    expect(getCardBleedClasses({ padded: 'md' })).toContain(
      'sp-card__bleed--padded'
    )
    expect(getCardBleedClasses({ padded: 'md' })).not.toContain(
      'sp-card__bleed--padded-md'
    )
    expect(getCardBleedClasses({ padded: true })).toContain(
      'sp-card__bleed--padded'
    )
    expect(getCardBleedClasses({ padded: true })).not.toContain(
      'sp-card__bleed--padded-md'
    )
  })

  it('omits the padded class when padded is omitted or false, covering the unpadded-card case', () => {
    expect(getCardBleedClasses()).not.toContain('sp-card__bleed--padded')
    expect(getCardBleedClasses({ padded: false })).not.toContain(
      'sp-card__bleed--padded'
    )
  })

  it('combines edges and a padded size deterministically for a full-bleed padded child', () => {
    const result = getCardBleedClasses({ edges: 'all', padded: 'lg' })

    expect(result).toBe(
      'sp-card__bleed sp-card__bleed--top sp-card__bleed--right sp-card__bleed--bottom sp-card__bleed--left sp-card__bleed--padded-lg'
    )
    expectTokenizedClassString(result)
  })
})
