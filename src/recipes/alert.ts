import { cx } from '../internal/cx'
import { resolveOption } from '../internal/resolve-option'

const ALERT_VARIANTS = {
  info: true,
  success: true,
  warning: true,
  danger: true,
  neutral: true,
  brand: true,
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
  /** Reserves room for a `getAlertDismissClasses()` close button in the corner. */
  dismissible?: boolean
  fullWidth?: boolean
  interactive?: boolean
  hovered?: boolean
  focused?: boolean
  active?: boolean
  disabled?: boolean
  loading?: boolean
}

export function getAlertClasses(opts: AlertRecipeOptions = {}): string {
  const {
    variant: variantInput,
    size: sizeInput,
    dismissed = false,
    dismissible = false,
    fullWidth = false,
    interactive = false,
    hovered = false,
    focused = false,
    active = false,
    disabled = false,
    loading = false,
  } = opts

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
    dismissed && 'sp-alert--dismissed',
    dismissible && 'sp-alert--dismissible',
    fullWidth && 'sp-alert--full',
    interactive && 'sp-alert--interactive',
    hovered && 'sp-alert--hover is-hover',
    focused && 'sp-alert--focus is-focus',
    active && 'sp-alert--active is-active',
    disabled && 'sp-alert--disabled',
    loading && 'sp-alert--loading'
  )
}

/**
 * Leading icon slot. Its color follows the parent alert's variant through the
 * `component.alert.<role>.icon` token.
 */
export function getAlertIconClasses(): string {
  return 'sp-alert__icon'
}

/** Close button for a `dismissible` alert. */
export function getAlertDismissClasses(): string {
  return 'sp-alert__dismiss'
}
