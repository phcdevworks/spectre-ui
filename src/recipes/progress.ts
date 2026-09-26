import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const PROGRESS_SIZES = {
  sm: true,
  md: true,
  lg: true
} as const

const PROGRESS_BAR_VARIANTS = {
  brand: true,
  neutral: true,
  info: true,
  success: true,
  warning: true,
  danger: true
} as const

export type ProgressSize = keyof typeof PROGRESS_SIZES
export type ProgressBarVariant = keyof typeof PROGRESS_BAR_VARIANTS

export interface ProgressRecipeOptions {
  size?: ProgressSize
}

/** The track. Pair with `role="progressbar"` and the `aria-value*` attributes. */
export function getProgressClasses(opts: ProgressRecipeOptions = {}): string {
  const size = resolveOption({
    name: 'progress size',
    value: opts.size,
    allowed: PROGRESS_SIZES,
    fallback: 'md'
  })

  return cx('sp-progress', `sp-progress--${size}`)
}

export interface ProgressBarRecipeOptions {
  variant?: ProgressBarVariant
  /**
   * Animates an unknown-duration sweep instead of a fixed fill; the caller
   * omits the inline `width` it would otherwise set for a determinate value.
   */
  indeterminate?: boolean
}

/** The filled portion. The caller sets its `width` to the current value. */
export function getProgressBarClasses(
  opts: ProgressBarRecipeOptions = {}
): string {
  const { variant: variantInput, indeterminate = false } = opts

  const variant = resolveOption({
    name: 'progress bar variant',
    value: variantInput,
    allowed: PROGRESS_BAR_VARIANTS,
    fallback: 'brand'
  })

  return cx(
    'sp-progress__bar',
    `sp-progress__bar--${variant}`,
    indeterminate && 'sp-progress__bar--indeterminate'
  )
}

export function getProgressLabelClasses(): string {
  return 'sp-progress__label'
}
