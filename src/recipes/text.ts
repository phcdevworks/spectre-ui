import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

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
} as const

const TEXT_VARIANTS = {
  default: true,
  muted: true,
  subtle: true,
  meta: true,
  brand: true,
  /**
   * For text placed on a `surface.inverse`-backed background (a photo card,
   * a brand-dark card body, a utility bar) that isn't owned by the page's
   * own light/dark mode. See TODO.md "Requested by Downstream" /
   * "On-dark/inverse surface role".
   */
  onInverse: true,
  onInverseMuted: true,
  /**
   * For text inside a card-like `surface.card` container rather than directly
   * on the page background (`text.onSurface.*`).
   */
  onSurface: true,
  onSurfaceMuted: true,
  onSurfaceSubtle: true,
  onSurfaceMeta: true,
  onSurfaceBrand: true,
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

export type TextSize = keyof typeof TEXT_SIZES
export type TextVariant = keyof typeof TEXT_VARIANTS
export type TextFamily = keyof typeof TEXT_FAMILIES
export type TextTransform = keyof typeof TEXT_TRANSFORMS
export type TextWeight = 400 | 500 | 600 | 700 | 800 | 900

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
}

export function getTextClasses(opts: TextRecipeOptions = {}): string {
  const {
    size: sizeInput,
    variant: variantInput,
    family: familyInput,
    transform: transformInput,
    weight: weightInput,
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
    onInverse: 'sp-text--on-inverse',
    onInverseMuted: 'sp-text--on-inverse-muted',
    onSurface: 'sp-text--on-surface',
    onSurfaceMuted: 'sp-text--on-surface-muted',
    onSurfaceSubtle: 'sp-text--on-surface-subtle',
    onSurfaceMeta: 'sp-text--on-surface-meta',
    onSurfaceBrand: 'sp-text--on-surface-brand',
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

  return cx(
    'sp-text',
    `sp-text--${size}`,
    variantClass,
    family && `sp-text--${family}`,
    transform && `sp-text--${transform}`,
    weight && `sp-font-${weight}`
  )
}
