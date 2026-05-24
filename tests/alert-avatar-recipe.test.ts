import { describe, expect, it } from 'vitest'
import { getAlertClasses, getAvatarClasses } from '@phcdevworks/spectre-ui'

const expectTokenizedClassString = (result: string) => {
  const tokens = result.split(/\s+/)
  expect(result).toBe(result.trim())
  expect(tokens).not.toContain('')
  expect(tokens.join(' ')).toBe(result)
  expect(new Set(tokens).size).toBe(tokens.length)
}

describe('getAlertClasses', () => {
  it('returns defaults for alerts', () => {
    const result = getAlertClasses()
    expect(result).toBe('sp-alert sp-alert--info sp-alert--md')
    expectTokenizedClassString(result)
  })

  it('supports all alert variants', () => {
    const variants = [
      { variant: 'info' as const, className: 'sp-alert--info' },
      { variant: 'success' as const, className: 'sp-alert--success' },
      { variant: 'warning' as const, className: 'sp-alert--warning' },
      { variant: 'danger' as const, className: 'sp-alert--danger' },
      { variant: 'neutral' as const, className: 'sp-alert--neutral' },
    ]

    variants.forEach(({ variant, className }) => {
      const result = getAlertClasses({ variant })
      expect(result).toContain(className)
      expect(result).toContain('sp-alert')
    })
  })

  it('supports all alert sizes', () => {
    const sizes = [
      { size: 'sm' as const, className: 'sp-alert--sm' },
      { size: 'md' as const, className: 'sp-alert--md' },
      { size: 'lg' as const, className: 'sp-alert--lg' },
    ]

    sizes.forEach(({ size, className }) => {
      const result = getAlertClasses({ size })
      expect(result).toContain(className)
    })
  })

  it('supports dismissed state', () => {
    const result = getAlertClasses({ dismissed: true })
    expect(result).toContain('sp-alert--dismissed')
    expectTokenizedClassString(result)
  })

  it('supports fullWidth state', () => {
    const result = getAlertClasses({ fullWidth: true })
    expect(result).toContain('sp-alert--full')
    expectTokenizedClassString(result)
  })

  it('creates trimmed, space-delimited class strings for non-default alerts', () => {
    const result = getAlertClasses({ variant: 'danger', size: 'lg' })
    expectTokenizedClassString(result)
  })
})

describe('getAvatarClasses', () => {
  it('returns defaults for avatars', () => {
    const result = getAvatarClasses()
    expect(result).toBe('sp-avatar sp-avatar--md sp-avatar--circle')
    expectTokenizedClassString(result)
  })

  it('supports all avatar sizes', () => {
    const sizes = [
      { size: 'sm' as const, className: 'sp-avatar--sm' },
      { size: 'md' as const, className: 'sp-avatar--md' },
      { size: 'lg' as const, className: 'sp-avatar--lg' },
      { size: 'xl' as const, className: 'sp-avatar--xl' },
    ]

    sizes.forEach(({ size, className }) => {
      const result = getAvatarClasses({ size })
      expect(result).toContain(className)
      expect(result).toContain('sp-avatar')
    })
  })

  it('supports all avatar shapes', () => {
    const shapes = [
      { shape: 'circle' as const, className: 'sp-avatar--circle' },
      { shape: 'square' as const, className: 'sp-avatar--square' },
    ]

    shapes.forEach(({ shape, className }) => {
      const result = getAvatarClasses({ shape })
      expect(result).toContain(className)
    })
  })

  it('creates trimmed, space-delimited class strings for non-default avatars', () => {
    const result = getAvatarClasses({ size: 'xl', shape: 'square' })
    expectTokenizedClassString(result)
  })
})
