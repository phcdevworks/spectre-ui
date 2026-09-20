import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const PRICING_CARD_ACCENT_EDGES = {
  top: true,
  right: true,
  bottom: true,
  left: true
} as const

const PRICING_CARD_ACCENT_COLORS = {
  neutral: true,
  brand: true,
  info: true,
  success: true,
  warning: true,
  danger: true,
  cta: true
} as const

export type PricingCardAccentEdge = keyof typeof PRICING_CARD_ACCENT_EDGES
export type PricingCardAccentColor = keyof typeof PRICING_CARD_ACCENT_COLORS

export interface PricingCardRecipeOptions {
  featured?: boolean
  disabled?: boolean
  loading?: boolean
  interactive?: boolean
  hovered?: boolean
  focused?: boolean
  active?: boolean
  fullHeight?: boolean
  /**
   * Renders a thicker decorative rail on the given edge, sized from
   * `component.pricingCard.accent.thickness` (`spectre-tokens` 4.9.0).
   * Omission renders no rail. `accentColor` defaults to `'brand'` when
   * `accent` is set but `accentColor` is omitted.
   */
  accent?: PricingCardAccentEdge
  accentColor?: PricingCardAccentColor
}

export function getPricingCardClasses(opts: PricingCardRecipeOptions = {}): string {
  const {
    featured = false,
    disabled = false,
    loading = false,
    interactive = false,
    hovered = false,
    focused = false,
    active = false,
    fullHeight = false,
    accent: accentInput,
    accentColor: accentColorInput,
  } = opts

  let accentEdgeClass: string | false = false
  let accentColorClass: string | false = false
  if (accentInput !== undefined) {
    const accentEdge = resolveOption({
      name: 'pricing card accent edge',
      value: accentInput,
      allowed: PRICING_CARD_ACCENT_EDGES,
      fallback: 'top'
    })
    accentEdgeClass = `sp-pricing-card--accent-${accentEdge}`

    const accentColor = resolveOption({
      name: 'pricing card accent color',
      value: accentColorInput,
      allowed: PRICING_CARD_ACCENT_COLORS,
      fallback: 'brand'
    })
    accentColorClass = `sp-pricing-card--accent-${accentColor}`
  }

  return cx(
    'sp-pricing-card',
    featured && 'sp-pricing-card--featured',
    disabled && 'sp-pricing-card--disabled',
    loading && 'sp-pricing-card--loading',
    interactive && 'sp-pricing-card--interactive',
    hovered && 'sp-pricing-card--hover is-hover',
    focused && 'sp-pricing-card--focus is-focus',
    active && 'sp-pricing-card--active is-active',
    fullHeight && 'sp-pricing-card--full',
    accentEdgeClass,
    accentColorClass
  )
}

export function getPricingCardBadgeClasses(): string {
  return cx('sp-pricing-card-badge')
}

export function getPricingCardPriceContainerClasses(): string {
  return cx('sp-pricing-card-price-container')
}

export function getPricingCardPriceClasses(): string {
  return cx('sp-pricing-card-price')
}

export function getPricingCardDescriptionClasses(): string {
  return cx('sp-pricing-card-description')
}
