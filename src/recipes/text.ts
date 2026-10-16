import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'
import { TRACKING_STEPS } from '../internal/utility-scales.generated'

const TEXT_SIZES = {
  xs: true,
  sm: true,
  md: true,
  lg: true,
  xl: true,
  '2xl': true,
  '3xl': true,
  '4xl': true,
  '5xl': true,
  '6xl': true,
  '7xl': true,
  '8xl': true,
  '9xl': true,
} as const

const TEXT_VARIANTS = {
  default: true,
  muted: true,
  subtle: true,
  meta: true,
  brand: true,
  /**
   * The accent role (`text.onPage.accent`, `spectre-tokens` 4.13.0) for
   * eyebrows, stat units, and quote marks. A child theme re-points the one
   * role instead of redeclaring palette steps.
   */
  accent: true,
  /**
   * For text placed on a `surface.inverse`-backed background (a photo card,
   * a brand-dark card body, a utility bar) that isn't owned by the page's
   * own light/dark mode. See TODO.md "Requested by Downstream" /
   * "On-dark/inverse surface role".
   */
  onInverse: true,
  onInverseMuted: true,
  onInverseBrand: true,
  onInverseAccent: true,
  /**
   * For text inside a card-like `surface.card` container rather than directly
   * on the page background (`text.onSurface.*`).
   */
  onSurface: true,
  onSurfaceMuted: true,
  onSurfaceSubtle: true,
  onSurfaceMeta: true,
  onSurfaceBrand: true,
  onSurfaceAccent: true,
} as const

const TEXT_FAMILIES = {
  sans: true,
  serif: true,
  mono: true,
} as const

const TEXT_TRANSFORMS = {
  none: true,
  uppercase: true,
  lowercase: true,
  capitalize: true,
} as const

// The named leading scale spectre-tokens publishes as --sp-leading-*.
const TEXT_LEADINGS = {
  none: true,
  tight: true,
  snug: true,
  normal: true,
  relaxed: true,
  loose: true,
} as const

// The distinct weights spectre-tokens publishes across the font and heading
// presets, the same set the generated sp-font-{weight} utilities expand.
const TEXT_WEIGHTS = {
  '400': true,
  '500': true,
  '600': true,
  '700': true,
  '800': true,
  '900': true,
} as const

// The numeric font-size scale spectre-tokens publishes as --sp-font-size-<px>,
// the same set the generated sp-font-size-{px} utilities expand.
const TEXT_FONT_SIZES = {
  '12': true,
  '14': true,
  '16': true,
  '18': true,
  '20': true,
  '24': true,
  '30': true,
  '36': true,
  '48': true,
  '60': true,
  '72': true,
  '96': true,
  '128': true,
} as const

// The letter-spacing scale spectre-tokens publishes as --sp-tracking-*.
const TEXT_TRACKINGS = TRACKING_STEPS

// textDecoration.thickness and textDecoration.offset (--sp-text-decoration-*).
const TEXT_DECORATIONS = {
  thin: true,
  base: true,
  thick: true,
} as const

const TEXT_UNDERLINE_OFFSETS = {
  sm: true,
  md: true,
  lg: true,
} as const

export type TextSize = keyof typeof TEXT_SIZES
export type TextVariant = keyof typeof TEXT_VARIANTS
export type TextFamily = keyof typeof TEXT_FAMILIES
export type TextTransform = keyof typeof TEXT_TRANSFORMS
export type TextLeading = keyof typeof TEXT_LEADINGS
export type TextWeight = 400 | 500 | 600 | 700 | 800 | 900
export type TextTracking = (typeof TRACKING_STEPS)[number]
export type TextDecoration = keyof typeof TEXT_DECORATIONS
export type TextUnderlineOffset = keyof typeof TEXT_UNDERLINE_OFFSETS
export type TextFontSize =
  | 12
  | 14
  | 16
  | 18
  | 20
  | 24
  | 30
  | 36
  | 48
  | 60
  | 72
  | 96
  | 128

export interface TextRecipeOptions {
  size?: TextSize
  variant?: TextVariant
  family?: TextFamily
  transform?: TextTransform
  /**
   * Overrides the weight the `size` preset carries, e.g. a label that reads
   * bolder than the muted line beneath it. Emits the token-derived
   * `sp-font-{weight}` utility, which wins over the preset by layer order.
   */
  weight?: TextWeight
  /**
   * Overrides the line height the `size` preset carries with a step from the
   * named `--sp-leading-*` scale, e.g. `tight` for a large statement line.
   */
  leading?: TextLeading
  /**
   * Overrides only the font size the `size` preset carries with an exact step
   * from the numeric `--sp-font-size-<px>` scale; line height and weight stay
   * with the preset (pair with `leading` / `weight`). Emits the token-derived
   * `sp-font-size-{px}` utility, which wins over the preset by layer order.
   */
  fontSize?: TextFontSize
  /**
   * Overrides the letter spacing the `size` preset carries with a step from
   * the `--sp-tracking-*` scale. Emits `sp-tracking-{step}`.
   */
  tracking?: TextTracking
  /** Underline thickness from `--sp-text-decoration-thickness-*`. */
  decoration?: TextDecoration
  /** Gap between text and its underline from `--sp-text-decoration-offset-*`. */
  underlineOffset?: TextUnderlineOffset
  /** Tabular numerals for figures that repaint in place. */
  tabularNums?: boolean
  /** Balanced line wrapping so a short headline does not end on an orphan. */
  balance?: boolean
}

export function getTextClasses(opts: TextRecipeOptions = {}): string {
  const {
    size: sizeInput,
    variant: variantInput,
    family: familyInput,
    transform: transformInput,
    weight: weightInput,
    leading: leadingInput,
    fontSize: fontSizeInput,
    tracking: trackingInput,
    decoration: decorationInput,
    underlineOffset: underlineOffsetInput,
    tabularNums = false,
    balance = false,
  } = opts

  const size = resolveOption({
    name: 'text size',
    value: sizeInput,
    allowed: TEXT_SIZES,
    fallback: 'md',
  })

  const variant = resolveOption({
    name: 'text variant',
    value: variantInput,
    allowed: TEXT_VARIANTS,
    fallback: 'default',
  })

  const variantMap: Record<TextVariant, string> = {
    default: 'sp-text--default',
    muted: 'sp-text--muted',
    subtle: 'sp-text--subtle',
    meta: 'sp-text--meta',
    brand: 'sp-text--brand',
    accent: 'sp-text--accent',
    onInverse: 'sp-text--on-inverse',
    onInverseMuted: 'sp-text--on-inverse-muted',
    onInverseBrand: 'sp-text--on-inverse-brand',
    onInverseAccent: 'sp-text--on-inverse-accent',
    onSurface: 'sp-text--on-surface',
    onSurfaceMuted: 'sp-text--on-surface-muted',
    onSurfaceSubtle: 'sp-text--on-surface-subtle',
    onSurfaceMeta: 'sp-text--on-surface-meta',
    onSurfaceBrand: 'sp-text--on-surface-brand',
    onSurfaceAccent: 'sp-text--on-surface-accent',
  }
  const variantClass = variantMap[variant]

  const family = familyInput
    ? resolveOption({
        name: 'text family',
        value: familyInput,
        allowed: TEXT_FAMILIES,
        fallback: 'sans',
      })
    : undefined

  const transform =
    transformInput && transformInput !== 'none'
      ? resolveOption({
          name: 'text transform',
          value: transformInput,
          allowed: TEXT_TRANSFORMS,
          fallback: 'none',
        })
      : undefined

  const weight =
    weightInput === undefined
      ? undefined
      : resolveOption({
          name: 'text weight',
          value: String(weightInput),
          allowed: TEXT_WEIGHTS,
          fallback: '400',
        })

  const leading =
    leadingInput === undefined
      ? undefined
      : resolveOption({
          name: 'text leading',
          value: leadingInput,
          allowed: TEXT_LEADINGS,
          fallback: 'normal',
        })

  const fontSize =
    fontSizeInput === undefined
      ? undefined
      : resolveOption({
          name: 'text font size',
          value: String(fontSizeInput),
          allowed: TEXT_FONT_SIZES,
          fallback: '16',
        })

  const tracking =
    trackingInput === undefined
      ? undefined
      : resolveOption({
          name: 'text tracking',
          value: trackingInput,
          allowed: TEXT_TRACKINGS,
          fallback: 'normal',
        })

  const decoration =
    decorationInput === undefined
      ? undefined
      : resolveOption({
          name: 'text decoration',
          value: decorationInput,
          allowed: TEXT_DECORATIONS,
          fallback: 'base',
        })

  const underlineOffset =
    underlineOffsetInput === undefined
      ? undefined
      : resolveOption({
          name: 'text underline offset',
          value: underlineOffsetInput,
          allowed: TEXT_UNDERLINE_OFFSETS,
          fallback: 'md',
        })

  return cx(
    'sp-text',
    `sp-text--${size}`,
    variantClass,
    family && `sp-text--${family}`,
    transform && `sp-text--${transform}`,
    weight && `sp-font-${weight}`,
    leading && `sp-text--leading-${leading}`,
    fontSize && `sp-font-size-${fontSize}`,
    tracking && `sp-tracking-${tracking}`,
    decoration && `sp-decoration-${decoration}`,
    underlineOffset && `sp-underline-offset-${underlineOffset}`,
    tabularNums && 'sp-tabular-nums',
    balance && 'sp-text-balance'
  )
}
