import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const QUOTE_SIZES = {
  sm: true,
  md: true,
  lg: true,
  xl: true
} as const

const QUOTE_SURFACES = {
  plain: true,
  subtle: true,
  inverse: true
} as const

const QUOTE_ACCENTS = {
  none: true,
  edge: true,
  mark: true
} as const

const QUOTE_ACCENT_COLORS = {
  neutral: true,
  brand: true,
  info: true,
  success: true,
  warning: true,
  danger: true,
  cta: true,
  accent: true,
  action: true
} as const

const QUOTE_ALIGNS = {
  start: true,
  center: true
} as const

export type QuoteSize = keyof typeof QUOTE_SIZES
export type QuoteSurface = keyof typeof QUOTE_SURFACES
export type QuoteAccent = keyof typeof QUOTE_ACCENTS
export type QuoteAccentColor = keyof typeof QUOTE_ACCENT_COLORS
export type QuoteAlign = keyof typeof QUOTE_ALIGNS

export interface QuoteRecipeOptions {
  /** Type scale of the quoted text; `xl` is a large statement quote. */
  size?: QuoteSize
  /**
   * `plain` sits on the page with no fill. `subtle` and `inverse` add a
   * padded `surface.subtle` / `surface.inverse` panel; `inverse` switches
   * the text to the `text.onInverse.*` roles.
   */
  surface?: QuoteSurface
  /**
   * `edge` draws a leading rail at `component.quote.accent.thickness`;
   * `mark` draws a decorative opening quote mark instead; `none` keeps the
   * neutral `component.quote.border` rule. Defaults to `edge`.
   */
  accent?: QuoteAccent
  /**
   * Rail and mark tone from `component.quote.accent`. Defaults to `accent`,
   * whose mark follows the `component.quote.mark` role. `action` uses the
   * theme's action colour (`action.rail`, `spectre-tokens` 4.15.0).
   */
  accentColor?: QuoteAccentColor
  align?: QuoteAlign
}

/**
 * A blockquote or pull quote (`spectre-tokens` 4.13.0 `component.quote`).
 * Apply to the `<figure>` (or `<blockquote>`) that wraps the quote text and
 * its attribution.
 */
export function getQuoteClasses(opts: QuoteRecipeOptions = {}): string {
  const size = resolveOption({
    name: 'quote size',
    value: opts.size,
    allowed: QUOTE_SIZES,
    fallback: 'md'
  })

  const surface = resolveOption({
    name: 'quote surface',
    value: opts.surface,
    allowed: QUOTE_SURFACES,
    fallback: 'plain'
  })

  const accent = resolveOption({
    name: 'quote accent',
    value: opts.accent,
    allowed: QUOTE_ACCENTS,
    fallback: 'edge'
  })

  const accentColor = resolveOption({
    name: 'quote accent color',
    value: opts.accentColor,
    allowed: QUOTE_ACCENT_COLORS,
    fallback: 'accent'
  })

  const align = resolveOption({
    name: 'quote align',
    value: opts.align,
    allowed: QUOTE_ALIGNS,
    fallback: 'start'
  })

  return cx(
    'sp-quote',
    `sp-quote--${size}`,
    surface !== 'plain' && `sp-quote--surface-${surface}`,
    accent !== 'none' && `sp-quote--accent-${accent}`,
    accent !== 'none' && `sp-quote--accent-${accentColor}`,
    align === 'center' && 'sp-quote--center'
  )
}

/** The quoted text (the `<blockquote>` or its `<p>`). */
export function getQuoteTextClasses(): string {
  return 'sp-quote__text'
}

export interface QuoteAttributionRecipeOptions {
  /**
   * Set when the first child is an avatar (`getAvatarClasses`): it sits
   * beside the name and role lines instead of above them.
   */
  avatar?: boolean
}

/** The attribution (`<figcaption>`): avatar, name, and role lines. */
export function getQuoteAttributionClasses(
  opts: QuoteAttributionRecipeOptions = {}
): string {
  const { avatar = false } = opts

  return cx('sp-quote__attribution', avatar && 'sp-quote__attribution--avatar')
}

export function getQuoteAttributionNameClasses(): string {
  return 'sp-quote__name'
}

/** Role and organization line beneath the name. */
export function getQuoteAttributionRoleClasses(): string {
  return 'sp-quote__role'
}
