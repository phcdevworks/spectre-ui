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

export type TextSize = keyof typeof TEXT_SIZES
export type TextVariant = keyof typeof TEXT_VARIANTS
export type TextFamily = keyof typeof TEXT_FAMILIES
export type TextTransform = keyof typeof TEXT_TRANSFORMS

export interface TextRecipeOptions {
  size?: TextSize
  variant?: TextVariant
  family?: TextFamily
  transform?: TextTransform
}

export function getTextClasses(opts: TextRecipeOptions = {}): string {
  const {
    size: sizeInput,
    variant: variantInput,
    family: familyInput,
    transform: transformInput,
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

  return cx(
    'sp-text',
    `sp-text--${size}`,
    variantClass,
    family && `sp-text--${family}`,
    transform && `sp-text--${transform}`
  )
}
