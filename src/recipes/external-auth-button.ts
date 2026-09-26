import { cx } from '../internal/cx'

export interface ExternalAuthButtonRecipeOptions {
  fullWidth?: boolean
  disabled?: boolean
  loading?: boolean
  hovered?: boolean
  focused?: boolean
  active?: boolean
}

/**
 * Neutral, mode-aware treatment for third-party sign-in actions (e.g.
 * "Continue with ..."). It deliberately encodes no provider identity or brand
 * color; per-provider logos stay with the caller in the icon slot.
 */
export function getExternalAuthButtonClasses(
  opts: ExternalAuthButtonRecipeOptions = {}
): string {
  const {
    fullWidth = false,
    disabled = false,
    loading = false,
    hovered = false,
    focused = false,
    active = false
  } = opts

  return cx(
    'sp-external-auth-btn',
    fullWidth && 'sp-external-auth-btn--full',
    disabled && 'sp-external-auth-btn--disabled',
    loading && 'sp-external-auth-btn--loading',
    hovered && 'sp-external-auth-btn--hover is-hover',
    focused && 'sp-external-auth-btn--focus is-focus',
    active && 'sp-external-auth-btn--active is-active'
  )
}

/** Leading slot for the caller-supplied provider logo. */
export function getExternalAuthButtonIconClasses(): string {
  return 'sp-external-auth-btn__icon'
}
