import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const ALERT_VARIANTS = {
  info: true,
  success: true,
  warning: true,
  danger: true,
  neutral: true,
} as const

const ALERT_SIZES = {
  sm: true,
  md: true,
  lg: true,
} as const

export type AlertVariant = keyof typeof ALERT_VARIANTS
export type AlertSize = keyof typeof ALERT_SIZES

export interface AlertRecipeOptions {
  variant?: AlertVariant
  size?: AlertSize
  dismissed?: boolean
}

export function getAlertClasses(opts: AlertRecipeOptions = {}): string {
  const { variant: variantInput, size: sizeInput, dismissed = false } = opts

  const variant = resolveOption({
    name: 'alert variant',
    value: variantInput,
    allowed: ALERT_VARIANTS,
    fallback: 'info',
  })

  const size = resolveOption({
    name: 'alert size',
    value: sizeInput,
    allowed: ALERT_SIZES,
    fallback: 'md',
  })

  return cx(
    'sp-alert',
    `sp-alert--${variant}`,
    `sp-alert--${size}`,
    dismissed && 'sp-alert--dismissed'
  )
}
