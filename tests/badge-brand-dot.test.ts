import { describe, expect, it } from 'vitest'
import { getBadgeClasses } from '@phcdevworks/spectre-ui'
import {
  componentsCss,
  expectRecipeClassesStyled
} from './support/component-css'

describe('badge brand variant and notification dot', () => {
  it('supports the brand variant and the dot flag', () => {
    expect(getBadgeClasses({ variant: 'brand' })).toContain('sp-badge--brand')
    expect(getBadgeClasses({ dot: true })).toContain('sp-badge--dot')
    expect(getBadgeClasses()).not.toContain('sp-badge--dot')
  })

  it('styles the new classes from the published badge tokens', () => {
    expectRecipeClassesStyled([
      getBadgeClasses({ variant: 'brand', dot: true, interactive: true })
    ])
    expect(componentsCss).toContain('var(--sp-badge-brand-bg-hover)')
    expect(componentsCss).toContain('var(--sp-badge-dot-border)')
  })
})
