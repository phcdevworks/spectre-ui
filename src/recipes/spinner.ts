import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const SPINNER_SIZES = {
  sm: true,
  md: true,
  lg: true,
} as const

export type SpinnerSize = keyof typeof SPINNER_SIZES

export interface SpinnerRecipeOptions {
  size?: SpinnerSize
}

export function getSpinnerClasses(opts: SpinnerRecipeOptions = {}): string {
  const { size: sizeInput } = opts

  const size = resolveOption({
    name: 'spinner size',
    value: sizeInput,
    allowed: SPINNER_SIZES,
    fallback: 'md',
  })

  return cx('sp-spinner', `sp-spinner--${size}`)
}
