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
} as const

const TEXT_FAMILIES = {
  sans: true,
  serif: true,
  mono: true,
} as const

export type TextSize = keyof typeof TEXT_SIZES
export type TextVariant = keyof typeof TEXT_VARIANTS
export type TextFamily = keyof typeof TEXT_FAMILIES

export interface TextRecipeOptions {
  size?: TextSize
  variant?: TextVariant
  family?: TextFamily
}

export function getTextClasses(opts: TextRecipeOptions = {}): string {
  const { size: sizeInput, variant: variantInput, family: familyInput } = opts

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

  const family = familyInput
    ? resolveOption({
        name: 'text family',
        value: familyInput,
        allowed: TEXT_FAMILIES,
        fallback: 'sans',
      })
    : undefined

  return cx(
    'sp-text',
    `sp-text--${size}`,
    `sp-text--${variant}`,
    family && `sp-text--${family}`
  )
}
