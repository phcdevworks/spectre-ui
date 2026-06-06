import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const SPINNER_VARIANTS = {
  primary: true,
  secondary: true,
  success: true,
  warning: true,
  danger: true,
  info: true,
  neutral: true,
  accent: true,
  cta: true,
} as const

const SPINNER_SIZES = {
  sm: true,
  md: true,
  lg: true,
} as const

export type SpinnerVariant = keyof typeof SPINNER_VARIANTS
export type SpinnerSize = keyof typeof SPINNER_SIZES

export interface SpinnerRecipeOptions {
  variant?: SpinnerVariant
  size?: SpinnerSize
  disabled?: boolean
  loading?: boolean
}

export function getSpinnerClasses(opts: SpinnerRecipeOptions = {}): string {
  const {
    variant: variantInput,
    size: sizeInput,
    disabled = false,
    loading = false,
  } = opts

  const variant =
    variantInput &&
    resolveOption({
      name: 'spinner variant',
      value: variantInput,
      allowed: SPINNER_VARIANTS,
      fallback: 'primary',
    })

  const size = resolveOption({
    name: 'spinner size',
    value: sizeInput,
    allowed: SPINNER_SIZES,
    fallback: 'md',
  })

  return cx(
    'sp-spinner',
    variant && `sp-spinner--${variant}`,
    `sp-spinner--${size}`,
    disabled && 'sp-spinner--disabled',
    loading && 'sp-spinner--loading'
  )
}
